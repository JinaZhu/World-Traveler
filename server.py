import os
from dotenv import load_dotenv
from pathlib import Path
from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from random import choice
from model import connect_to_db, db, Country, User, Rating
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


@app.route('/api/countryList')
def display_country():

    # all_country = Country.query.all()
    # random_country = choice(all_country)

    # return render_template("country.html",
    #                         all_country=all_country)

    country = choice(Country.query.limit(10))

    country = {
        "id": country.country_id,
        "countryName": country.country_name,
        "visa": country.visa,
        "vaccination": country.vaccination,
        "language": country.language,
        "currency": country.currency
    }
    # countries = [
    #     {
    #         "id": country.country_id,
    #         "countryName": country.country_name,
    #         "visa": country.visa,
    #         "vaccination": country.vaccination,
    #         "language": country.language,
    #         "currency": country.currency
    #     }
    #     for country in Country.query.limit(10)
    # ]

    return jsonify(country)


@app.route('/api/countriesInfo')
def display_countries():

    # all_country = Country.query.all()
    # random_country = choice(all_country)

    # return render_template("country.html",
    #                         all_country=all_country)

    # get country id with geocoder with name of country
    # pass id to photo api to get photos

    countries = [
        {
            "id": country.country_id,
            "countryName": country.country_name,
            "visa": country.visa,
            "vaccination": country.vaccination,
            "language": country.language,
            "currency": country.currency
        }
        for country in Country.query.limit(10)
    ]

    country = choice(countries)  # select a random country
    country_name = country['countryName']  # get random country name from db

    geocode_result = gmaps.geocode(country_name)  # get place_id from geocode
    # from geocode store the place id
    country_id = geocode_result[0]['place_id']

    # from the place detail api, store the country_id
    place_detail = gmaps.place(country_id)

    # get reference photo from place details
    photos = (place_detail['result']['photos'])
    short_name = (place_detail['result']
                  ['address_components'][0]['short_name'])

    place_photos_list = []

    # use the short name to fetch info from travel-advisory api
    # from the api, need score and source

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
    # city_information = text_response['cities']
    covert_text_to_dict = json.loads(cities_text_response)
    cities_information = covert_text_to_dict['cities']
    popular_cities = []
    for city in cities_information:
        popular_cities.append({'city_name': city['name'],
                               'lat': city['latitude'],
                               'long': city['longitude']})
    # print(popular_cities)

    # place_search = gmaps.places_nearby(location=(27.70169, 85.3206),
    #                                    radius=1000,
    #                                    type='airport')

    # with popular cities, find the nearest airport
    popular_city_airport = []
    for each_city in popular_cities:
        airport_url = "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/nearest"
        airport_querystring = {
            "lng": f"{each_city['long']}", "lat": f"{each_city['lat']}"}
        airport_headers = {
            'x-rapidapi-host': "cometari-airportsfinder-v1.p.rapidapi.com",
            'x-rapidapi-key': "71ff2faeb7msh2dcf62e4f6d316fp1dd22fjsn0f800f62adb8"
        }
        airport_response = requests.request(
            "GET", airport_url, headers=airport_headers, params=airport_querystring)
        airport_text_response = airport_response.text
        convert_airport_dict = json.loads(airport_text_response)
        popular_city_airport.append({'city_name': each_city['city_name'],
                                     'airport': convert_airport_dict
                                     })

    popular_cities_with_airports = []
    for city_and_airport in popular_city_airport:
        popular_cities_with_airports.append({'city_name': city_and_airport['city_name'],
                                             'nearest_airport': city_and_airport['airport']['code']})

    country_information = {
        'country_info': country,
        'currency': get_currency,
        'language': get_language,
        'place_photos': place_photos_list,
        'advisor_score': country_safety_score,
        'learn_more_advisory': learn_more_advisory,
        'popular_cities_and_airport': popular_cities_with_airports
    }

    return jsonify(country_information)


@app.route('/login', methods=['GET'])
def login_form():
    """Show form for user login"""

    return render_template("login_form.html")


@app.route('/login', methods=['POST'])
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

    flash("logged in")
    return redirect(f"/")

    # look at rating server.py after dealing with db to complete

    # return redirect(f"/users/{user.user_id}")


@app.route('/register', methods=['GET'])
def register_form():
    """show form for user signup"""

    return render_template("register_form.html")


@app.route('/register', methods=['POST'])
def register_process():
    """Process registration."""

    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    email = request.form["email"]
    password = request.form["password"]

    new_user = User(fname=first_name, lname=last_name,
                    email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    flash(f"User {email} added.")
    return redirect("/")


@app.route('/logout')
def logout():
    """log out"""
    del session["user_id"]
    return redirect("/")


@app.route('/user', methods=["GET"])
def user_likes():
    """display user's saved countries"""
    current_user = session.get("user_id")
    display_countries = Rating.query.filter_by(user_id=current_user).all()

    countries_list = []

    for country in display_countries:
        countries_list.append(country.country_name)

    return render_template("user_likes.html",
                           countries=countries_list)


@app.route('/user', methods=["POST"])
def user_likes_page():
    """display user's saved countries"""

    country = request.form["country"]
    user_id = session.get("user_id")

    print(user_id)
    print('******************', country)

    current_user = User.query.filter_by(user_id=user_id).first()

    if not user_id:
        raise Exception("No user logged in.")

    if not current_user:
        flash("No user logged in.")
        return redirect("/")

    save_countries = Rating(user_id=user_id, country_name=country)
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
