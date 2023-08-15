var express = require("express");
var app = express();

/////////////////////////////////                        MYSQL REQUIREMENT
var mysql = require("mysql");

/////////////////////////////////                        NODEMAILER REQUIREMENT
var nodemailer = require("nodemailer");

/////////////////////////////////                        GENERATE-PASSWORD REQUIREMENT
var generator = require('generate-password');

/////////////////////////////////                        FILE UPLOAD REQUIREMENT
var fileupload = require("express-fileupload");

/////////////////////////////////                        NEXMO REQUIREMENT - SMS
var Nexmo = require('nexmo');

/////////////////////////////////                        SERVER START PORT
app.listen(2007, function(){
    console.log("Server Started");
})

/////////////////////////////////                        to open index of the project
app.get("/",function(req, resp){
    var path = __dirname+"/public/index.html";
    resp.sendFile(path);
})

/////////////////////////////////                        to add pic/css/js files to the project, rather acceptable by server 
app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

app.use(fileupload());

/////////////////////////////////                        DATABASE DETAILS
var dbConfiguration={
    host:"localhost",
    user:"root",
    password:"",
    database:"hostel"
}

/////////////////////////////////                        DATABASE REFERNCE
var refDataBase = mysql.createConnection(dbConfiguration);

refDataBase.connect(function(error)
{
    if(error)
        console.log(error);
    else
        console.log("Server Connected");
})

/////////////////////////////////                        NODEMAILER DETAILS
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'flamboyant712@gmail.com',
      pass: 'diqhgoqeqgwrzsef'
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        INDEX PAGE                        /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////                        REQUEST FOR HOSTEL - REQUEST BUTTON
app.get("/request", function(req,resp){
    console.log(req.query);

    var {email, tel, gender, branch, year} = req.query;

    var aryRequests = [email, tel, gender, branch, year];

    refDataBase.query("insert into request(email, contact, gender, branch, year, requestDate) values(?,?,?,?,?,now())", aryRequests, function(error){
        if(error)
        {
            resp.send("Duplicate entries are not allowed")
            // resp.send(error.toString());
        }
        else
        {
            resp.send("You will be notified about hostel allotment soon via email");

            var mailOptions = {
                from: 'flamboyant712@gmail.com',
                to: email,
                subject: 'Request for Hostel Allotment at MRSPTU-GZSCCET, Bathinda',
                text: 'Welcome '+email+' to the HOSTELS of Maharaja Ranjit Singh Punjab Technical University, Bathinda. We are glad to have you '+
                'here with us. You will be notified soon on this same email address about the hostel allotment status. Please stay in contact with us. We will make sure you have a great experience.'
            };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        }
            
    });

    //     var from ='91 175 6574345';
    //     var to = tel;
    //     var text  = 'Greetings from Geeksforgeeks';
    
    // nexmo.message.sendSms(from, to, text, function(error, result) {   
    //     if(error) {
    //         console.log("ERROR", error)
    //     }
    //     else {
    //         console.log("RESULT", result)
    //     }
    // });

});

/////////////////////////////////                        MANAGER LOGIN TO DASHBOARD
app.get("/managerLogin",function(req,resp){
    console.log(req.query);

    var {emailManager, passwordManager} = req.query;

    var aryLogin = [emailManager, passwordManager];

    refDataBase.query("select * from managers where email=? and password=?", aryLogin, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        MANAGER SERVICES                  /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                        TO GET MANAGER DETAILS TO BE USED FOR NEXT ACTIONS
app.get("/managerPending",function(req,resp){
    console.log(req.query);

    var {email} = req.query;

    var aryLogin = [email];

    refDataBase.query("select * from managers where email=?", aryLogin, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        REQUESTHOSTEL.HTML                /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                        REQUEST GH1 IN MANAGER DASHBOARD - REQUESTHOSTEL.HTML
app.get("/getGH1",function(req,resp){
    console.log(req.query);

    refDataBase.query("select * from request where gender='Girl' && year='1' || year='2' || year='3' || year='4' && branch!='Master of Technology' order by request.requestDate", function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        REQUEST GH1 IN MANAGER DASHBOARD - REQUESTHOSTEL.HTML
app.get("/getGH2",function(req,resp){
    console.log(req.query);

    refDataBase.query("select * from request where gender='Girl' && year='1' || year='2' && branch='Master of Technology' ", function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        REQUEST BH1 IN MANAGER DASHBOARD - REQUESTHOSTEL.HTML
app.get("/getBH1",function(req,resp){
    console.log(req.query);

    refDataBase.query("select * from request where gender='Boy' && year='2' && branch!='Master of Technology' order by request.requestDate ", function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        REQUEST BH2 IN MANAGER DASHBOARD - REQUESTHOSTEL.HTML
app.get("/getBH2",function(req,resp){
    console.log(req.query);

    refDataBase.query("select * from request where gender='Boy' && year='2' || (branch='Master of Technology' || year='1' && year='2') order by request.requestDate ", function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        REQUEST BH3 HTML DASHBOARD - REQUESTHOSTEL.HTML
app.get("/getBH3",function(req,resp){
    console.log(req.query);

    refDataBase.query("select * from request where gender='Boy' && year='3' && branch!='Master of Technology' order by request.requestDate ", function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        REQUEST BH4.HTML DASHBOARD - REQUESTHOSTEL.HTML
app.get("/getBH4",function(req,resp){
    console.log(req.query);

    refDataBase.query("select * from request where gender='Boy' && year='4' && branch!='Master of Technology' order by request.requestDate ", function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        REQUEST BH5 IN MANAGER DASHBOARD - REQUESTHOSTEL.HTML
app.get("/getBH5",function(req,resp){
    console.log(req.query);

    refDataBase.query("select * from request where gender='Boy' && year='1' || (branch='Master of Technology' || year='1' && year='2') order by request.requestDate", function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        ALLOT BUTTON - HOSTEL ALLOTMENT VERIFICATION
app.get("/allotHostel",function(req,resp){

    var {email, hostel} = req.query;

    var aryAllot = [hostel, email];

    refDataBase.query("insert into hostlers(email, contact, rollNo, gender, branch, year, name, father, parentContact, picture, address, pin, category, profileStatus, hostel) select request.email, request.contact, request.rollNo, request.gender, request.branch, request.year, request.name, request.father, request.parentContact, request.picture, request.address, request.pin, request.category, request.profileStatus, ? from request where email=?",aryAllot, function(error){
        if(error)
        resp.send(error.toString());
        else
        {
            var aryDlt = [email];

            refDataBase.query("delete from request where email=?",aryDlt,function(error2){
                if(error2)
                resp.send(error2.toString());
                else
                resp.send(email);
            })

            var password = generator.generate({
                length: 3,
                numbers: true
            });
        
            var mailOptions = {
                from: 'flamboyant712@gmail.com',
                to: email,
                subject: 'Congratulations!!',
                text: 'Congratulations! '+email+', you have been alloted hostel no '+hostel+' at MRSPTU-GZSCCET, Bathinda. We are glad to welcom you in our hostel. Your password has been generated: '+
                password+' is your password for Student Login. Use your same email address and password to login, complete your profile and lock. Please fill the form correctly, you yourself will be '+
                'responsible for any errors generated during hostel fee payment. Thank you very much. '
            };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        
            var aryPassword = [password, email];
        
            refDataBase.query("update hostlers set password=? where email=?",aryPassword,function(error3){
                if(error3)
                    resp.send(error3.toString());
                else
                    console.log("Done");
            })
        }
    });

    

})

/////////////////////////////////                        REJECT BUTTON - HOSTEL ALLOTMENT
app.get("/reject",function(req,resp){

    var {email} = req.query;

    var aryDelete = [email];

    refDataBase.query("delete from request where email=?",aryDelete, function(error){
        if(error)
            resp.send(error.toString());
        else
            resp.send("Student Rejected Hostel");
    })
})

/////////////////////////////////                        TAKE AWAY HOSTEL BUTTON AFTER HOSTEL ALLOTMENT
app.get("/takeHostelBack",function(req,resp){

    var {email} = req.query;

    var aryDelete = [email];

    refDataBase.query("delete from hostlers where email=?",aryDelete, function(error){
        if(error)
            resp.send(error.toString());
        else
            resp.send("Student Removed from hostel");
    })
})

/////////////////////////////////                        LIST OF STUDENTS HOSTEL ALLOTED
app.get("/allotedHostel",function(req,resp){

    var {hostel} = req.query;

    var aryDelete = [hostel];

    refDataBase.query("select * from hostlers where hostel=?",aryDelete, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        ROOMALLOT.HTML                    /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                        ROOM ALLOTMENT FETCH STUDENTS WHO SENT REQUEST FOR ALLOTMENT
app.get("/fetchStudents",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from roomrequest, hostlers where roomrequest.email = hostlers.email and hostel=? ORDER BY hostlers.name",aryHostel, function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

/////////////////////////////////                        ROOM ALLOTMENT FETCH STUDENTS WHO SENT REQUEST FOR ALLOTMENT SORT BY DATE
app.get("/fetchStudentsDate",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from roomrequest, hostlers where roomrequest.email = hostlers.email and hostel=? ORDER BY roomrequest.requestDate",aryHostel, function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

/////////////////////////////////                        ROOM ALLOTMENT
app.get("/allotRoom",function(req,resp){
    console.log(req.query);

    var {email, room} = req.query;

    var aryRoom = [room, email];

    refDataBase.query("update hostlers set room=? where email=?",aryRoom,function(error){
        if(error)
            resp.send(error.toString());
        else
        {
            var aryDlt = [email];

            refDataBase.query("delete from roomrequest where email=?",aryDlt,function(error2){
                if(error2)
                resp.send(error2.toString());
                else
                resp.send(email);
            })
        }
    })

    var mailOptions = {
        from: 'flamboyant712@gmail.com',
        to: email,
        subject: 'Room Alloted',
        text: 'Congratulations! '+email+', you have been alloted room no '+room+' in your alloted hostel at MRSPTU-GZSCCET, Bathinda. We are glad to welcome you in our hostel.  '+
        'Looking forward to see you enjoying and studying hard in your room and hostel. Hostels at university are a home-vibe you will experience. Thank you very much. '
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
})

/////////////////////////////////                        REJECT BUTTON - HOSTEL ALLOTMENT
app.get("/rejectRoom",function(req,resp){

    var {email} = req.query;

    var aryDelete = [email];

    refDataBase.query("delete from roomrequest where email=?",aryDelete, function(error){
        if(error)
            resp.send(error.toString());
        else
            resp.send("Student Rejected Room in the hostel");
    })
})

/////////////////////////////////                        LIST OF STUDENTS HOSTEL ALLOTED
app.get("/allotedRoom",function(req,resp){

    var {hostel} = req.query;

    var aryDelete = [hostel];
console.log(hostel);
    refDataBase.query("select * from hostlers where hostel=? and room!='0' ",aryDelete, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
    })
})

/////////////////////////////////                        HOSTEL ALLOTED AND THEN REJECT
app.get("/takeAwayRoom",function(req,resp){

    var {email} = req.query;

    var aryDelete = [email];

    refDataBase.query("update hostlers set room='0' where email=?",aryDelete, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        HOSTEL FEE STATUS                 /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                           FETCH STUDENTS WITH ROOM ALLOTED
app.get("/getPaidStatus",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from hostlers where room!='0' and feeStatus1st!='Paid' and hostel=?",aryHostel, function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

/////////////////////////////////                        PAID STATUS DONE
app.get("/paidFee",function(req,resp){
    console.log(req.query);

    var {email} = req.query;

    var aryFee = [email];

    refDataBase.query("update hostlers set feeStatus1st='Paid' where email=?",aryFee ,function(error){
        if(error)
            resp.send(error.toString());
        else
        {
            var mailOptions = {
                from: 'flamboyant712@gmail.com',
                to: email,
                subject: 'Hostel Fee status',
                text: 'Congratulations! '+email+' your hostel fee of this semester has been paid. You can check your paid status in your dashboard by logging with your mail id and password.'
            };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        }
    })

    
})

/////////////////////////////////                           FETCH STUDENTS WITH FEE PAID STATUS APPROVE
app.get("/getPaidStatus2",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from hostlers where room!='0' and feeStatus1st='Paid' and feeStatus2nd!='Paid' and hostel=?",aryHostel, function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

/////////////////////////////////                        PAID STATUS DONE
app.get("/paidFee2nd",function(req,resp){
    console.log(req.query);

    var {email} = req.query;

    var aryFee = [email];

    refDataBase.query("update hostlers set feeStatus2nd='Paid' where email=?",aryFee ,function(error){
        if(error)
            resp.send(error.toString());
        else
        {
            var mailOptions = {
                from: 'flamboyant712@gmail.com',
                to: email,
                subject: 'Hostel Fee status',
                text: 'Congratulations! '+email+' your hostel fee of this semester has been paid. You can check your paid status in your dashboard by logging with your mail id and password.'
            };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        }
    })

})

/////////////////////////////////                           FETCH STUDENTS WITH FEE PAID STATUS APPROVE
app.get("/getPaidStatus3",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from hostlers where room!='0' and feeStatus1st='Paid' and feeStatus2nd='Paid' and hostel=?",aryHostel, function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        MESS FEE STATUS                   /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                           FETCH STUDENTS WITH ROOM ALLOTED
app.get("/getMessStatus",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from hostlers where room!='0' and messStatus!='Paid' and hostel=?",aryHostel, function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

/////////////////////////////////                        PAID STATUS DONE
app.get("/paidMessFee",function(req,resp){
    console.log(req.query);

    var {email} = req.query;

    var aryFee = [email];

    refDataBase.query("update hostlers set messStatus='Paid' where email=?",aryFee ,function(error){
        if(error)
            resp.send(error.toString());
        else
        {
            resp.send("paid");
            console.log("Paid");
        }
    })
})

/////////////////////////////////                           FETCH STUDENTS WITH FEE PAID STATUS APPROVE
app.get("/getPaidStatusMess",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from hostlers where room!='0' and messStatus='Paid' and hostel=?",aryHostel, function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        SEARCH PAGE OF MANAGERS           /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////                         FETCH CITIES
app.get("/getGender",function(req,resp){
    refDataBase.query("select distinct gender from hostlers",function(error,JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

////////////////////////////////                         FETCH CITIES
app.get("/getHostel",function(req,resp){
    console.log(req.query);

    var {gender} = req.query;

    var aryHostel = [gender];

    refDataBase.query("select distinct hostel from hostlers where gender=?",aryHostel,function(error,JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

////////////////////////////////                         GET ALL WRT HOSTEL
app.get("/getWRThostel",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from hostlers where hostel=?",aryHostel,function(error,JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

////////////////////////////////                         FETCH ROOMS
app.get("/getRoom",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryRoom = [hostel];

    refDataBase.query("select distinct room from hostlers where hostel=?",aryRoom,function(error,JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

////////////////////////////////                         GET ALL WRT HOSTEL
app.get("/getWRThostelroom",function(req,resp){
    console.log(req.query);

    var {hostel, room} = req.query;

    var aryHostel = [hostel, room];

    refDataBase.query("select * from hostlers where hostel=? and room=?",aryHostel,function(error,JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        CHANGE PASSWORD                   /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                        CHECK OLD PASSWORD TO CHANGE OF MANAGERS
app.get("/confirmPwdManagers",function(req,resp){
    console.log(req.query);

    var {email, oldPwd} = req.query;

    var aryLogin = [email, oldPwd];

    refDataBase.query("select * from managers where email=? and password=?", aryLogin, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        CHANGE OLD PASSWORD TO NEW PASSWORD OF MANAGERS
app.get("/updatePasswordManagers",function(req,resp){
    console.log(req.query);

    var {email, newPwd, oldPwd} = req.query;

    var aryUpdate = [newPwd, email, oldPwd];

    refDataBase.query("update managers set password=? where email=? and password=?", aryUpdate, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        RETURN SEURITY.HTML               /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/doMove",function(req,resp){

    var {email, contact, rollNo, gender, branch, year, name, father, parentContact, picture, address, pin, category, profileStatus} = req.query;

    var aryMove = [email, contact, rollNo, gender, branch, ++year, name, father, parentContact, picture, address, pin, category, profileStatus];

    refDataBase.query("insert into request (email, contact, rollNo, gender, branch, year, name, father, parentContact, picture, address, pin, category, profileStatus, requestDate) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,now())", aryMove, function(error){
        if(error)
            resp.send(error.toString());
        else
        {
            // var aryYear = [year, email];

            // refDataBase.query("update request set year where email=?",aryYear,function(error2){
            //     if(error2)
            //     resp.send(error2.toString());
            //     else
            //     {
                    var aryDlt = [email];

                    refDataBase.query("delete from hostlers where email=?",aryDlt,function(error3){
                        if(error3)
                        resp.send(error3.toString());
                        else
                        resp.send(email);
                    })
                // }
            // })
        }
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        MESSACCOUNT.HTML                  /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                        MESS ACCOUNT ALLOTMENT FETCH STUDENTS
app.get("/fetchForAccount",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from hostlers where messAccountNo='0' and room!='0' and hostel=? ORDER BY hostlers.room",aryHostel, function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

/////////////////////////////////                        MESS ACCOUNT ALLOTMENT FETCH STUDENTS
app.get("/allotedAccount",function(req,resp){
    console.log(req.query);

    var {hostel} = req.query;

    var aryHostel = [hostel];

    refDataBase.query("select * from hostlers where messAccountNo!='0' and hostel=? ORDER BY hostlers.room",aryHostel, function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

/////////////////////////////////                        ROOM ALLOTMENT
app.get("/allotAccount",function(req,resp){
    console.log(req.query);

    var {email, account} = req.query;

    var aryRoom = [account, email];

    refDataBase.query("update hostlers set messAccountNo=? where email=?",aryRoom,function(error){
        if(error)
            resp.send(error.toString());
        else
        {
            var mailOptions = {
                from: 'flamboyant712@gmail.com',
                to: email,
                subject: 'Room Alloted',
                text: 'Congratulations! '+email+', you have been alloted MESS ACCOUNT NO '+account+' in your alloted hostel at MRSPTU-GZSCCET, Bathinda. We are glad to welcome you in our hostel.  '+
                'Looking forward to see you enjoying and studying hard in your room and hostel. Hostels at university are a home-vibe you will experience. Thank you very much. '
            };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        }
    })

})

/////////////////////////////////                        REJECT BUTTON - HOSTEL ALLOTMENT
app.get("/rejectRoom",function(req,resp){

    var {email} = req.query;

    var aryDelete = [email];

    refDataBase.query("delete from roomrequest where email=?",aryDelete, function(error){
        if(error)
            resp.send(error.toString());
        else
            resp.send("Student Rejected Room in the hostel");
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        STUDENT SERVICES                  /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////                        STUDENT LOGIN TO DASHBOARD
app.get("/studentLogin",function(req,resp){
    console.log(req.query);

    var {studentemail, studentpassword} = req.query;

    var aryLogin = [studentemail, studentpassword];

    refDataBase.query("select * from hostlers where email=? and password=?", aryLogin, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        STUDENT FETCH DETAILS
app.get("/fetchStudentDetails",function(req,resp){
    console.log(req.query);

    var {email} = req.query;

    var aryStuFetch = [email];

    refDataBase.query("select * from hostlers where email=?", aryStuFetch,function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

app.get("/getprofile",function(req,resp){
    console.log(req.query);

    var {email} = req.query;

    var aryProfile = [email];

    refDataBase.query("select * from hostlers where email=?", aryProfile,function(error, JSONrecords){
        if(error)
        resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        PROFILE.HTML                      /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                        SAVE STUDENT DETAILS
app.post("/saveStuProfile", function(req,resp){
    console.log(req.body);

    var {email, name, rollno, father, parentContact, address, pin, category} = req.body;

    var fileName = email+"_"+req.files.upload.name;
    var filePath = process.cwd() + "/public/uploads/"+fileName;
    req.files.upload.mv(filePath);

    var aryStudent = [rollno, name, father, parentContact, fileName, address, pin, category, email];

    refDataBase.query("update hostlers set rollNo=?, name=?, father=?, parentContact=?, picture=?, address=?, pin=?, category=? where email=?",aryStudent,function(error){
        if(error)
            resp.send(error.toString());
        else
            // resp.send(students/profile.html);
            // resp.sendFile('students/profile.html', {root: __dirname });
            {
                var path = __dirname+"/public/students/profile.html";
                resp.sendFile(path);
            }
    })
})

/////////////////////////////////                        LOCK PROFILE
app.get("/lockProfile", function(req,resp){
    console.log(req.query);

    var profileStatus = "Lock";
    var {email} = req.query;

    var aryLock = [profileStatus, email];

    refDataBase.query("update hostlers set profileStatus=? where email=?",aryLock,function(error){
        if(error)
            resp.send(error.toString());
        else
            resp.send("Your profile has been locked, now you are free to request for room in your assigned hostel.");
    })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        REQUEST FOR ROOM                  /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                        REQUEST BUTTON
app.get("/requestRoom", function(req,resp){
    console.log(req.query);

    var {email, cgpa} = req.query;

    var aryRequests = [email, cgpa];

    refDataBase.query("insert into roomrequest values(?,?,now())", aryRequests, function(error){
        if(error)
            resp.send(error.toString());
        else
            resp.send("Requested for Room allotment");
    });

    var mailOptions = {
        from: 'flamboyant712@gmail.com',
        to: email,
        subject: 'Requested for Room Allotment',
        text: 'Hello '+email+', you will be notified soon to this same email address about the room allotment status. Please stay in contact with us. We will make sure you have a great experience.'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
/////////////////////////////////                        CHANGE PASWORD                    /////////////////////////////////
/////////////////////////////////                                                          /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////                        CHECK OLD PASSWORD TO CHANGE OF STUDENTS
app.get("/confirmPwd",function(req,resp){
    console.log(req.query);

    var {email, oldPwd} = req.query;

    var aryLogin = [email, oldPwd];

    refDataBase.query("select * from hostlers where email=? and password=?", aryLogin, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
            resp.send(JSONrecords);
            console.log(JSONrecords);
    })
})

/////////////////////////////////                        CHANGE OLD PASSWORD TO NEW PASSWORD OF STUDENTS
app.get("/updatePassword",function(req,resp){
    console.log(req.query);

    var {email, newPwd, oldPwd} = req.query;

    var aryUpdate = [newPwd, email, oldPwd];

    refDataBase.query("update hostlers set password=? where email=? and password=?", aryUpdate, function(error, JSONrecords){
        if(error)
            resp.send(error.toString());
        else
        resp.send(JSONrecords);
        console.log(JSONrecords);
    })
})