const express = require("express");
const userRouter = require("./routes/UserRouter");
const bookmarkRouter = require("./routes/bookmarkRouter");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

async function dbConnect(){
    await mongoose.connect("mongodb+srv://krishna:krish572@dbpractice.im8byly.mongodb.net/BookMark-Manager")
    console.log('DB connection successful');
    app.listen(3000, function(){
        console.log("Server is listening on Port 3000");
    })
}

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/", userRouter);
app.use("/user", bookmarkRouter);



try{
    dbConnect()
}catch(err){
    console.log("Error while connecting to DB");
}