# repo-name-here
Repo for a certain someone(s)

## Description
Requirements : 
 - Portofolio website that must display an image, name, description, and customer website link for each work
 - Must provide CRUD entry points for modifying the data
 - List / Grid display for the entries
 - Image upload
 - Responsive and user friendly UI

## Installation
Install the required packages in the /monofilament and /shibboleth folders
```bash
$ npm install
```

Create and start the docker container with the postgres database
```bash
$ cd raptor/ && docker compose up
```

## Running the app
First build the frontend ( monofilament ):
```bash
$ cd monofilament/ && npm run build
```
This will generate a static react website.
If the docker container is down, start it back up : 
```bash
$ docker start raptor-db-1
```
Then start the nest production build ( shibboleth ):
```bash
$ cd shibboleth/ && npm run-script start:prod
```

## Using the app
The application will then start on port 3005, and the API key login is available via the /cerberus address, with the admin key "pass".
