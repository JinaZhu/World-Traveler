import os
from jinja2 import StrictUndefined

from flask import Flask, render_template, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from random import choice
from model import connect_to_db, db, Country
import googlemaps
import json
import requests

google_map_api_key = os.getenv("GOOGLE_API")
print('**************', google_map_api_key)
gmaps = googlemaps.Client(key='AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw')

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

    # api file from travel advisory
    travel_advisor_response = requests.get(
        "https://www.travel-advisory.info/api")
    travel_advisor_json = travel_advisor_response.json()
    country_safety_score = travel_advisor_json['data'][short_name]['advisory']['score']
    learn_more_advisory = travel_advisor_json['data'][short_name]['advisory']['source']

    # popular cities api
    cities_url = f'https://countries-cities.p.rapidapi.com/location/country/{short_name}/city/list'
    querystring = {"page": "1", "per_page": "7", "format": "json"}
    headers = {
        'x-rapidapi-host': "countries-cities.p.rapidapi.com",
        'x-rapidapi-key': "71ff2faeb7msh2dcf62e4f6d316fp1dd22fjsn0f800f62adb8"
    }
    response = requests.request(
        "GET", cities_url, headers=headers, params=querystring)

    # print(response.text)

    country_information = {
        'country_info': country,
        'place_photos': place_photos_list,
        'advisor_score': country_safety_score,
        'learn_more_advisory': learn_more_advisory
    }

    return jsonify(country_information)


@app.route('/signin')
def sign_in():
    pass


@app.route('/register')
def register_page():
    pass


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
