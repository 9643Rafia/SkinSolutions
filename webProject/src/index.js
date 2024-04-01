const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// useing ejs as the view engine
app.set('view engine','ejs')
app.use(express.static("public"));
app.get("/", (req,res) =>{
    res.render("login")
})

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/home", (req, res) =>{
    res.render("home")
})
app.get("/signup", (req,res) =>{
    res.render("signup")
})
app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.email,
            password: req.body.pswd[0] // Accessing the first element of the array
        };
        /// check if user already exists
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            return res.send({ error: "User already exists. Please choose a different email" });
        } else {
            // hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;
            await collection.insertMany(data);
            console.log("Signup successful");
            res.send({ success: "Signup successful" });
             
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" }); // Send a generic error message
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.email });
        if (!check) {
            return res.send({ error: "User not found" });
        }

        // Compare the hashed password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.pswd, check.password);
        if (isPasswordMatch) {
            res.send({ success: "Login successful" }); // Send a success message if password matches
           
        } else {
            res.send({ error: "Wrong password" }); // Send an error message if the password is incorrect
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" }); // Send a generic error message
    }
});


const port = 3000;
app.listen(port,()=>{
    console.log('Server Running On Port :',port);
})
