import {Container, Nav, Navbar} from "react-bootstrap";

function Header() {
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
                        </Nav>
                    </Navbar.Collapse>
                    <div className="form-check form-switch mode-switch pe-lg-1 ms-auto me-4" data-bs-toggle="mode">
                        <input type="checkbox" className="form-check-input" id="theme-mode" onChange={changeTheme}/>
                        <label className="form-check-label d-none d-sm-block" htmlFor="theme-mode">Light</label>
                        <label className="form-check-label d-none d-sm-block" htmlFor="theme-mode">Dark</label>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <a href="/login" className="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex">
                        Login
                    </a>
                    <a href="/register" className="btn btn-outline-secondary btn-sm fs-sm rounded d-none d-lg-inline-flex ms-1">
                        Register
                    </a>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;