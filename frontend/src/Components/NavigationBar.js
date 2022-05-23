import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
function NavigationBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <div>
              <Link className="mx-3 link-light" to="/">
                Shopper's Stop
              </Link>
            </div>
            <div>
              <Link className="link-light" to="/add-product">
                {" "}
                Add Product
              </Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
