<p align="center"><img src="/static/travelLogo.png" width="200"/></p>

<kbd>![Adventure Awaits](/static/AA1.gif)</kbd>

## Description
Adventure Awaits is a full-stack web application that allows anyone to discover somewhere new by providing an insight into a country. The next time your itching to discover some place new, give it a spin!

## Table of Contents
* [Technologies](#technologies)
* [Overview](#overview)
* [Features](#features)
* [Future Features](#futurePlans)
* [Struggles](#struggles)
* [Author](#author)

## <a name="technologies"></a>Technologies

<b>Backend:</b> Python, Flask, PostgreSQL, SQLAlchemy

<b>Frontend:</b> JavaScript, React, HTML/CSS, Styled Component, Reactstrap, GSAP, Chart.js

<b>APIs:</b> Google Maps API, Google Place API, Google Geocode API, Trip Advisory, Rest Countries

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

## <a name="struggles"></a>Struggles
Adventure Awaits was my first application and it was not easy. Looking back, I learned so much in the past month. I am proud to say if I were to rebuild this app, I can do it in a week, and a month from now, I hope I can say, "I can do it in a few days." Through my many struggles, here are my top three...hope you learn from them as much as I did!

1. React: "It's going to be a steep learning curve." I 100% agree, but what isn't in the beginning? I had no idea what was going on for the first two days. I googled everything and took suggestions from my mentors and crossed my fingers it did what I wanted it to do. Day three and four weren't any easier. I relied less help from my mentors and more help on google. I decided to use function components to avoid "this" in class components. I ended learning both. Almost all online suggestions and documentation examples are written in class components. That was only the begining. There are also useState, useRef, useEffect and endless amount of libraries. I won't go into details for all of them, but I will never forget the time useEffect created an infinity loop that hit an API and costed me $75 in less than five seconds. The first four days were TOUGH, and I wanted to give up but I'm glad I didn't. I learned so much about DOM manipulation, state management, and interacting with API endpoints. I am nowhere near an expert, but I do have the knowledge to continue learning more about React. 

2. Styling: I thought styling was going to be fun. After spending nearly an hour trying to change the background color to learn that I was working with the wrong component, it's more complicated then I thought. I didn't want to just use Reactstrap, so I learn to build things from scratch. I did tutorials and try to convert them to React by using libaries. I wasn't successful with most convertions but I still learned them in Javascript. I really enjoyed learning about animations and will continue to work on that. 

3. Flask endpoint: After spending the first two weeks building my project on Flask and Jinja templates, I ended up converting it into an API service for my client. I turned my backend routes into API endpoints, so instead of serving templates, they served data. My data replied heavily on getting back informations from API request. I'm embarrassed to say I didn't know what an API was at the begining of this project. As of now, I interacted with ten APIs in total and only half gave me back accurate information and were used. 

Bonus struggle:
Branches: We only learned about the master branch at bootcamp, so when I was told to learn to create new branches for EVERY SINGLE new feature, I was a little hesitant and thought it was a waste of my time. I was wrong! It came in handle everytime I needed to debug or break something. Looking at my commits and all my branches also reminded me of what I did. 


## <a name="author"></a>Author

Adventure Awaits' creator Jina Zhu is an up and coming software engineer who previously worked as a Copywriter. Her love for discovering new places inspired her to make Adventure Awaits her first full-stack application. 
