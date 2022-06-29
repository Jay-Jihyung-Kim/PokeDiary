import React, { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import oak from "../image/oak.jpg";
import axios from "axios";

const Container = styled.div`
  font-family: "PokemonFont";
  font-weight: 700;
  display: ${(props) => (props.status === true ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;
const LoginBox = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%:
  height: 100%;
  background-color: #fff;
  padding: 80px;
`;
const Img = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;
const Text = styled.p`
  background-color: #fff;
  margin-bottom: 40px;
`;

const Signin = (props) => {
  const [loginError, setLoginError] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3001/auth", {
          username: values.username.toLowerCase(),
          password: values.password,
        });
        props.handleLoginStatus(true);
        const user = {
          token: response.data.token,
          username: values.username.toLowerCase(),
          userId: response.data.user_id,
        };
        props.userData(user);
      } catch (err) {
        if (err.response?.status === 400) {
          setLoginError("Invalid Username or Password");
        }
      }
    },
  });

  return (
    <Container status={props.loginStatus}>
      <LoginBox onSubmit={formik.handleSubmit}>
        <Img src={oak} />
        <Text>...Erm, what was your name again?</Text>
        <div
          style={{
            maxWidth: "300px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            margin: "0 auto",
            gap: "10px",
          }}
        >
          <input
            value={formik.values.username}
            name="username"
            id="username"
            type="text"
            placeholder="Username"
            onChange={formik.handleChange}
            error={formik.errors.username}
          />
          <input
            value={formik.values.password}
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          {loginError ? <p style={{ color: "red" }}>{loginError}</p> : null}
          <button
            type="submit"
            style={{ marginTop: "20px", backgroundColor: "white" }}
          >
            SIGN IN
          </button>
        </div>
      </LoginBox>
    </Container>
  );
};

export default Signin;
