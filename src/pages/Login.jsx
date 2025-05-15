import { useState } from "react";
import { Form, Button, Container, Card, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://offers-api.digistos.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        const err = new Error(data.message || "Une erreur est survenue lors de la connexion.");
        err.status = response.status; 
        throw err;
      }

      const data = await response.json();

      dispatch(
        loginSuccess({
          token: data.access_token,
          expiresAt: new Date(Date.now() + data.expires_in * 1000).toISOString(),
        })
      );

      navigate("/offres/professionnelles");

    } catch (err) {
      console.error("Erreur de connexion :", err);

      if (err.status === 401) {
        setError("Identifiants incorrects.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Se connecter</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
