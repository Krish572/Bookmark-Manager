const {Router} = require("express");
const bcrypt = require("bcrypt");
const {User, Bookmark} = require("../database/db");
const {userValidatorSignUp, userValidatorSignIn} = require("../validations/userValidations");

const router = Router();

router.post("/signup", async function(req, res){
    if(!req.body){
        return res.status(422).json({message: "Body should be passed"});
    }
    const {name, email, password} = req.body;
    const parsedData = await userValidatorSignUp.safeParse(req.body);
    if(!parsedData.success){
        // const errors = (JSON.parse(parsedData.error.message)).map(er => er.message);
        // return res.status(422).json({errors});
        const errors = parsedData.error.issues.map(err => ({
            field: err.path.join("."),
            message: err.message
        }));
        return res.status(401).json({errors});
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(404).json({message: "Email already exits"});
        }
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({message: "User Created"});
    }catch(err){
        return res.status(500).json({message: "Internal server issue"});
    }
})

router.post("/signin", async function(req, res){
    if(!req.body){
        return res.status(422).json({message: "Body should be passed"});
    }
    const {email, password} = req.body;
    const parsedData = await userValidatorSignIn.safeParse(req.body);
    if(!parsedData.success){
        const errors = parsedData.error.issues.map(err => ({
            field: err.path.join("."),
            message
        }))
        res.status(422).json({errors});
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Email does not exits"});
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(401).json({message: "Invalid Email or Password"});
        }
        //jwt.sign({userId : user_id}, jwt_secret);
        res.cookie("userId", user._id.toString(), {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24*60*60*1000
        })
        return res.status(200).json({message: "Sign in successful"});
    }catch(err){
        return res.status(500).json({message: "Internal server issue"});
    }

})

module.exports = router;