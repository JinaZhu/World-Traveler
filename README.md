<p align="center"><img src="/static/travelLogo.png" width="200"/></p>

<kbd>![Adventure Awaits](/static/AA1.gif)</kbd>

## Description
Adventure Awaits is a full-stack web application that allows anyone to discover somewhere new by providing an insight into a country. The next time your itching to discover some place new, give it a spin!

## Table of Contents
* [Technologies](#technologies)
* [Overview](#overview)
* [Features](#features)
* [Future Features](#futurePlans)
* [Author](#author)

## <a name="technologies"></a>Technologies

<p>Backend</p>

* Python
* Flask
* PostgreSQL
* SQLAlchemy

<p>Frontend</p>

* JavaScript
* React
* HTML/CSS
* Styled Component
* Reactstrap
* GSAP
* Chart.js

<p>APIs</p>

* Google Maps API
* Google Place API
* Google Geocode API
* Trip Advisory
* Rest Countries

## <a name="overview"></a>Overview
<h3>Users can</h3>

* Randomly select a country
* Interact with the map and select any location in the world
* View a country's information after making a selection
* Sign in/sign out/sign up (create an account!)
* Log places a user have been
* Log places a user would like to visit

## <a name="features"></a>Features

<h3>Generating Information</h3>
<h4>A user has two options to view a country’s information</h4>

<h4>1. clicking anywhere on the interactive map</h4>
Google-maps-react was used to display the map. Onclick was added to retrieve the country of any location selected on the map and sent to the server.

<img src="/static/clickableMap.gif"/>

<h4>2. Allow fate to select for you with the ”Explore” button</h4>
<p>A request is sent to the server to randomly select a location</p>

<img src="/static/Explore.gif"/>

Either option will send a request from the client to the server that is responsible for aggregating country information via multiple API requests and from seeded information stored in a database and returns that information back to the client to display for the user. 

<h3>Register, login, logout</h3>
<p align="center"><img src="/static/Login.gif"/></p>
Some features are hidden from unregistered users. Once a user create an account and login, a session is created and the navbar conditionally renders and reveals additional routes

<h3>Save countries</h3>
<p align="center"><img src="/static/save.gif" width="250"/></p>
Registered users can keep track of places they been and places they will like to visit. Once a user save a country, that information is stored in a database and displayed on separate routes.

<p align="center"><img src="/static/Screen%20Shot%202020-03-17%20at%203.24.20%20PM.png"/></p>

To organize their saves, a user has the option to delete any saves
<p align="center"><img src="/static/deletePhoto.gif"/></p>

## <a name="futurePlans"></a>Future Features

* Disable selector to pick a country a user saved
* Hover pop-up country information on saved routes
* Enable users to write comments about a location
* Like or dislike a location

## <a name="author"></a>Author

Adventure Awaits' creator Jina Zhu is an up and coming software engineer who previously worked as a Copywriter. Her love for discovering new places inspired her to make Adventure Awaits her first full-stack application. 
