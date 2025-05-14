import { useEffect, useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import "../assets/styles/Header.css";

function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth && new Date(auth.expiresAt) > new Date();
  };

  useEffect(() => {
    setIsLoggedIn(checkAuth());
  }, [location]);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">
            Accueil
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">
            Offres Publiques
          </Nav.Link>
          <Nav.Link as={NavLink} to="/offres/professionnelles">
            Offres Professionnelles
          </Nav.Link>

          {!isLoggedIn && (
            <>
              <Nav.Link as={NavLink} to="/inscription">
                Inscription
              </Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">
                Connexion
              </Nav.Link>
            </>
          )}

          {isLoggedIn && (
            <Nav.Link as={NavLink} to="/deconnexion">
              Déconnexion
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
