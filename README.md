# BucketList <img src="https://github.com/unisse-courses/s15-mp13/blob/master/assets/img/logo.png" width="30" height="30">

Bucketlist is a webapp for people to share their bucketlist ideas, gather inspiration from other users, and even collaborate with with the community in order to achieve your goals.

## Heroku Deployed App
[The Bucketlist](https://the-bucketlist.herokuapp.com/)

## Prerequisites
- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB Community Edition](https://www.mongodb.com/download-center#community)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas1)
- [Heroku](https://dashboard.heroku.com/login)

## Project Setup (Local)
1. Create a copy on GitHub Desktop or clone this repository by running:
   ```shell
   git clone https://github.com/unisse-courses/s15-mp13.git
   ```
3. Navigate to the directory:
   ```shell
   cd s15-mp13
   ```
5. Install the dependencies and additional packages through the **project command line** by running:
   ```shell
   npm install
   ```   
7. Run the server at:
   ```shell
   node app.js
   ```
9. Navigate to `http://localhost:3000/` in the browser to view the app.

## Dependencies
- [bcryptjs](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [express-session](https://www.npmjs.com/package/express-session)
- [handlebars](https://www.npmjs.com/package/handlebars)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [validator](https://www.npmjs.com/package/validator)

## Using the System

### Register
Register using an email address that is not yet connected to an existing account. Usernames must be unique (an error will display if inputted username already exists in the databse).

### Log In
Log In using the username and password used to register or choose one of sample accounts:
|       Username       |       Password       |
|:--------------------:|:--------------------:|
| steve_oneal          | Swoopee75            |
| chfillet             | ch-fillet            |
| popseyes             | popseyes             |      

## Authors

* Catahan, Anna Kumiko
* Cai, Mark Jayson
* Ranjo, Joshua Aaron P
