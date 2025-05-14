import { useEffect, useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import "../assets/styles/Header.css";

function Header() {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);

  const checkToken = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const isValid = auth && new Date(auth.expiresAt) > new Date();
    return isValid;
  };

  useEffect(() => {
    setIsConnected(checkToken());
  }, [location]);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
          <Nav.Link as={NavLink} to="/offres/publiques">Offres Publiques</Nav.Link>

          {isConnected && (
            <Nav.Link as={NavLink} to="/offres/professionnelles">
              Offres Professionnelles
            </Nav.Link>
          )}

          {!isConnected ? (
            <>
              <Nav.Link as={NavLink} to="/inscription">Inscription</Nav.Link>
              <Nav.Link as={NavLink} to="/connexion">Connexion</Nav.Link>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/deconnexion">Déconnexion</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
