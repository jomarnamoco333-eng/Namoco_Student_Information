import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

const TopNavigation = () => {
  let navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className="nav-link" onClick={() => navigate("/")}>
          OᗰᑎIᑕᗩᗰᑭᑌᔕ
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate("/Students")}>Students</Nav.Link>
            <Nav.Link onClick={() => navigate("/Course")}>Course</Nav.Link>
            <Nav.Link onClick={() => navigate("/Teacher")}>Teacher</Nav.Link>
            <Nav.Link onClick={() => navigate("/Enrollment")}>
              Enrollment
            </Nav.Link>

            <NavDropdown title="My Profile" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3"></NavDropdown.Item>
              <NavDropdown.Item href="#action4">View Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Log out</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              services
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavigation;
