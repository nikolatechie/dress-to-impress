import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useAuth} from "../hooks/useAuth.ts";

function Header() {
    const [isAuthenticated, user] = useAuth();
    function changeTheme() {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.classList.toggle("dark-mode")
    }
    return (
        <header className="header">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="/">App</Navbar.Brand>
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="me-auto">
                            <Nav.Link active={true}>Home</Nav.Link>
                            {
                                !isAuthenticated ? (
                                        <div>
                                            <a href="/login"
                                               className="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex">
                                                Login
                                            </a>
                                            <a href="/register"
                                               className="btn btn-outline-secondary btn-sm fs-sm rounded d-none d-lg-inline-flex ms-1">
                                                Register
                                            </a>
                                        </div>
                                    ) :
                                        <NavDropdown
                                            id="nav-dropdown-dark-example"
                                            title={user?.email}
                                            menuVariant="dark"
                                            className="d-lg-none"
                                        >
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">
                                                Another action
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">
                                                Separated link
                                            </NavDropdown.Item>
                                        </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <div className="form-check form-switch mode-switch pe-lg-1 ms-auto me-4" data-bs-toggle="mode">
                        <input type="checkbox" className="form-check-input" id="theme-mode" onChange={changeTheme}/>
                        <label className="form-check-label d-none d-sm-block" htmlFor="theme-mode">Light</label>
                        <label className="form-check-label d-none d-sm-block" htmlFor="theme-mode">Dark</label>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {
                        !isAuthenticated ? (
                            <div>
                                <a href="/login"
                                   className="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex">
                                    Login
                                </a>
                                <a href="/register"
                                   className="btn btn-outline-secondary btn-sm fs-sm rounded d-none d-lg-inline-flex ms-1">
                                    Register
                                </a>
                            </div>
                                ) :
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={user?.email}
                                    menuVariant="dark"
                                    className="d-none d-lg-block"
                                >
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                    }
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;