import React from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector } from 'react-redux';

function NavbarMenu() {
  const authStatus = useSelector((state)=> state.auth.status);
  const navItems = [
    {
      name : "Home",
      link : "/",
      active : authStatus
    },
    {
      name : ""
    }
  ]
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="http://localhost:5173/">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">Add Post</Navbar.Link>
        <Navbar.Link href='#'>Login</Navbar.Link>
        <Navbar.Link href='#'>Signup</Navbar.Link>
        <Navbar.Link href='#'>All Posts</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarMenu;