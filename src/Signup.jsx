import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./signup.css";
import { useNavigate, Link } from "react-router-dom";
import supabase from "./Client";

function Signup() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    var Email = e.target[0].value;
    var Password = e.target[2].value;
    var Name = e.target[1].value;

    //console.log(email,password);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: Email,
        password: Password,
        Name: Name,
      });
      alert("Verify Your Email by clicking the link sent to your email (check spam too) ")
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="signUp">
      <Container
        className="d-flex align-items-center justify-content-center "
        style={{ minHeight: "100vh" }}
      >
        <Row>
          <Row>
            <Col>
              <h3 className="text-white text-center">
                
               <img className="img-fluid" src="src\assets\Sign up-bro.svg" style={{width:"250px", height:"250px" , borderRadius:"50%",border:"2px solid white"}}></img>
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="text-white text-center"> Sign Up </h3>
            </Col>
          </Row>
          <Col className="text-white">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                Already a User ? <Link to="/login"> Login to your account </Link>
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

export default Signup;
