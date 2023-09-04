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

## 14. Run XAMPP

# 15. APPROACH

I've developed a web application called "HostelConnect" that streamlines hostel management within our campus. The project encompasses various functionalities, creating a comprehensive solution for both students and administrators.

### User-Friendly Interface: 
HostelConnect boasts an engaging and user-friendly interface, featuring dynamic animations and distinct sections for facilities, a gallery, administration, and more. This visually appealing design enhances the overall user experience.

### Student Accommodation Requests
Users can initiate their hostel accommodation requests through the platform. To do so, they need to register using their email, contact number, academic branch, and year. This information is securely stored in a database for further processing.

### Database Integration
HostelConnect incorporates a robust database system to manage user data, including accommodation requests. This structured database facilitates efficient data retrieval and management.

### Automated Email Notifications
The system automates communication by sending **automatic email notifications to users at various stages of the accommodation request process**. These notifications include confirmation of request submission and updates on request status (approval or rejection).

### Efficient Hostel Allotment
Hostel allotment is streamlined through digital processing. The platform provides hostel wardens with a user-friendly interface to **review student data and assess hostel availability**. Allotments are carried out electronically, and students are promptly informed of the outcomes through email.

### Management of Accepted Students
For students whose hostel requests are accepted, **their data is seamlessly transferred to a dedicated database table**. Additionally, they receive an **autogenerated password via email**, enabling them to access their personalized dashboard.

### Student Dashboard
The platform offers students an interactive dashboard where they can log in using their credentials. Upon login, students are guided to **complete their profiles** if necessary, ensuring that their information is up to date.

This project not only simplifies hostel management but also improves transparency and efficiency. It's built using a robust technical stack and incorporates essential security measures to protect user data.

I'm particularly proud of how we've prioritized user experience through the intuitive interface and automated notifications, which significantly enhance the overall functionality of the application.

In the future, I plan to expand the platform's capabilities to further enhance hostel management within our campus.


