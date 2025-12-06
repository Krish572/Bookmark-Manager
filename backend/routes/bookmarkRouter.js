const {Router} = require("express");
const userAuthenication = require("../middleware/auth");
const {bookmarkValidator} = require("../validations/bookmarkValidations");
const {Bookmark} = require("../database/db");
const { default: mongoose } = require("mongoose");

const router = Router();

router.use(userAuthenication);

router.get("/bookmarks", async function(req, res){
    try{
        const bookmarks = await Bookmark.find({userId: req.userId});
        return res.status(200).json({bookmarks});
    }catch(err){
        return res.status(500).json({message: "Internal Server Issues"});
    }
})

router.get("/bookmark/:id", async function(req, res){
    const {id} = req.params;
    try{
        const bookmark = await Bookmark.findById(id);
        if(!bookmark) {
            return res.status(404).json({message: "Bookmark not found"});
        }
        if(bookmark.userId != req.userId){
            return res.status(403).json({message: "Unauthorized"});
        }
        return res.status(200).json({bookmark});
    }catch(err){
        return res.status(500).json({message: "Internal Server Issue"});
    }
})

router.put("/bookmark/:id", async function(req, res){
    const {url, category} = req.body;
    const {id} = req.params;

    try{
        const bookmark = await Bookmark.findById(id);
        if(!bookmark){
            return res.status(404).json({message: "Bookmark not found"});
        }
        if(req.userId != bookmark.userId){
            return res.status(403).json({message: "You are not authorized"});
        }
        await Bookmark.findByIdAndUpdate(id, {url, category}, {new: true})
        return res.status(200).json({message: "Bookmark updated successfully"});
    }catch(err){
        console.log("Error while updating Bookmark due to : " + err);
        return res.status(500).json({message: "Internal server issue"});
    }
})

router.post("/bookmark", async function(req, res){
    if(!req.body){
        return res.status(422).json({message: "body should be passed"});
    }
    const {url, category} = req.body;
    const parsedData = bookmarkValidator.safeParse(req.body);

    if(!parsedData.success){
        const errors = parsedData.error.issues.map(err => ({
            field: err.path.join("."),
            message: err.message
        }));
        return res.status(422).json({errors});
    }

    try{
        await Bookmark.create({
            url,
            category,
            userId: req.userId
        })
        return res.status(201).json({message: "Bookmarked Successfully"});
    }catch(err){
        return res.status(500).json({message: "Internal Server Issue"});
    }

})

router.delete("/bookmark/:id", async function (req, res){
    const {id} = req.params;
    try{
        const bookmark = await Bookmark.findById(id);
        if(!bookmark){
            return res.status(404).json({message: "Bookmark not found"});
        }
        if(bookmark.userId != req.userId){
            return res.status(403).json({message: "Unauthorized"});
        }
        await Bookmark.findByIdAndDelete(id);
        return res.status(200).json({message: "Bookmark deleted successfully"});
    }catch(err){
        return res.status(500).json({message: "Internal Server Issue"});
    }
})


module.exports = router;