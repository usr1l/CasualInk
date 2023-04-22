import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import Button from "../Button";
import "./SignupForm.css";
import InputDiv from "../InputDiv";

function SignupFormPage() {
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ firstname, setFirstName ] = useState("");
  const [ lastname, setLastName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ image, setImage ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ bio, setBio ] = useState("");
  const [ errors, setErrors ] = useState([]);
  const { closeModal } = useModal();

  const disableBool = () => {
    if (!email ||
      !firstname ||
      !username ||
      !lastname ||
      !bio ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword) return true
    if (password !== confirmPassword) return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {

      const formData = new FormData();
      formData.append("email", email);
      formData.append("firstname", firstname);
      formData.append("username", username);
      formData.append("lastname", lastname);
      formData.append("bio", bio);
      formData.append("password", password);
      formData.append("profile_pic", image);

      await dispatch(signUp(formData))
        .then(data => {
          if (data) {
            setErrors(data);
          } else {
            closeModal();
          }
        })
    }
  };

  const disabled = disableBool();

  return (
    <div id='signup'>
      <div className="form-container">
        <h1 id="signup__h2">CASUAL INK</h1>
        <h2 id='signup__title'>Sign up to collect art by the world's leading artists</h2>
        <form id='signup__form' encType="multipart/form-data">
          <ul id='signup__error-list'>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <InputDiv
            labelStyle={'__label'}
            label={'Enter your email: *'}
          >
            <input
              className='.__input'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputDiv>
          <InputDiv
            labelStyle={'__label'}
            label={'What is your first name? *'}
          >
            <input
              className='.__input'
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </InputDiv>
          <InputDiv
            labelStyle={'__label'}
            label={'What is your last name? *'}
          >
            <input
              className='.__input'
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </InputDiv>
          <InputDiv
            labelStyle={'__label'}
            label={"What should others call you? *"}>
            <input
              className='.__input'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputDiv>
          <InputDiv
            labelStyle={'__label'}
            label={"Tell us a little about yourself: *"}
          >
            <input
              className='.__input'
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </InputDiv>
          <InputDiv
            label={'Password: *'}
            labelStyle={'__label'}
          >
            <input
              className='.__input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputDiv>
          <InputDiv
            label={'Confirm Password: *'}
            labelStyle={'__label'}
          >
            <input
              className='.__input'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputDiv>
          <InputDiv >
            <input
              id='proPic'
              type='file'
              onChange={(e) => setImage(e.target.files[ 0 ])}
            />
          </InputDiv>
        </form>
        <Button
          buttonStyle={"btn--login"}
          buttonSize={"btn--wide"}
          onClick={handleSubmit}
          disableButton={disabled}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default SignupFormPage;
