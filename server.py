import os
from dotenv import load_dotenv
from pathlib import Path
from jinja2 import StrictUndefined

from flask import Flask, render_template, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from random import choice
from model import connect_to_db, db, Country
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
    print(place_detail)

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

    place_search = gmaps.places_nearby(lat_lng={
        'lat': 52.0737017,
        'lng': 5.0944107999999915
    },
        radius=100,
        types=[types]
    )

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

    email.request.form["email"]
    password = request.form["password"]

    # look at rating server.py after dealing with db to complete

    return redirect(f"/users/{user.user_id}")


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

    # look at db first


@app.route('/user/<int:user_id>')
def user_save(user_id):
    pass


if __name__ == "__main__":
    app.debug = True
    connect_to_db(app)
    app.run(host="0.0.0.0")

    # do not debug for demo
    # app.debug = True

    # connect_to_db(app)

    # DebugToolbarExtension(app)
