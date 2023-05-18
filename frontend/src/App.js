import Header from "./components/Header";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail"
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store";

function App() {
const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(authAction.login());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          {!isLoggedIn ?  <Route path="/auth" element={<Auth/>}></Route> :
          <>
            <Route path="/blogs" element={<Blogs/>}></Route>
            <Route path="/myBlogs" element={<UserBlogs/>}></Route>
            <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
            <Route path="/blogs/add" element={<AddBlog/>}></Route>
          </>
          }
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
