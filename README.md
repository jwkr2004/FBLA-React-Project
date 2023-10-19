# Student Event Tracker
The Student Event Tracker is a website where you can track students' points if they joined events and it can show them what events they can join. This was created for FBLA 2022-2023 competitions.

## Build Status
There should be no errors throughout the code and everything should be working.

## Tech/Framework used
We used Visual Studio Code to Test and program the website. We also used [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general-phrase_prosp-brand_gic-null_ww-multi_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=11295578158&adgroup=116363205048&cq_cmp=11295578158&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsM9K9cEUZiEyYTC1bGeTK9P_uLZIG0CHSVaaDxnq8R8JTowDA5zokaAv-HEALw_wcB) to store all of the data.

## Features
This website has many features like a login system, tracking user activity, and creating and storing data in a database.

## Requirements
Install Node on the desktop first. Then install the following the following node modules:

- [node](https://nodejs.org/en)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/docs/intro)
- [React-router-dom](https://reactrouter.com/en/main)
- [useEffect](https://reactjs.org/docs/hooks-effect.html)
- [useState](https://reactjs.org/docs/hooks-state.htm)
- [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Mongoose](https://mongoosejs.com/)
- [BodyParser](https://www.npmjs.com/package/body-parser)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [CookieParser](https://www.npmjs.com/package/cookie-parser)

## Installation
Install all of the modules in the node terminal. Then install [MongoDB Compass](https://www.mongodb.com/try/download/compass) on your computer.

## Configuration
First you open a terminal in the backend folder and then type "Npm run dev". Then open a second terminal that in the main folder and type "Npm start".

## Troubleshooting

If the page does not start make sure you have installed all the modules and that it is connected to the [Mongo database](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general-phrase_prosp-brand_gic-null_ww-multi_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=11295578158&adgroup=116363205048&cq_cmp=11295578158&gclid=Cj0KCQjwla-hBhD7ARIsAM9tQKsM9K9cEUZiEyYTC1bGeTK9P_uLZIG0CHSVaaDxnq8R8JTowDA5zokaAv-HEALw_wcB).

## Naviagtion

There are two main folders which are the backend and src. The backend folder has the node/express server(index.js) and schema models in the model folder. The src folder contains all of the CSS files, HTML pages, and SASS files. It also contains the react server in the App.js and index.js files. In the pages folder are all of the HTML pages that the student or admin will see.

## Database

We used Mongoose to connect our Database to the backend node/express server.

![FBLA Verification SS3](https://github.com/jwkr2004/FBLA-React-Project/assets/93623064/df6711fd-cbec-4a24-b63c-ed8ec72c8b74)

Then we use UseEffect and Axios to transfer data back and forth to our react and express server by getting and posting on the backend server.

React Server

![FBLA Verification SS4](https://github.com/jwkr2004/FBLA-React-Project/assets/93623064/15796a6b-5189-4f4f-9186-f98c65377357)

Backend Server

![FBLA Verification SS5](https://github.com/jwkr2004/FBLA-React-Project/assets/93623064/e328a880-418d-46ae-b1f6-9e661e1d519d)

## Created By

- Brandon Grigg
- Joshua Walker
- Kennyth Greene
