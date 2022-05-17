const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true},
    author: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Book = model("Book", BookSchema);

module.exports = Book;
