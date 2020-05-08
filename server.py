import os
from dotenv import load_dotenv
from pathlib import Path
from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from random import choice
from model import connect_to_db, db, Country, User, Save
import googlemaps
import json
import requests
import datetime
from twilio.rest import Client

env_path = Path(".") / '.env'
load_dotenv(dotenv_path=env_path)
google_map_api_key = os.getenv("GOOGLE_API")
cities_rapid_api = os.getenv("CITY_RAPID_API")
gmaps = googlemaps.Client(key=google_map_api_key)

app = Flask(__name__)

app.secret_key = "ABC"

app.jinja_env.undefined = StrictUndefined

twilio_token = os.getEnv("TWILIO_TOKEN")


@app.route('/api/countriesInfo')
def display_countries():
    """select random country and get country info from APIs and datatbases"""

    # get info from database

    all_db_countries = []

    all_db = [
        {
            "countryName": country.country_name,
        }
        for country in Country.query.all()
    ]

    for country in all_db:
        all_db_countries.append(country['countryName'])

    clicked_country = request.args.get('selectedCountry')

    selected_country = ''

    if clicked_country is None:
        selected_country = choice(all_db_countries)
    else:
        selected_country = clicked_country

    selected_country_db = Country.query.filter_by(
        country_name=selected_country).first()

    selected_country_db_info = {
        "id": selected_country_db.country_id,
        "countryName": selected_country_db.country_name,
        "visa": selected_country_db.visa,
        "vaccination": selected_country_db.vaccination,
        "temperatures": selected_country_db.avg_temp,
        "city_temp": selected_country_db.temp_city,
        "avg_price": selected_country_db.avg_cost
    }

    # get info from APIs
    # country = choice(selected_country)  # select a random country
    country_name = selected_country  # get random the country name

    # get country place_id from geocode
    geocode_result = gmaps.geocode(country_name)
    # from geocode store the place_id
    country_id = geocode_result[0]['place_id']

    # from the place detail api, store the country_id
    place_detail = gmaps.place(country_id)

    # get reference photo from place details
    photos = (place_detail['result']['photos'])
    short_name = (place_detail['result']
                  ['address_components'][0]['short_name'])
    place_photos_list = []
    # loop through all the photos and take get the photo_reference and append all the ref to place_photos_list
    for photo in photos:
        place_photos_list.append(photo['photo_reference'])

    # get currency and language from restcountries
    get_currency_language = requests.get(
        f'https://restcountries.eu/rest/v2/alpha/{short_name}')
    get_currency_language_json = get_currency_language.json()
    get_currency = get_currency_language_json['currencies'][0]['name']
    get_language = get_currency_language_json['languages'][0]['name']

    # api file from travel advisory
    travel_advisor_response = requests.get(
        "https://www.travel-advisory.info/api")
    travel_advisor_json = travel_advisor_response.json()
    country_safety_score = travel_advisor_json['data'][short_name]['advisory']['score']
    learn_more_advisory = travel_advisor_json['data'][short_name]['advisory']['source']

    # popular cities api
    cities_url = f'https://countries-cities.p.rapidapi.com/location/country/{short_name}/city/list'
    cities_querystring = {"page": "1", "per_page": "7", "format": "json"}
    cities_headers = {
        'x-rapidapi-host': "countries-cities.p.rapidapi.com",
        'x-rapidapi-key': cities_rapid_api
    }
    cities_response = requests.request(
        "GET", cities_url, headers=cities_headers, params=cities_querystring)
    cities_text_response = cities_response.text
    covert_text_to_dict = json.loads(cities_text_response)
    cities_information = covert_text_to_dict['cities']
    popular_cities = []
    for city in cities_information:
        popular_cities.append(city['name'])

    # store all the data info
    country_information = {
        'country_info': selected_country_db_info,
        'currency': get_currency,
        'language': get_language,
        'place_photos': place_photos_list,
        'advisor_score': country_safety_score,
        'learn_more_advisory': learn_more_advisory,
        'popular_cities': popular_cities
    }

    return jsonify(country_information)


def get_city_code(city):
    url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/"

    querystring = {"query": city}

    headers = {
        'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        'x-rapidapi-key': "71ff2faeb7msh2dcf62e4f6d316fp1dd22fjsn0f800f62adb8"
    }

    response = requests.request(
        "GET", url, headers=headers, params=querystring)

    response_to_dict = json.loads(response.text)
    return response_to_dict['Places'][0]['PlaceId']


@app.route('/register', methods=['GET', 'POST'])
def register_process():
    """Process registration."""
    print('request', request)

    first_name = request.form["firstName"]
    last_name = request.form["lastName"]
    email = request.form["email"]
    password = request.form["password"]
    location = get_city_code(request.form["location"])
    phone = request.form["phone"]

    new_user = User(fname=first_name, lname=last_name,
                    email=email, password=password, location=location, phoneNumber=phone)

    db.session.add(new_user)
    db.session.commit()

    # create a session to log the user in
    # the server will send a set-cookie-header to the client so the client
    # will store a cookie
    session["user_id"] = new_user.user_id

    return ('', 204)


@app.route('/login', methods=['GET', 'POST'])
def login_process():
    """Process login"""

    email = request.form["email"]
    password = request.form["password"]

    user = User.query.filter_by(email=email).first()

    if not user:
        flash("No such user")
        return redirect("/login")

    if user.password != password:
        flash("Incorrect password")
        return redirect("/login")

    session["user_id"] = user.user_id

    return (user.fname)


@app.route('/isLoggedIn')
def homepage():
    user_id = session.get("user_id")

    current_user = User.query.filter_by(user_id=user_id).first()
    user_name = current_user.fname

    return user_name


@app.route('/logout', methods=["POST"])
def logout():
    """log out"""
    del session["user_id"]
    return ('', 204)


@app.route('/save', methods=["POST"])
def user_likes_page():
    """display user's saved countries"""

    country = request.form["country"]
    visited = request.form["visited"]
    url = request.form["imgUrl"]
    user_id = session.get("user_id")
    price = request.form["price"]
    whereTo = request.form["whereTo"]
    notify = request.form["notify"]

    current_user = User.query.filter_by(user_id=user_id).first()

    whereFrom = current_user.location

    if whereTo != "":
        whereTo = get_city_code(whereTo)

    if price == "":
        price = 0

    if not current_user:
        return ("Please login or register!")

    existing_save = Save.query.filter_by(
        user_id=user_id, country_name=country).first()

    if not existing_save:
        save_countries = Save(
            user_id=user_id, country_name=country, photo_url=url, visited_country=visited, price=price, whereTo=whereTo, whereFrom=whereFrom, notify=notify)

        db.session.add(save_countries)
        db.session.commit()

    right_prices = check_flight()
    contact_user(right_prices)

    return('Country stored!')


@app.route('/allSavedCountries')
def user_likes():
    """display user's saved countries"""
    current_user = session.get("user_id")
    saved_countries = Save.query.filter_by(
        user_id=current_user, visited_country='no').all()

    save_countries_info = []

    for country in saved_countries:
        save_countries_info.append({'country_name': country.country_name,
                                    'country_photo': country.photo_url,
                                    'save_id': country.save_id})

    return jsonify(save_countries_info)


@app.route('/allVisitedCountries')
def user_saves():
    """display user's visited countries"""

    current_user = session.get("user_id")
    visited_countries = Save.query.filter_by(
        user_id=current_user, visited_country='yes').all()

    visited_countries_info = []

    for country in visited_countries:
        visited_countries_info.append({'country_name': country.country_name,
                                       'country_photo': country.photo_url,
                                       'save_id': country.save_id})

    return jsonify(visited_countries_info)


@app.route('/deleteSaved', methods=["POST"])
def delete_saved():
    """ delete saved countries """

    save_id = request.form["saveId"]

    Save.query.filter_by(
        save_id=save_id).delete()

    db.session.commit()

    return save_id


# @app.route('./checkFlight', method=["POST"])
def check_flight():
    """check get all location for flight prices in database"""

    all_cities = []

    # query through my database and check all save countries with a notify yes
    notifyYesEntries = Save.query.filter_by(notify='yes').all()

    # iterating through all the result, I am extacting only the inforamtion I need
    for entry in notifyYesEntries:
        all_cities.append([entry.user_id, entry.whereFrom,
                           entry.whereTo, entry.price])

    # Using the date of a month from now, I am using Skyscanner to search flights for that entire month
    current_date = datetime.datetime.now()
    year = current_date.year
    month = current_date.month + 1
    day = current_date.day

    right_price = {}

    for city in all_cities:
        url = f"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/{city[1]}/{city[2]}/{year}-0{month}-0{day}"

        querystring = {"inboundpartialdate": f"{year}-{month-1}-{day}"}

        headers = {
            'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            'x-rapidapi-key': "71ff2faeb7msh2dcf62e4f6d316fp1dd22fjsn0f800f62adb8"
        }

        response = requests.request(
            "GET", url, headers=headers, params=querystring)
        data = json.loads(response.text)
        fights = data['Quotes']

        # after getting I get back all the fights, I am checking the ticket price to see if it's below the user's price
        # if so, I am adding to the right_price dict
        for fight in fights:
            if fight['MinPrice'] <= city[3]:
                if city[0] in right_price:
                    right_price[city[0]].append(
                        [city[1], city[2], fight['MinPrice'], fight['QuoteDateTime']])
                else:
                    right_price[city[0]] = [
                        [city[1], city[2], fight['MinPrice'], fight['QuoteDateTime']]]
    return right_price


def contact_user(dict):
    """send message to user if flight meet user's requirement"""

    # iterating through my dict and querying through my database to location the user's information base on their id
    # which is stored as a key
    for key in dict:
        user = User.query.filter_by(user_id=key).first()

        user_phone_number = user.phoneNumber

        # after I have access to the user's information, I am creating a customize message to inform them about all
        # the fights that meet their max price and send the message using the Twilio API
        message_body = f"Hello {user.fname}! We found {len(dict[key])} flight/s that match your max price: "

        for item in dict[key]:
            message_body += f"{item[0]} to {item[1]} for ${item[2]} on {item[3]}, "

        account_sid = 'AC56409261f00829cdc6fe91fda355ecc2'
        auth_token = twilio_token
        client = Client(account_sid, auth_token)

        message = client.messages.create(
            from_='+19382010511',
            body=message_body,
            to=f"+1{user_phone_number}"
        )

        print('message', message.sid)

    return 'done!'


# @app.route('./checkFlight', method=["POST"])
# def check_flight():

if __name__ == "__main__":
    app.debug = True
    connect_to_db(app)
    app.run(host="0.0.0.0")

    # do not debug for demo
    # app.debug = True

    # connect_to_db(app)

    # DebugToolbarExtension(app)
