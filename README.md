# Vespira

LOGO & INTRO Goes here

## Table of Contents

TOC goes here

## About Project

Two paragraphs about the project and scope. ref SRS

## Getting Started

The following things need to be added here

### Running the project using docker compose

### Cloning the project & contributing to the project

## Project Structure

Link to the miro and a brief writeup on what the project structure looks like goes here

## Command list

1. starting the project `docker-compose up`
2. connecting to mongo db container `docker exec -it vespira-mongodb_container-1 bash`
3. loggin on to mongo db user `mongosh -u <username> -p <password>`
4.

## Notes on migrating from Traditional SQL to Mongo

The table structure decided upon is rather simplistic and similar to more traditional approaches implemented using SQL. To use mongodb, as a part of this unit SIT725, it is crucial to understand how the data is being migrated from the decided strcture (given on the miro board) to its implementation in mongodb

### notes related to mongodb - crucial for understanding

1. stores everything as json documents
2. maps to object attribute-values present in code
3. nesting and hierarchial relationships possible
4. lacks supports for date and binary data(but mongo uses bson-binary json to circumvent)
5. no fixed lengths and slower read-write operations(again, bson supports specific data)
6. for those familiar with relational database - collections in mongodb are similar to collections, but flexible
7. collections do not enforce a schema, and same collection can have different fields
8. aggregation pipelines - sequential operations(many different operation types 150), similar to sql queries
9. allows monitorying using javascript - potential opportunity to setup monitoring of resource usage
10. access to the database is user-specific, each db has its own set of users

### migration notes

the first most important point is that the docker compose has been setup in a way to pre-initialize the database with a few tables as decided upon. this is done by,

1. the specific file is volume mounted `./database/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro`
2. the `mongo-init.js` file defines the relevant db users and the table-collections that are going to be needed for the platform to work propoerly (future updates should include using the values of the environment variables - for the js fine not the .env file)
3. the js file begins by first defining the main database (future updates might have an additional database that would track error logs, take backups etc)
4. then the collections within the database is defined, these would be usermaster, userhistory, prescriptionhistory, orderhistory, pharmacy, doctors, prescriptions, paymenthistory
5. initial values are also going to be inserted into the collection so that the website can use it as it is loading

note: these are not the final set of steps and might change with future updates

## LINKS

database setup reference links
1. https://dev.to/sonyarianto/how-to-spin-mongodb-server-with-docker-and-docker-compose-2lef
2. https://www.bmc.com/blogs/mongodb-docker-container/
3. https://stackoverflow.com/questions/73582703/mongo-command-not-found-on-mongodb-6-0-docker-container
4. https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up
5. https://devconnected.com/how-to-set-upstream-branch-on-git/
6. https://www.mongodb.com/basics
7. https://dev.to/jsheridanwells/dockerizing-a-mongo-database-4jf2
8. https://stackoverflow.com/questions/13937806/mongodb-database-vs-collection
9. https://gist.github.com/andreasonny83/b24e38b7772a3ea362d8e8d238d5a7bc
10. https://www.educative.io/answers/how-to-add-folder-to-gitignore
11. https://onexlab-io.medium.com/docker-mongodb-multiple-databases-62a685c4352a
