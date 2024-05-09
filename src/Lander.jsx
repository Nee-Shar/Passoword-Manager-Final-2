import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Typewriter from "typewriter-effect";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function LanderPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="absoulte -z-10 h-full w-full bg-slate-950">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/"></Nav.Link>
        </Nav.Item>
        <Nav.Item
          href="/"
          className="kalam-regular text-white fw-bold mt-2 text-xl"
        >
          Password Manager
        </Nav.Item>
        <Nav.Item>
          <Nav.Link></Nav.Link>
        </Nav.Item>
      </Nav>

      <Container
        style={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Container style={{ color: "white" }} className="">
        <Row>
          <Col sm={12} className="text-center">
            <img src='src\assets\security-on-animate.svg' className="img-fluid" width="400px" height="300px"></img>
          </Col>
        </Row>
          <Row className="text-center mt-0 mb-1">
            <Col sm={12} className="text-center">
              <h1 className="kalam-bold">Lets Secure your online footprint</h1>
            </Col>
          </Row>
          <Row
            style={{ display: "flex", alignItems: "center" }}
            className="mb-2"
          >
            <Col sm={12} className="text-center">
              <h1 className="titillium-web-bold-italic">What if ?</h1>
            </Col>
          </Row>

          <Row style={{ display: "flex", alignItems: "center" }}>
            <Col sm={12} className="text-center">
              <h3 className="titillium-web-regular">
                <Typewriter
                  options={{
                    strings: [
                      "You could access all your passwords with just one click",
                      "You could create strong, unique passwords for different accounts",
                      "You could store your passwords in a secure location with military-grade encryption",
                    ],
                    autoStart: true,
                    loop: true,
                    pauseFor: 2000,
                    deleteSpeed: 40,
                  }}
                />
              </h3>
            </Col>
          </Row>

          <Row className="mt-4 text-center mb-4">
            <Col sm={12}>
              <Button
                type="submit"
                variant="outline-info"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className="text-white mt-4">
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col sm={4}>
            {" "}
            <img
              src="src\assets\Secure data-bro.svg"
              className="img-fluid"
              width="400px"
              height="300px"
            ></img>{" "}
          </Col>
          <Col sm={8} className="text-center mt-2">
            <h3 className="titillium-web-semibold-italic fw-bolder" style={{textDecoration:"underline"}}>
              AES 256 Encryption
            </h3>
            <p className="p-2 ms-2 mr-2">
              Your passwords are encrypted using the gold standard in encryption
              technology, ensuring that your sensitive data remains secure from
              prying eyes. AES 256 encryption used in our password manager is so
              secure that it would take billions of years for the world's
              fastest supercomputer to crack a single encrypted password. Your
              data is locked down tighter than Fort Knox
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="text-white mt-4">
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col sm={8} className="text-center">
            <h3 className="titillium-web-semibold-italic fw-bolder" style={{textDecoration:"underline"}}>
              Password Generator
            </h3>
            <p className="p-2 ms-2 mr-2">
              Create strong, unique passwords with our built-in password
              generator. Say goodbye to weak passwords that leave you vulnerable
              to cyber threats. Our state-of-the-art algorithm ensures that each
              generated password is virtually impossible to guess, offering you
              unparalleled security for your online accounts
            </p>
          </Col>
          <Col sm={4}>
            {" "}
            <img
              src="src\assets\Forgot password-rafiki.svg"
              className="img-fluid"
              width="400px"
              height="300px"
            ></img>{" "}
          </Col>
        </Row>
      </Container>

      <Container className="text-white mt-4">
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col sm={4}>
            {" "}
            <img
              src="src\assets\Key-rafiki.svg"
              className="img-fluid"
              width="400px"
              height="300px"
            ></img>{" "}
          </Col>
          <Col sm={8} className="text-center">
            <h3 className="titillium-web-semibold-italic fw-bolder" style={{textDecoration:"underline"}}>YORO</h3>
            <p className="p-2 ms-2 mr-2">
              You Only Remember One, or YORO, is the core principle of our
              password manager. With YORO, you only need to remember one master
              password to access all of your other passwords. This means you can
              create unique, complex passwords for each of your online accounts
              without the need to remember them all. Simply log in to our
              password manager with your master password, and you'll have access
              to all of your other passwords in one secure location.
            </p>
          </Col>
        </Row>
      </Container>
      <footer className="kalam-light">
        <div className="text-center text-white p-2">
          <p>
            Made with ❤️ by{" "} Nee-Shar
            </p>
            </div>
      </footer>
    </>
  );
}

export default LanderPage;
