import { useState } from "react";
import {useFetch} from "../hooks/useFetch"
import api from "../api";
import "../styles/bookmark.css"

export function BookMark(){

    const [bookmark, setBookmark] = useState({
        "url": "",
        "category": ""
    })

    const [error, setErrors] = useState("");

    const {bookmarks, getBookmarks} = useFetch("/user/bookmarks");

    function handleChange(e){
        const {name, value} = e.target;
        setBookmark((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleAdd(){
        try{
            const response = await api.post("/user/bookmark", bookmark);
            alert(response.data.message);
            setErrors("");
            getBookmarks();
        }catch(err){
            console.log(err.response.data.errors);
            const errMsg = (err.response.data.errors.map((e) => e.message)).join(", ") || "Something went wrong";
            setErrors(errMsg);
        }
    }
    
    async function handleDelete(id){
        try{
            const response = await api.delete(`/user/bookmark/${id}`);
            alert(response.data.message);
            getBookmarks();
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="bookmark-div">
            <div className="input-div">
                <input placeholder="Enter the url"
                    name="url"
                    onChange={handleChange}
                />
                <input placeholder="Enter the Category"
                    name="category"
                    onChange={handleChange}
                />
            </div>
            {error && <span className="err-text">{error}</span>}
            <button onClick={handleAdd}>Add Bookmark</button>
            {
                bookmarks.map((bookmark) => (
                    <div className="each-bookmark" key={bookmark._id}>
                        <span>{bookmark.url} ({bookmark.category})</span>
                        <button onClick={() => handleDelete(bookmark._id)}>delete</button>
                    </div>
                ))
            }
        </div>
    )
}