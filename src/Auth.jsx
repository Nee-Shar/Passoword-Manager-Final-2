import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./auth.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "./Client";
function Authe() {
  const nav = useNavigate();

  const [auth, setauth] = useState(false);

  const checkAuthentication = () => {
    return sessionStorage.getItem("userId") !== null;
  };

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    setauth(isAuthenticated);

    if (isAuthenticated) {
      nav("/list"); // Change this to the appropriate login route
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const Email = document.getElementById("emaAil").value;
    const Password = document.getElementById("psd").value;
    //console.log(Email, Password);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: Email,
        password: Password,
      });
      //console.log("data", data);

      sessionStorage.setItem("userId", data.user.id);

      nav("/list");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="login ">
      <Container
        className="d-flex align-items-center justify-content-center "
        style={{ minHeight: "100vh" }}
      >
        <Row>
          <Row>
            <Col>
              <h3 className="text-white text-center">
                <img
                  className="img-fluid"
                  src="./assets/My password-pana.svg"
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                ></img>
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="text-white text-center"> Log In </h3>
            </Col>
          </Row>
          <Col className="text-white ">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  id="emaAil"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id="psd" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                New User ?<Link to="/signup"> Create new account </Link>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Authe;
