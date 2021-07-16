'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookApp', { useNewUrlParser: true, useUnifiedTopology: true });

require('dotenv').config();

// With Mongoose, everything is derived from a Schema.
const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    img_url: String
});

const Books = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

//  We've got a schema with one property, name, which will be a String. The next step is compiling our schema into a Model.
const userModel = mongoose.model('Auther', Books);


function seedMyBooks() {
    const novels = new userModel({
        email: 'maramabumurad97@gmail.com',
        books: [
            {
                name: 'Anna Karenina',
                description: 'A beautiful, aristocratic married woman from St. Petersburg whose pursuit of love and emotional honesty makes her an outcast from society. Anna\'s adulterous affair catapults her into social exile, misery, and finally suicide.',
                status: '4.6 out of 5',
                img_url: 'https://images.penguinrandomhouse.com/cover/9780679783305'
            },
            {
                name: 'The Stranger',
                description: 'A beautiful, aristocratic married woman from St. Petersburg whose pursuit of love and emotional honesty makes her an outcast from society. Anna\'s adulterous affair catapults her into social exile, misery, and finally suicide.',
                status: '4.0 out of 5',
                img_url: 'https://images.penguinrandomhouse.com/cover/9780679420262'
            }
        ]
    });

    const spiritual = new userModel({
        email: 'maramabumurad97@gmail.com',
        books: [
            {
                name: 'The Secret ',
                description: 'Everyone has something they want to either change or improve their life. Maybe it’s a better job. Maybe it’s more security. Maybe it’s love. Changing your life may feel impossible. Where would you even start? With the principles of The Secret, you will learn to use the power of your mind to make what you want a reality. Through practical steps and guidance for how to shift your feelings and behaviors to a stronger, more positive place, you will learn how to harness the Law of Attraction to create a better, happier life.',
                status: '3.5 out of 5',
                img_url: 'https://upload.wikimedia.org/wikipedia/en/0/02/TheSecretLogo.jpg'
            }]
    })

 novels.save();
//  spiritual.save();

}
// http://localhost:3003/books?email=maramabumurad97

let gettingBook = (req,res) =>{
let emailReq = req.query.email
userModel.find({email:emailReq},(error,booksData) => {
    if (error){
        res.send(error)
    }else {
        res.send(booksData[0].books)
    }
}) 
}



let functionHandler = {'seedMyBooks':seedMyBooks, 'gettingBook':gettingBook, 'userModel': userModel}
module.exports = functionHandler;