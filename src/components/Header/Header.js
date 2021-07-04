import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./Header.css";
const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <img
          alt=""
          src="https://image.flaticon.com/icons/png/512/4222/4222019.png"
          width="35"
          height="35"
          className="d-inline-block align-top"
        />
        &nbsp;&nbsp;
        <Navbar.Brand href="#home">Stock Exchange</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div className="navLink">
            <Nav className="me-auto">
              <Nav.Link href="#home">Login</Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
