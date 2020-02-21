from sqlalchemy import func

from model import User
from model import Save
from model import Country

from model import connect_to_db, db
from server import app


def load_countries():
    """Load country from u.country into database"""

    for row in open("seed_data/u.country"):
        row = row.rstrip()
        country_name, visa, vaccinations, temperature, city_temp = row.split(
            "|")
        country = Country(country_name=country_name,
                          visa=visa,
                          vaccination=vaccinations,
                          avg_temp=temperature,
                          temp_city=city_temp)

        db.session.add(country)

    db.session.commit()


if __name__ == "__main__":
    connect_to_db(app)
    load_countries()

    # country_filename = "seed_data/u.country"
    # load_countries(country_filename)
