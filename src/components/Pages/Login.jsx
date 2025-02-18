import "./page.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../../paintFeatures/authSlice";

const Login = () => {
  const [registered, setRegistered] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //the handleLoginUser function triggered when user clicked on the Login button
  const handleLoginUser = (e) => {
    e.preventDefault();
    //setting the userData
    if (username && password) {
      setLoginData({ username, password });
    } else {
      setError("Username and Password is Required...!");
    }
  };

  //calling api if the loginData is exist in useEffect function
  useEffect(() => {
    if (loginData) {
      setError(null);
      loginAuthentication();
    }
  }, [loginData]);

  //onSubmissionSuccess storing the Jwt_token in localstorage
  const OnSubmissionSuccess = (token, role) => {
    localStorage.setItem("token", token);
    // if (role === "admin") {
    //   navigate("/");
    // }
    // if (token) {
    //   navigate("/");
    // }
  };

  //makeing an login api Call in this function and managing the data and erroe
  const loginAuthentication = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://paint-backend.vercel.app/api/auth/login",
        loginData
      );
      console.log(res);
      const data = res.data;
      const userDetails = data.result[0];
      if (res.status === 200) {
        setIsLoading(false);
        OnSubmissionSuccess(data.token, );
        dispatch(setUser({ token: data.token, user: userDetails }));
      }
      alert("Login Successfull");
    } catch (error) {
      console.log("Login Failed:", error);
      setError("Login Failed. Please try again.");
    }
  };
  return (
    // (jwtTokenhere !== null) ? <Redirect to='/' /> :
    <div className="login-main-container">
      {isLoading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
      ) : registered ? (
        <div className="login-cards-sections-card">
          <section className="login-card">
            <div className="login-forms-card">
              <h1>Login</h1>
              <p>Sign in to your account</p>
              <form className="form-section-card">
                <Form.Group
                  style={{ width: "100%" }}
                  className="mb-2"
                  controlId="validationCustom01"
                >
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="UserName"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  style={{ width: "100%" }}
                  className="mb-3"
                  controlId="validationCustom02"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a Password.
                  </Form.Control.Feedback>
                </Form.Group>
                <p style={{ color: "red" }}>{error}</p>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={handleLoginUser}
                >
                  Login
                </Button>
              </form>
            </div>
          </section>
          <section className="register-card bg-primary">
            <h1>Sign Up</h1>
            <p>Sign Up if you aren't registered yet...</p>
            <Button
              variant="primary"
              style={{ border: "1px solid #ffffff" }}
              onClick={() => setRegistered(false)}
            >
              Register Now!
            </Button>
          </section>
        </div>
      ) : (
        <div className="login-cards-sections-card">
          <section className="register-card bg-primary">
            <h1>Sign In</h1>
            <p>Sign In if you are already registered...</p>
            <Button
              variant="primary"
              style={{ border: "1px solid #ffffff" }}
              onClick={() => setRegistered(true)}
            >
              Sign In!
            </Button>
          </section>
          <section className="login-card">
            <div className="login-forms-card">
              <h1>Register</h1>
              <p>Create Your Account</p>
              <form className="form-section-card">
                <Form.Group
                  className="mb-2"
                  style={{ width: "100%" }}
                  controlId="validationCustom01"
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  style={{ width: "100%" }}
                  controlId="validationCustom02"
                >
                  <Form.Label>User Email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="User Email"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  style={{ width: "100%" }}
                  controlId="validationCustom03"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a Password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  style={{ width: "100%" }}
                  controlId="validationCustom04"
                >
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Repeat Password"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a Password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="success">
                  Register
                </Button>
              </form>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Login;
