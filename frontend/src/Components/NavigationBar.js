import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function NavigationBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">My Shopping Site</Navbar.Brand>
          <Nav className="me-auto">
        <div>

           <Link to='/add-product'> <Nav.Link href="/add-product">Add Product</Nav.Link></Link>
        </div>
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
