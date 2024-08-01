import { Navbar, Container, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, emptySearch, handleInputChange, searchMovie }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Movies App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/" onClick={emptySearch}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile" onClick={emptySearch}>Profile</Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                                <Form className="me-auto">
                                    <Form.Group controlId="searchBar">
                                        <Form.Control
                                            type="text"
                                            value={searchMovie}
                                            onChange={handleInputChange}
                                            placeholder="Search movie"
                                        />
                                    </Form.Group>
                                </Form>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}