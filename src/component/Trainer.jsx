import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { mobile } from "../responsive";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import TrainerImage from "../image/TrainerImage.jpg";
import TrainerImageSmall from "../image/TrainerImageSmall.jpg";
import { AiOutlineClose } from "react-icons/ai";

const Container = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 720px) {
  }
`;

const Popup = styled.div`
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 722px;
  position: absolute;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(-50%, -50%);
  @media screen and (max-width: 720px) {
  }
`;

const Xmark = styled.div`
  position: absolute;
  right: 0;
  padding: 10px 15px;
  cursor: pointer;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  padding: 50px;
  background-color: #f8f8f8;
  border: 4px solid black;
  @media screen and (max-width: 580px) {
    display: none;
  }
`;

const SmallImage = styled.img`
  height: 100%;
  width: 100%;
  padding: 50px;
  background-color: #f8f8f8;
  border: 4px solid black;
  @media screen and (min-width: 580px) {
    display: none;
  }
`;

const FilloutContainer = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  left: 0;
  gap: 10px;
  max-width: 293px;
  width: 100%;
  padding-left: 100px;
  margin: 0 auto;
`;
const Label = styled.label``;
const Input = styled.input`
  font-family: "PokemonFont";
  font-weight: 700;
  background-color: transparent;
  border: none;
  width: 100%;
  margin: 0 auto;
  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
  @media screen and (max-width: 420px) {
    width: 180px;
  }
`;
const TextContainer = styled.div`
  position: absolute;
  bottom: 100px;
  left: 100px;
  font-family: "PokemonFont";
  font-weight: 700;
  @media screen and (max-width: 520px) {
    font-size: 12px;
  }
  @media screen and (max-width: 480px) {
    font-size: 12px;
    bottom: 100px;
    width: 230px;
    left: 90px;
  }
`;
const Text = styled.p`
  line-height: 40px;
  width: 80%;
  @media screen and (max-width: 480px) {
    font-size: 0.5rem;
    width: 230px;
  }
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  width: 300px;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  width: 300px;
  display: flex;
  margin-top: 10px;
  margin-left: -4px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: black;
  font-family: "PokemonFont";
  font-weight: 700;
  border-radius: 10px;
  @media screen and (max-width: 420px) {
    font-size: 12px;
  }
`;

const Error = styled.span`
  font-size: 0.55rem;
  color: red;
  font-weight: 200;
  margin: -5px 0;
`;

const Trainer = (props) => {
  const navigate = useNavigate();
  const [duplicateError, setDuplicateError] = useState("");

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3).max(15).required("Username is Required"),
      password: Yup.string()
        .min(7)
        .max(15)
        .required("Password is Required")
        .matches(/[A-Z]+/, "One Uppercase required")
        .matches(/[@$!%*#?&]+/, "One special character required")
        .matches(/\d+/, "One number required"),
      firstName: Yup.string().required("First name is Required"),
      lastName: Yup.string().required("Last name is Required"),
    }),
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("http://localhost:3001/users", {
          firstName:
            values.firstName.charAt(0).toUpperCase() +
            values.firstName.slice(1).toLowerCase(),
          lastName:
            values.lastName.charAt(0).toUpperCase() +
            values.lastName.slice(1).toLowerCase(),
          username: values.username.toLowerCase(),
          password: values.password,
          pokemon: props.number,
        });
        resetForm();
        navigate("/main");
        setDuplicateError("");
      } catch (err) {
        if (err.response?.status === 409) {
          console.log("Username already taken!!");
          setDuplicateError("Duplicate username!!");
        }
      }
      console.log(values.firstName);
      console.log("submitted");
    },
  });

  return (
    <Container display={props.close} onSubmit={formik.handleSubmit}>
      <Popup>
        <Xmark>
          <AiOutlineClose onClick={props.onClick} />
        </Xmark>
        <Image src={TrainerImage} />
        <SmallImage src={TrainerImageSmall} />

        <FilloutContainer>
          <Label htmlFor="firstName"></Label>
          <Input
            value={formik.values.firstName}
            name="firstName"
            id="firstName"
            type="text"
            placeholder="First Name"
            onChange={formik.handleChange}
            error={formik.errors.firstName}
          />
          <Error>
            {formik.errors.firstName ? <p>{formik.errors.firstName}</p> : null}
          </Error>

          <Label htmlFor="lastName"></Label>
          <Input
            value={formik.values.lastName}
            name="lastName"
            id="lastName"
            type="text"
            placeholder="Last Name"
            onChange={formik.handleChange}
            error={formik.errors.lastName}
          />
          <Error>
            {formik.errors.lastName ? <p>{formik.errors.lastName}</p> : null}
          </Error>

          <Label htmlFor="username"></Label>
          <Input
            value={formik.values.username}
            name="username"
            id="username"
            type="text"
            placeholder="Username"
            onChange={formik.handleChange}
            error={formik.errors.username}
          />
          <Error>
            {formik.errors.username ? <p>{formik.errors.username}</p> : null}
          </Error>

          <Label htmlFor="password"></Label>
          <Input
            value={formik.values.password}
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Error>
            {formik.errors.password ? <p>{formik.errors.password}</p> : null}
          </Error>
          <ButtonContainer>
            <Button type="submit">Let's Begin!</Button>
          </ButtonContainer>
          <ErrorText>{duplicateError}</ErrorText>
        </FilloutContainer>
        <TextContainer>
          <Text>Before we begin, tell me about yourself!</Text>
        </TextContainer>
      </Popup>
    </Container>
  );
};

export default Trainer;
