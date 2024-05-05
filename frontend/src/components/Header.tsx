import { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth.ts';
import { FormattedMessage, IntlProvider } from 'react-intl';
import enMessages from '../../translations/en.json'; // Import English translations
import esMessages from '../../translations/es.json'; // Import Spanish translations

function Header() {
  const [isAuthenticated, user] = useAuth();
  const logout = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
  };

  function changeTheme() {
    const htmlTag = document.getElementsByTagName('html')[0];
    htmlTag.classList.toggle('dark-mode');
  }

  const [locale, setLocale] = useState('en'); // Default to English
  const messages = locale === 'en' ? enMessages : esMessages; // Use English or Spanish translations

  return (
    <IntlProvider locale={locale} messages={messages}>
      <header className="header">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <FormattedMessage id="title" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="me-auto">
                <Nav.Link active={true}>
                  <FormattedMessage id="home" />
                </Nav.Link>
                {/* Add more menu items */}
              </Nav>
              <Nav>
                <NavDropdown
                  title={<FormattedMessage id="language" />}
                  id="nav-dropdown-language"
                >
                  <NavDropdown.Item onClick={() => setLocale('en')}>English</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setLocale('es')}>Spanish</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <div className="form-check form-switch mode-switch pe-lg-1 ms-auto me-4" data-bs-toggle="mode">
              <input type="checkbox" className="form-check-input" id="theme-mode" onChange={changeTheme} />
              <label className="form-check-label" htmlFor="theme-mode"><FormattedMessage id="light" /></label>
              <label className="form-check-label" htmlFor="theme-mode"><FormattedMessage id="dark" /></label>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {!isAuthenticated ? (
              <div className="d-none d-lg-block">
                <a href="/login" className="btn btn-primary btn-sm fs-sm rounded d-none d-lg-inline-flex">
                  <FormattedMessage id="login" />
                </a>
                <a href="/register" className="btn btn-outline-secondary btn-sm fs-sm rounded d-none d-lg-inline-flex ms-1">
                  <FormattedMessage id="register" />
                </a>
              </div>
            ) : (
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={user?.email}
                  menuVariant="dark"
                  className="d-none d-lg-block"
                >
                  <NavDropdown.Item href="#action/3.1"><FormattedMessage id="action" /></NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2"><FormattedMessage id="another-action" /></NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}><FormattedMessage id="logout" /></NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Container>
        </Navbar>
      </header>
    </IntlProvider>
  );
}

export default Header;
