const dotenv = require('dotenv');
const express= require('express');
const {connectDb}= require('./db-connect')

const env=dotenv.config()
console.log("Loaded environment config: ", env);

connectDb()

const app=express()

app.get('/', (req, res) => {
    res.send(`
    <h2>Welcome to our fullstack Book App!</h2>
    <div>Our routes:<div>
    <div>Home: <a href="/">/</a></div>
    <div>Books: <a href="/books">/books</a></div>
    <div>Users: <a href="/users">/users</a></div>
    `)
})

app.get('/users', (req, res)=>{
    res.json([
        { _id:"u1", name:"Gael", email:"gael@gmail.com", password:"gael1"},
        { _id:"u2", name:"Elisa", email:"elisa@gmail.com", password:"elisa1"},
        { _id:"u3", name: "Robert", email:"robert@gmail.com", password:"robert1"},
    ])
})

app.get('/books', (req, res) => {
    res.json([
        { _id: "b1", title: "Name of the Wind", author: "Jadon Sanderson"},
        { _id: "b2", title: "Die Verwandlung", author: "Franz Kafka"},
        { _id: "b3", title: "Das Glasperlenspiel", author: "Hermann Hesse"}
    ])
})

// handle non existing routes
app.use((req, res, next)=>{
    res.status(404).json({ error: "This route does not exist!"})
})

const PORT=5000 || process.env.PORT
app.listen(PORT, ()=>{
    console.log("Server listening at http://localhost:"+PORT);
})