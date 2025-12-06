const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email : {
        type: String,
        unique: true
    },
    password: String
})

const BookmarkSchema = new mongoose.Schema({
    url : {
        type: String,
        require: true
    },
    category: String,
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model("User", UserSchema);
const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

module.exports = {
    User,
    Bookmark
}