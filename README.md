# HostelConnect

## 1. Create New Folder in DropBox

## 2. Open Folder in VS Code

## 3. Create New Terminal

## 4. Run 'npm init -y'
command is a shortcut for **initializing a new Node.js project** using npm (Node Package Manager) with default settings. <br>
So, when you run npm init -y, it will **quickly generate a package.json file** in the current directory with default values.

## 5. Create 'server.js' in folder

## 6. Run 'npm install express'
command is used to **install the Express.js framework in a Node.js project**. 

Express.js is a popular **web application framework for Node.js** that simplifies the process of building web applications and APIs.

When you run this command, npm will fetch the Express package from the npm registry and install it in your project's **node_modules directory**. 

Additionally, it will update the dependencies section of your project's package.json file to include Express as a dependency.

## 7. In server.js file
ad requirements
1. express
2. mysql
3. database connectivity

## 8. Importing Express 
```
var express = require("express");
var app = express();
```
This line **imports the Express.js framework**. It assigns the functionality provided by Express to the variable express.

This line **creates an instance of an Express application**. The **'app' variable is now an Express application object,** and you can use it to configure routes, middleware, and handle HTTP requests.

## 9. Importing MySQL
```
var mysql = require("mysql");
```
This line uses the require function to import the "mysql" module into your Node.js application. 

The "mysql" module provides functionality for **connecting to and interacting with MySQL databases**.

## 10. Server Started
```
app.listen(2007, function(){
    console.log("Server Started");
})
```

This line **instructs your Express application (app) to listen on port 2007 for incoming HTTP requests**. 

The app.listen method takes two arguments: the **port number to listen on** and a **callback function**.

Once you run your Node.js application with this code, you should see the "Server Started" message in your console when the server starts, and it will be ready to handle incoming HTTP requests on port 2007.

## 11. Database Configuration
```
var dbConfiguration = {
    host: "localhost",
    user: "root",
    password: "",
    database: "hostel"
};
```

dbConfiguration: <br>
This object contains the configuration details for connecting to your MySQL database. It specifies the host, user, password, and the name of the database you want to connect to.

## 12. Creating a connection to the database
```
var refDataBase = mysql.createConnection(dbConfiguration);
```

This line creates a connection to the MySQL database using the configuration you provided. 

It utilizes the createConnection method from the mysql module to establish a **connection object (refDataBase)** that you can use to interact with the database.

## 13. Connect to the database
```
refDataBase.connect(function(error) {
    if (error)
        console.log(error);
    else
        console.log("Server Connected");
});
```

Here, you attempt to connect to the MySQL database using the connection object you created.

The connect method takes a callback function as its argument, which will be called when the connection attempt is made. 

Inside the callback, you check for any errors during the connection process. If there are errors, they will be logged to the console. If there are no errors, the message "Server Connected" will be logged to the console, indicating that the connection to the database was successful.
