const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const ADMIN = [];
const Course=[]
noOfRequests = 0;
app.use(bodyParser.json());
function middleware1(req, res, next) {
  noOfRequests = noOfRequests + 1;
  next();
}

app.use(middleware1);

const adminAuthentication=(req,res,next)=>{
  const email=req.body.email
  const password=req.body.password
  console.log(email)
  console.log(password)
  const admin=ADMIN.find((a)=>a.email===email && a.password === password)
  if(admin){
    next()
  }
  else{
     res.status(403).json({message:"Admin authentication failed"})
  }
}

app.post("/SignUp", (req, res) => {
  const inputUserName = req.body.userName;
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
 
  const userExists = ADMIN.find(
    (a) => a.userName === inputUserName || a.email === inputEmail
  );
  console.log(userExists);
  if (userExists) {
    return res.status(400).json("User already exists. Please log in.");
  } else {
    const newUser = {
      id: crypto.randomUUID(),
      email: inputEmail,
      userName: inputUserName,
      password: inputPassword,
    };

    console.log(newUser);
    
    ADMIN.push(newUser);
    console.log(ADMIN)
    res.status(200).json("SignUp is successfull Please Login");
  }
});

app.post("/login",adminAuthentication,(req,res)=>{
    // const inputEmail=req.body.email
    // const inputPassword=req.body.password

    // const userExists=ADMIN.find((a)=>a.email===inputEmail && a.password===inputPassword)
    // console.log(userExists) 
    // if(userExists){
    //     res.status(200).json("You login successfully")
    // }
    // else{
    //     res.status(404).json("You have entered wrong credentials")
    // }

res.json({message:"Logged in succesfully"})

})

app.post('/addCourse',(req,res)=>{
  const inputtitle=req.body.title
  const inputdescription=req.body.description
  const inputprice=req.body.price
  const inputimageLink=req.body.imageLink
  const inputpublished=req.body.published  
if(Course.length>0){
  const getcourse=Course.find((c)=>c.title===title)
if(getcourse){
  res.send(404).json("Please Enter another Title. Title already exists")
}
}
else{
  const newCourse={
    title:inputtitle,
    description:inputdescription,
    price:inputprice,
    imageLink:inputimageLink,
    published:inputpublished
  }

  Course.push(newCourse)
  res.status(200).json("Course Created Successfully")
}})



app.listen(port, () => {
  console.log("Your Server is running on the port", port);
});
