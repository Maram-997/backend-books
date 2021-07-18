'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT
server.use(cors());
server.use(express.json())

const functionHandler = require('./FavBooks')
// functionHandler.seedMyBooks();


// http://localhost:3003/books?email=maramabumurad97
server.get('/books', functionHandler.gettingBook )


server.post('/newBook', addBook)


server.delete('/deleteBook/:idx', deleteBook)

server.put('/updateBook/:idx', updateBook)


function addBook(req,res){
    let {email,name,description,status,img} = req.body
    functionHandler.userModel.find({email:email},(error,booksData) => {
    if (error){
        res.send(error)
    }else {
        booksData[0].books.push({email:email,
        name:name,
        description:description,
        status:status,
        img_url:img
     })
     booksData[0].save()
     res.send(booksData[0].books)
    }
}) 
}




function deleteBook (req,res){

    let idxx = Number(req.params.idx)
    let emailReq = req.query.email;
    functionHandler.userModel.find({email:emailReq},(error,booksData) => { 
        if(error){res.send(error)
        } else {
            let newBooksArr = booksData[0].books.filter((book,index)=>{
                if(index !== idxx ){
                    return book
                } 
            })
            booksData[0].books=newBooksArr
            booksData[0].save();
            res.send(booksData[0].books)

            }

    })
}
 
function updateBook (req,res){
    const {email,name,description,status,img} = req.body
    let idxx = Number(req.params.idx)
 functionHandler.userModel.findOne({email:email},(error,booksData)=>{
    if(error){res.send(error)}
else{
    booksData.books.splice(idxx,1,{
        name:name,
        description:description,
        status:status,
        img_url:img
    })

    booksData.save();
    res.send(booksData.books)
}
})
}
 
server.listen(PORT,() => 
 {   console.log('does it work?')
})