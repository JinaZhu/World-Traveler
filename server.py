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

env_path = Path(".") / '.env'
load_dotenv(dotenv_path=env_path)
google_map_api_key = os.getenv("GOOGLE_API")
cities_rapid_api = os.getenv("CITY_RAPID_API")
gmaps = googlemaps.Client(key=google_map_api_key)

app = Flask(__name__)

app.secret_key = "ABC"

app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """Homepage."""

    return render_template("homepage.html")


@app.route('/api/countriesInfo')
def display_countries():
    """select random country and get country info from APIs and datatbases"""

    # get info from database
    countries = [
        {
            "id": country.country_id,
            "countryName": country.country_name,
            "visa": country.visa,
            "vaccination": country.vaccination,
            "temperatures": country.avg_temp,
            "city_temp": country.temp_city
        }
        for country in Country.query.all()
    ]

    # get info from APIs
    country = choice(countries)  # select a random country
    country_name = country['countryName']  # get random the country name

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
        'country_info': country,
        'currency': get_currency,
        'language': get_language,
        'place_photos': place_photos_list,
        'advisor_score': country_safety_score,
        'learn_more_advisory': learn_more_advisory,
        'popular_cities': popular_cities
    }

    # Modified this route to allow Access control origin from anywhere
    # TODO: Create middleware to allow this setting for all route
    response = jsonify(country_information)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/register', methods=['GET', 'POST'])
def register_process():
    """Process registration."""
    print('request', request)

    first_name = request.form["firstName"]
    last_name = request.form["lastName"]
    email = request.form["email"]
    password = request.form["password"]

    new_user = User(fname=first_name, lname=last_name,
                    email=email, password=password)

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

    return ('', 204)


@app.route('/logout', methods=["POST"])
def logout():
    """log out"""
    del session["user_id"]
    return ('', 204)


@app.route('/user', methods=["GET"])
def user_likes():
    """display user's saved countries"""
    current_user = session.get("user_id")
    display_countries = Save.query.filter_by(user_id=current_user).all()

    display_countries_info = []

    for country in display_countries:
        display_countries_info.append({'country_name': country.country_name,
                                       'country_photo': country.photo_url})

    print(display_countries_info)

    return render_template("user_likes.html",
                           countries=display_countries_info)


@app.route('/user', methods=["POST"])
def user_likes_page():
    """display user's saved countries"""

    country = request.form["country"]
    url = request.form["imgUrl"]
    user_id = session.get("user_id")

    current_user = User.query.filter_by(user_id=user_id).first()

    if not user_id:
        raise Exception("No user logged in.")

    if not current_user:
        flash("No user logged in.")
        return redirect("/")

    existing_save = Save.query.filter_by(
        user_id=user_id, country_name=country).first()

    if not existing_save:
        save_countries = Save(
            user_id=user_id, country_name=country, photo_url=url)
        flash("Country added")

        db.session.add(save_countries)
        db.session.commit()

    return redirect("/")


if __name__ == "__main__":
    app.debug = True
    connect_to_db(app)
    app.run(host="0.0.0.0")

    # do not debug for demo
    # app.debug = True

    # connect_to_db(app)

    # DebugToolbarExtension(app)
