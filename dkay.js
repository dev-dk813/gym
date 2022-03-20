const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const port = process.env.PORT || 5000

mongoose.connect('mongodb://localhost/gym', {useNewUrlParser: true, useUnifiedTopology: true});

// Defining Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more: String
  });

const Contact = mongoose.model('gym', contactSchema);

// Express Specific Stuff
app.use('/static', express.static("static"));
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on internet so far."
    const params = {"title": "Gym Site", "content": con}
    res.status(200).render('index.pug', params)
})

app.post('/', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("Item was not saved to the databse")
    })
    // res.status.render('index.pug');
});

// app.post('/', (req, res)=>{
//     name = req.body.name
//     age = req.body.age
//     gender = req.body.gender
//     address = req.body.address
//     more = req.body.more

//     let outputToWrite = `The name of the client is ${name}, ${age} years old, ${gender}, residing at ${address}. More about him/her ${more}.`
//     fs.writeFileSync("output.txt", outputToWrite);

//     const params = {'Message': 'Your form has been submitted successfully'}
//     res.status(200).render('index.pug', params);
// })

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
});