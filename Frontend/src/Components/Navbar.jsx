import React from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logoutbtn from '../Components/Logout'


function NavbarMenu() {

  const user = useSelector((state)=> state.auth);
  console.log(user)
  const authStatus = user.status;

  const navItems = [
    {
      name : "Home",
      link : "/",
      active : true,
    },
    {
      name : "Login",
      link : "/login",
      active : !authStatus
    },
    {
      name : "Signup",
      link : "/register",
      active : !authStatus
    },
    {
      name : "All Posts",
      link : "user-posts",
      active : authStatus
    },
    {
      name : "Add Post",
      link : "add-post",
      active : authStatus
    }
  ]

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="http://localhost:5173/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Contently</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
       { authStatus ? (
           <Dropdown
           arrowIcon={false}
           inline
           label={
             <Avatar alt="User settings" img={`http://localhost:3000/${user.data.profileImg}`} rounded />
           }
         >
           <Dropdown.Header>
             <span className="block text-sm">{user.data._id}</span>
             <span className="block truncate text-sm font-medium">{user.data.email}</span>
           </Dropdown.Header>
           <Dropdown.Item as={Link} to={"/dashboard"}>Dashboard</Dropdown.Item>
           <Dropdown.Item as={Link} to={"/uploadImg"}>upload Image</Dropdown.Item>
           <Dropdown.Divider />
           <Dropdown.Item>
            <div><Logoutbtn /></div></Dropdown.Item>
         </Dropdown>
            ) : "" } 
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
      {navItems.map(
          (item) =>
            item.active && (
              <Navbar.Link key={item.name} as={Link} to={item.link} className="text-base">
                {item.name}
              </Navbar.Link>
            )
        )}
        {authStatus && <Logoutbtn/>}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarMenu;