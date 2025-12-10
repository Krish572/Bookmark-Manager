import { Navbar } from "./components/Navbar";
import { Signup } from "./components/Signup";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom"
import { Signin } from "./components/Signin";
import { Layout } from "./components/Layout";
import { BookMark } from "./components/Bookmark";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Navigate to="/signin" replace/>}/>
            <Route path="signin" element={<Signin/>}/>
            <Route path="signup" element={<Signup/>}/>
          </Route>
          <Route>
            <Route path="/user" element={<Layout/>}>
              <Route path="bookmark" element={<BookMark/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
