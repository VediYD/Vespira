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

## Implementation notes

There are too many ways to implement the proposed design. The finished website would have around 10 different pages that can be visited (varying depending on the type of user using the platform). The project would make use of MVC architecture as well. Given below are few notes on code-design considerations

1. The base layer of the website would be identical, and has been coded into the `index.html` file (using the particle.js file as well).
2. DOM manipulation functions would be used to modify the `index.html` file making it specific to the page being visited by the user. For example, the `login.js` file needs to have all the code relevant to perform the DOM manipulations that modify the HTML and make them as the login page should look like.
3. Since the website is also using MVC architecture, we would also be making use of `./node_container/dbconnection.js`, `./node_container/routes/routes.js`, `./node_container/models/project.js`, `./node_container/controller/controller.js` files. Given below is a breakdown of what function each file will serve.
   - `dbconnections.js`: has code to connect to the mongo db database
   - `routes.js`: routes of the website, each route would correspond to a specific action - such as displaying a new page, accessing / updating resources, itll use functions from the controller to handle the request for each route
   - `project.js`: would likely use `dbconnection.js` to make updates to the database, interact with the databse, CRUD operations etc.
   - `controller.js`: this file would handle the logic for each route defined. specifically, this controller would call the appropriate dom manipulation functions that have already been made available to the browser using `scripts.js`
4. We would also be using `./node_container/public/js/scripts.js` file to define some general purpose DOM manipulation functions which might be used by other js files. `scripts.js` also serves as a central point where all the different dom manipulation functions from other files (depending on the page the user is on for example `login.js` has dom function for login). The script.js file will be loaded by the `index.html`. This way all the dom manipulation functions would already be available with the `index.html` file when the user loads the website.

### Implementation Notes - After Thought

While making all the DOM functions available to the `index.html` makes it easier to code the `controller.js`, it expoese the application to many risks. They are mentioned below,

1.  Security vulnerabilities: If the DOM manipulation functions are not written securely, they could be exploited by attackers to steal sensitive information or execute malicious code. For example, an attacker could inject malicious code into the DOM to steal user data or perform a cross-site scripting (XSS) attack.
2.  Data leakage: If the DOM manipulation functions are not written securely, they could be exploited by attackers to steal sensitive information from the client's browser. For example, an attacker could use JavaScript to steal data from form fields or cookies.
3.  Abusing the functionality: If the DOM manipulation functions are not properly secured, an attacker could abuse the functionality and cause harm to the website or the users.
4.  Performance issues: If the DOM manipulation functions are not optimized, they could cause performance issues that affect the website's usability.

Long term, it would be better to use frontend libraries like reactjs to handle this since they come with security built-in. For now the following things can be done to ensure that appliaction is secure enough to avoid some common vulnerabilities.

1. Validate user input: Ensure that any user input passed to the DOM manipulation functions is properly validated. For example, use regular expressions to validate that the input is of the expected format, and check for the presence of potentially malicious input such as script tags.
2. Escape user input: Ensure that any user input passed to the DOM manipulation functions is properly escaped to prevent cross-site scripting (XSS) attacks. For example, use the escape() function to escape any special characters in the input that could be used to inject malicious code.
3. Use the innerText property instead of innerHTML when adding user input to the DOM: Using innerText instead of innerHTML can prevent attackers from injecting malicious code into the DOM.
4. Use the Content-Security-Policy (CSP) header: CSP is a security feature that helps to detect and mitigate certain types of attacks, including XSS and data injection attacks. By setting the Content-Security-Policy header in your server-side code, you can restrict the types of content that can be loaded by the browser, such as scripts, images, and styles.
5. Use a framework-agnostic library such as DOMPurify or sanitize-html to sanitize user input before adding it to the DOM.
6. Use HTTPS to encrypt the communication between the client and the server, this will prevent attackers from intercepting and manipulating the data in transit.
7. Use a framework-agnostic library such as helmet to add security headers to your application, it will help you to set headers such as X-XSS-Protection, X-Frame-Options and Strict-Transport-Security.
8. Use a framework-agnostic library such as cors to handle Cross-Origin Resource Sharing, this will help you to restrict the origin of the requests and prevent unauthorized access.

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
