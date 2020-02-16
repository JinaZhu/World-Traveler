from flask_sqlalchemy import SQLAlchemy
from collections import defaultdict

db = SQLAlchemy()


class User(db.Model):
    """User account"""

    __tablename__= "users"

    user_id = db.Column(db.Integer, 
              autoincrement=True, 
              primary_key=True)

    fname = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True, nullable=False)


    def __repr__(self):
        """provide helpful representation when printed."""
        
        return f"<User fname={self.fname} email = {self.email}>"


class Country(db.Model):
    """Country table""" 

    __tablename__ = "countries"

    country_id = db.Column(db.Integer, 
                           autoincrement=True, 
                           primary_key=True, 
                           unique=True)

    country_name = db.Column(db.String(50), 
                            nullable=False, 
                            unique=True)

    visa = db.Column(db.String(20))
    vaccination = db.Column(db.String(100))
    language = db.Column(db.String(50))
    currency = db.Column(db.String(50))

    def __repr__(self):
        repr_str = "<Country country_id = {country_id}>"

        return repr_str.format(country_id = self.country_id)
        # return f"""<Country country_id={self.country_id} country_name={self.country_name}>"""

class Rating(db.Model):
    """Like or dislike of a country by a user."""

    __tablename__ = "ratings"

    rating_id = db.Column(db.Integer,
                          autoincrement=True,
                          primary_key=True,
                          unique=True)

    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'))
    country_id = db.Column(db.Integer,
                           db.ForeignKey('countries.country_id'))
    rating = db.Column(db.String(10))


    user = db.relationship("User", 
                            backref=db.backref("ratings", order_by=rating_id))

    country = db.relationship("Country", 
                            backref=db.backref("ratings",order_by=rating_id))

    def __repr__(self):

        return f"""<Rating user_id={self.user_id} country_id={self.country_id} rating={self.rating}>"""


def connect_to_db(app):
    """Connect the database to flask app"""

    # Configure to use our PostgreSQL database
    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///countries"
    # app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

if __name__ == "__main__":
    from server import app
    connect_to_db(app)



