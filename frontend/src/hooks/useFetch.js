import { useEffect, useState } from "react";
import api from "../api";

export function useFetch(url){
    
    const [bookmarks, setBookmarks] = useState([]);

    async function getBookmarks(){
        try{
            const response = await api.get(url)
            setBookmarks(response.data.bookmarks);
        }catch(err){
            console.log(err);
        }
    }
    
    useEffect(function() {
        getBookmarks();
    }, [api])

    return{
        bookmarks,
        getBookmarks
    }

}


