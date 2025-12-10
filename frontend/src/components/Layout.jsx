import {Outlet} from "react-router-dom"
import { Navbar } from "./Navbar"
import "../App.css"

export function Layout(){
    return (
        <>
            <Navbar/>
            <div className="outlet-container">
                <Outlet/>
            </div>
        </>
    )
}