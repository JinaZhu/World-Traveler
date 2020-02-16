from jinja2 import StrictUndefined

from flask import Flask, render_template, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from random import choice
from model import connect_to_db, db, Country
import googlemaps


gmaps = googlemaps.Client(key='AIzaSyAGIgU3ILBZtHca1RACPDe30eGGMQAMtHw')

app =  Flask(__name__)

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

    country = choice(countries) # select a random country
    print(country)
    geocode_result = gmaps.geocode(country.countryName)
    print(geocode_result)
    return jsonify(country)

    


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
