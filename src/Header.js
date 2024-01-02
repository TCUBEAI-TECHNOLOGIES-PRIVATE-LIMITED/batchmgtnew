import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ signOut }) => {
  return (
    <div style={{ textAlign:"center", backgroundColor:"#232525"}}>
      <Navbar bg="" variant="dark" expand="lg" >
        <Navbar.Brand href="#home" className='mx-auto'>
          <h1 style={{ color: 'white' }}>Batch Management</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto " style={{color:"white"}}>
            <Nav.Link as={Link} to="/" style={{color:"white"}}>
              Batch Creation
            </Nav.Link>
            <Nav.Link as={Link} to="/batches" style={{color:"white"}}>
              My Batches
            </Nav.Link>
            <Nav.Link as={Link} to="/addproduct" style={{color:"white"}}>
              Add Product
            </Nav.Link>
            <Nav.Link as={Link} to="/products" style={{color:"white"}}>
              My Products
            </Nav.Link>
            <Button variant='danger' onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
