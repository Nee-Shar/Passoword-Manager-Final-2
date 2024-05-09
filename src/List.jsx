import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import Nave from "./Navy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./list.css";
import { eencrypt, decrypt ,GeneratePassword } from "./Secure";
import supabase from "./Client";
import toast,{ Toaster } from "react-hot-toast";
const key = import.meta.env.VITE_ENCRYPT_KEY;



function List() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [auth, setauth] = useState(false);

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from("password")
        .select("*")
        .eq("user_id", sessionStorage.getItem("userId"));
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  const checkAuthentication = () => {
    return sessionStorage.getItem("userId") !== null;
  };


  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    setauth(isAuthenticated);

    if (!isAuthenticated) {
      navigate("/"); // Change this to the appropriate login route
    } else {
      const hasShownToast = sessionStorage.getItem("hasShownToast");
      if (!hasShownToast) {
        toast.success("Successfully Logged In");
        sessionStorage.setItem("hasShownToast", true);
      }
      fetchData();
    }
  }, []);

  const [show, setShow] = useState(false);
  const [subShow, setSubShow] = useState(Array(data.length).fill(false));
  //we are holding an array of what modals to show and waht to hide depnding on click
  const handleClose = () => {setShow(false); setShowPassword(false);}
  const handleShow = () => {
    setShow(true);
    setPassword("");
  };

  const handleSubClose = (index) => {
    const newSubShow = [...subShow];
    newSubShow[index] = false;
    setSubShow(newSubShow);
  };

  const handleSubShow = (index) => {
    const newSubShow = [...subShow];
    newSubShow[index] = true;
    setSubShow(newSubShow);
  };

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function addData(siteName, userName, userPassword, notes) {
    const { error } = await supabase.from("password").insert({
      site_name: siteName,
      username: userName,
      user_password: eencrypt(userPassword, key),
      Notes: notes,
      user_id: sessionStorage.getItem("userId"),
    });
    if (!error) {
      toast('New Password Added!',
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
      fetchData();
    }
  }

  const handleDataSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const siteName = formData.get("siteName");
    const userName = formData.get("userName");
    const userPassword = formData.get("userPassword");
    const notes = formData.get("notes");

    setPassword("");
    //console.log(siteName, userName, userPassword, notes);
    addData(siteName, userName, userPassword, notes);
    handleClose();
  };

  async function deleteData(iid) {
    const { error } = await supabase.from("password").delete().eq("id", iid);
    console.log("Delete");
  }

  function logOut() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("hasShownToast");
    navigate("/");
  }


  const handleGeneratePassword = () => {
    GeneratePassword().then((generatedPassword) => {
      setPassword(generatedPassword);
    });
  };

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
       <Toaster />
       
     
      <Nave />
      <Container className="mt-4" style={{ color: "white" }}>
        <Row className="mb-1">
          <Col sm={2}></Col>
          <Col sm={6} className="text-left">
            <h4>Passwords</h4>
          </Col>

          <Col sm={4} className="text-left">
            <Button
              variant="outline-primary text-white mr-2"
              onClick={handleShow}
            >
              Add
            </Button>
            <Button variant="outline-danger text-white ms-2" onClick={logOut}>
              Log Out
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title className="fw-bold">
                  Adding New Password
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleDataSubmit}>
                  <Form.Group className="mb-3" controlId="formGroupSiteName">
                    <Form.Label>Site Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter site name"
                      name="siteName"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter user name / email id"
                      name="userName"
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="userPassword"
                      />
                      <Button
                        variant="light"
                        onClick={togglePasswordVisibility}
                        className="password-toggle-btn"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                    <Button className="mb-2 mt-2" variant="outline-success" onClick={handleGeneratePassword}>Generate Password</Button>
                    
   
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows={3} name="notes" />
                  </Form.Group>
                  <Button type="submit">Save</Button>{" "}
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={2}></Col>
          <Col
            sm={8}
            className="text-left"
            style={{ color: "rgb(186 189 187)" }}
          >
            Create, save and manage your passwords so that you can easily sign
            in to sites and apps
          </Col>

          <Col sm={2}></Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col sm={7}>
            <ListGroup >
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <ListGroup.Item
                    variant="dark"
                    className="mb-1 mt-1 text-shadow text-black"
                    action
                    onClick={() => handleSubShow(index)}
                  >
                    <div className="fw-bold">{item.site_name}</div>
                  </ListGroup.Item>

                  <Modal
                    show={subShow[index]}
                    onHide={() => handleSubClose(index)}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="fw-bold">
                        See your password
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Username:<h3> {item.username}</h3>
                      Password:<h3> {decrypt(item.user_password, key)}</h3>
                      <CopyToClipboard text={item.user_password}>
                        <Button
                          variant="success"
                          onClick={() => alert("Copied")}
                        >
                          Copy to Clipboard
                        </Button>
                      </CopyToClipboard>{" "}
                      {item.Notes && (
                        <div className="mt-3">
                          <span>Note: </span>
                          <h4>{item.Notes}</h4>
                        </div>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteData(item.id);
                          handleSubClose(index);
                        }}
                      >
                        Delete Password
                      </Button>
                      <Button
                        variant="dark"
                        onClick={() => handleSubClose(index)}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </React.Fragment>
              ))}
            </ListGroup>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default List;
