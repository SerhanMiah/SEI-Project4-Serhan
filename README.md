# Project 4 - Theatre Review 

## Project Overview

A 7-day solo project where I used Django, Rest Framework, Python, CLI, AJAX, JavaScript, NodeJS, React, Insomnia, Cloudinary and AWS S3 to make an API with Django Toolkit with Rest Framework that connects to the frontend with React, that has CRUD functionality and would link OneToMany and ManytoMany relationship between the User and the multiple Apps inside the API. 


## Deployment

You will find the completed project here: https://sei65-theatre.herokuapp.com/theatre

To see the full features for Theatre, please feel free to log in using the following credentials:
email: user@email.com
password: Password@


## Code Installation:

Clone or download the repo then in your Terminal run the following commands:

* Install back-end dependencies: pipenv install
* Enter Shell for project: pipenv shell
* Make Migrations: python manage.py makemigrations
* Migrate: python manage.py migrate
* Load Seed data for Job Statuses: python manage.py loaddata job_status/seeds.json
* Load Seed data for Task Categories: python manage.py loaddata task_categories/seeds.json
* Start back-end server: python manage.py runserver


## The Brief

* Build a full-stack application by making your backend and your frontend
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database
* Consume your API with a separate front end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a  couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Be deployed online so it's publicly accessible.


![Theatre-screenshot](./src/img/screenshots/image4.png)

## Technologies used:

### Front end:
* React
* SCSS
* Axios
* Nodemon
* React Router Dom
* React Responsive Carousel

### Back end:
* Python
* Django
* Django REST Framework
* Psycopg2
* pyJWT

### Dev Tools:
* VS code
* Yarn
* Insomnia
* Git
* Github
* Google Chrome dev tools
* Heroku (deployment)
* Trello Board (planning and timeline)
* Excalidraw (wireframing)
* Zoom
* Slack





## Phase

This project consisted of four phase

### Phase 1 - (Planning):

Once I determined the nature of the app, I planned the relationships with Escalidraw and LucidChart. Then I built the API with Django using Apps, Views, and URLs. I still need to test each endpoint on Insomnia to ensure the API will function.

Wireframe: 
![theatre-screenshot]()



ERD - Relationship Planning:

By using LucidChart, simply another tool for planning like Excalidraw but specifically for detailing Entity Relationships. The above is showing how I would link OneToMany and ManytoMany relationship between the user, venue, category, review and join apps and models. 	
Throughout my planning, I used Git and GitHub for version control and decided that since I am working on this solo it would be good practice to work on branches and add, commit and push changes regularly. During the project, I created a Trello with a completed task list. To ensure that I focus on one task at a time and to make sure that I complete the work. By creating a to-do list I was able to keep on top of the project.

Trello Board: 

### Phase 2: Creating the backend with Django and Rest Framework:

This was my first time creating a backend using Python, Django, and REST. I started by installing all necessary packages (including JWT and REST, among others) to link to a PostgreSQL database. I changed the setting once it was linked to TablePlus so that all changes would show on the PostgreSQL database.

I made five apps. I first created the Users/Authorisation model by using the default AbstractUser inside Django. I was able to use all the relative fields inside of AbstractUser. I then created the main app which was a venue to hold all the theatre inside. 

I made five apps and models. One was a User/ Authorisation model (Django - Abstract User). In a single user experience, I wanted tasks unique to registered users and a limited version for non-registered users, such as adding favourite shows and writing reviews. I tested the models with Insomnia on the second day. 

By the end of phase 2, I seeded my data. I gathered the information needed for the database (images, cast, description, etc) and stored them on GoogleDrive. All endpoints were working, so I loaded it up and began installing react for the front end.



### Phase 3 Connecting to React with CRUD Functionality

I started by downloading the frontend using the CLI inside the back end folder. I installed all relevant packages for React. In the third phase, I would use many packages, for example Axios, to get the data from the API and BootStrap to make the website. I would use JSX, a combination of Vanilla JS, Semantic HTML and conditional JS, to display the relevant data stored in the API.
 
Once the API was paired using Axios, I started working on how to have the user log in and log out off the front end. This was done by using a combination of Axios, and Hooks and by storing the JWT token inside the local storage. I would be able to set the JWT Token and return the decoded Token to confirm the user by using the package Buffer with the secret key that was inside the backend.

Login


Register section - code snippet front end and backend 

Front end 



Back end API View for register



Front end auth helper file for decoding Token


Front end helper code

At this point the login, logout and registration are now completed. The next checklist was to focus on the CRUD part of the project using Django and the REST Framework. I wanted the user to be able to leave a review/comment on the individual theatre page. I went back to Trello to keep my plan simple and write a checklist on what needed to be completed and how to get it completed. I used the application Insomnia to check for HTTP requests that were working by using the different methods inside the relative views inside the API. I went back and forth between the front end and insomnia testing on how to make a PUT request - this was a crucial part of the project; I wanted the user to be able to edit their comments.
 
I was able to authenticate who the unique owner is, by their own unique JWT token stored in the local storage. I was able to confirm if the user was valid and authenticated by creating a function called userIsAuthenticated that will check the payload and by using a package called Buffer to check if the user is valid. If they are valid the user would be able to add a review to the page. 

user is authenticated code snippet

Inside the function, I created a link element and a button so the user can edit their review. A button will appear only if the user is valid, giving a link to a path so that the user can edit their review. I began first by allowing the user to be authenticated with Rest framework permission in the backend and requesting that the owner is equal to the request of the user id. Once this was done, I tested in insomnia to check if the PUT request was working then moved to the front end.

Below is a screenshot of how to edit the review based on the user. 


To overcome this I set two useState. One to hold the parseInt of the theatre and the other to hold the text as an empty string. I changed the path and view inside the review app located in the back end and tested the method was working using insomnia. I had to change the permission and the request of the owner to be equal to the requested user Id. A code snippet is shown below.


With this, I could now edit the comment with the review Id and the theatre ID as both needed to be selected. When making the path in Axios I need the path to be both the playId and the reviewId so that both the front end and back end know which theatre is selected and which review Id is selected.


By using an onSubmit and a handle change inside the Form, I was able to update the user review.  The handle submits will target the API review id, by the user authorisation from their unique JWT token. The handle change will use another useState to change the name to be equal to the value which is shown below.


code goes here

The last phase for part three involved getting the user to edit their profile page. I needed to go back to the API and insert a few more models under the user, which will hold a first name, last name and bio. I passed through the selected models as blank to equal true, as shown below so that when the user registers they will not need to input this information and can be adjusted in the edit user profile section.


### Phase 4 Styling the Frontend

The last few days were spent styling and adding my creative style to the website. I did spend this time refactoring the code to incorporate React by making it workable on mobile devices. I added React Responsive Carousel, which is a plugin to add multiple carousel images, shown on individual pages, while I try to refactor some of the codes. I also embedded the website with a youtube video by using a youtube unique id and calling the video with a function, which was a nice feature. 



## Final Product 

Home Page

![travel-screenshot](./src/img/screenshots/image4.png)





Travel Library Index Page:

![travel-screenshot](./src/img/screenshots/image9.png)




Travel Library INDIVIDUAL PAGE:

![travel-screenshot](./src/img/screenshots/image20.png)



Travel Library Register Page and Login Page:

![travel-screenshot](./src/img/screenshots/image25.png)


![travel-screenshot](./src/img/screenshots/image7.png)




Profile page:

![travel-screenshot](./src/img/screenshots/image22.png)



Travel Library Add Destination and add Review:

Add destination 

![travel-screenshot](./src/img/screenshots/image7.png)



Add Review

![travel-screenshot](./src/img/screenshots/image24.png)







## Wins & Challenges

### Win
* Using Hooks and building relationships with Django, throughout was a challenge. At first, and required a more creative approach to dealing with models with many relationships or single relationships in the back end.
* My biggest win was getting the edit review working, but I wanted it in a single component and would like to work on this in a future iteration.



### Challenges
* One of the biggest challenges was editing reviews. This could only have been done by using a PUT request and permissions. I had to find out how to get the owner as it was missing. I had to find how to acquire the owner inside the Django API and test using insomnia and displaying it in the front end.


### Bugs
* Edit review can be done by any registered user and would need to look at how the token is set and the back-end permission. 
* Look at styling bugs as some of the page's padding was taken over and couldn’t find a solution to fix this. 



## Future Content and Improvements:

* I would like to fix the edit review button so that only users who made the comments/reviews can edit or delete their reviews.
* I would like to update some of the stylings and see if I could get the like, dislike and attend working on the project.


## Key learnings
This was my first time using Django and the Rest framework, it was a unique experience coming from our previous project using mongoDB, which is more prone to errors as you had to set the URLs and get the views right which took a lot of investigation on how to Rest framework work and permission works. I did enjoy that it was more responsive as you can build apps and models quicker and get something presented relatively quick, however you need a fundamental idea of how relationships work. 
