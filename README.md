# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# AWS stuff
## AWS email
fyps215@gmail.com \
bMHRKwU-P9MCq \
This is just a burner email for this project.
## postgres (still being modified)
maindb.sql - this is our db schema that is for holding the metadata of files and everything else like admin, folder .etc \
fileserver.sql - this is our db schema that holds the file data \
### Postgres download
To use them download postgresql https://www.postgresql.org/download/ \
Pgadmin4 will be the software that allows you to view the db, the tables, data inserted, query, view ERD, .etc \
This will be required for you to connect to our server instance in AWS RDS as it is the only way to view the DB\ 
### Before connecting to AWS 
Check ur ip address  https://whatismyipaddress.com/  \
Take the ipv4 and send to Ken or dian, need to allow connection from your ip-address if not you will not be able to connect at all 
### Connecting to AWS 
Follow from connecting to rds instance : https://adamtheautomator.com/rds-postgres/
Steps \
Under the existing server right click -> register -> server \
Enter a name for the server  
Under connections \
Host : testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com    
Port : 5432 \
Maintenance : postgres \
Username : postgres \
password : passcanliao \
Click save and you will connect to AWS RDS, under database there will be a postgres (default db by postgres DO NOT DELETE OR ALTER ANYTHING), rdsAdmin (AWS STUFF u will not be able to access)   
metadatadb - this will be our main db \
fileserver - this will be where we store the file parts 

## in django, there is a file named requirements .txt 
to run it do `pip install -r requirements.txt` this will install all the required libraries \
To run the server for django 
  `py manage.py runserver`

Remember to set the terminal from shell to cmd or py \
https://www.w3schools.io/editor/vscode-change-default-terminal/

# Python libraries
## pycrptodome
### `pip install pycryptodome` 
https://pycryptodome.readthedocs.io/en/latest/src/introduction.html   \
This is for the encryption library, most shld have it installed, but just to be sure run it.

## pyshamir 
### `pip install pyshamir`
https://pypi.org/project/pyshamir/  \
This is for shamir secret sharing, to split our pub key

## pyfinite
### `pip install pyfinite`
https://pypi.org/project/pyfinite/  \
https://github.com/emin63/pyfinite   \
This is the lib for erasure coding. For our file splitting

## zlib 
For compression we are using zlib which can be found in the base python libraries 

## psycopg2
### `pip install psycopg2`
