const dotenv = require("dotenv");
const express = require("express");
const { connectDb } = require("./db-connect");
const Book=require("./models/Books");
const usersRouter = require("./routes/users.router");

const env = dotenv.config();
console.log("Loaded environment config: ", env);

connectDb();

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to our fullstack Book App!</h2>
    <div>Our routes:<div>
    <div>Home: <a href="/">/</a></div>
    <div>Books: <a href="/books">/books</a></div>
    <div>Users: <a href="/users">/users</a></div>
    `);
});

app.get("/books", async (req, res) => {
    const booksAll=await Book.find();
  res.json(  booksAll);
});

app.use("/users", usersRouter)

// handle non existing routes
app.use((req, res, next) => {
  res.status(404).json({ error: "This route does not exist!" });
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log("Server listening at http://localhost:" + PORT);
});
