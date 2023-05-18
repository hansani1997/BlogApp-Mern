import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Toolbar, Typography, Box, Button, Tabs, Tab } from '@mui/material';
import { authAction } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  return (
    <AppBar position='sticky' sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(186,44,176,1) 35%, rgba(0,212,255,1) 100%)"}}>
      <Toolbar>
        <Typography variant='h4'>BlogsApp</Typography>

        { isLoggedIn && (<Box display='flex' marginLeft='auto' marginRight='auto'>
          <Tabs textColor='inherit' value={value} onChange={(e,val) => setValue(val)}>
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs"></Tab>
            <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"></Tab>
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"></Tab>
          </Tabs>
        </Box>
        )}

        <Box display='flex' marginLeft='auto'>
          { !isLoggedIn && (
          <>
          <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1, borderRadius:6}} color='warning'>Login</Button>
          <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1, borderRadius:6}} color='warning'>Signup</Button> 
          </> 
          )}
          { isLoggedIn && (
          <Button 
          onClick={() => dispatch(authAction.logout())}
          LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1, borderRadius:6}} color='warning'>Logout</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
