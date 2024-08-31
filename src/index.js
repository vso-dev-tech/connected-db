const express = require('express')
const mongoose = require('mongoose')
const app = express()
mongoose.connect('mongodb://localhost:27017/crud')


const UserSchema = new mongoose.Schema({
    _id: Object,
    active: Boolean, 
    branch: String,
    itemname: String,
    itemno: Number,
    stocks: Number,
    unitprice: Number, 
    unitsales: Number, 

})

const userModel = mongoose.model("items", UserSchema)


app.get("/getItems",(req, res) => {
    userModel.find({}).then((users) => {
        console.log(users, "fuck"); 
        res.json(users);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    });
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})