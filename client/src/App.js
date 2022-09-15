import "./App.css";
import {Outlet, useNavigate} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

    let navigate = useNavigate();

    return (
        <div className="App">
            <Navbar
                fixed="top"
                className="mb-3"
                bg="dark"
                variant="dark"
                collapseOnSelect expand="sm"
            >
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        Hatchery Recepty
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse style={{ justifyContent: "right",maxHeight:"120px"}}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                Hatchery Recepty
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link onClick={() => navigate("/RecipePage")}>
                                    Recepty
                                </Nav.Link>
                                <Nav.Link onClick={() => navigate("/ingredientPage")}>
                                    Ingredience
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default App;
