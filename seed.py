from sqlalchemy import func

from model import User
from model import Rating 
from model import Country

from model import connect_to_db, db
from server import app

def load_countries():
    """Load movies from u.country into database"""

    for row in open("seed_data/u.country"):
        row = row.rstrip()
        print(row)
        country_name, visa, vaccinations, language, currency = row.split("|")
        country = Country(country_name=country_name,
                        visa=visa,
                        vaccination=vaccinations, 
                        language=language, 
                        currency=currency)

        db.session.add(country)
     
    db.session.commit()


if __name__ == "__main__":
    connect_to_db(app)
    load_countries()

    # country_filename = "seed_data/u.country"
    # load_countries(country_filename)