import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import Button from "../Button";
import "./SignupFormPage.css";
import InputDiv from "../InputDiv";
import PageSplit from "../PageSplit";
import { Link, useHistory } from "react-router-dom";
import BottomNav from "../BottomNav";

function SignupFormPage() {
  const history = useHistory();
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

  const validate = () => {
    const validationErrors = [];
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validate();
    // if (validationErrors.length > 0) return setErrors(validationErrors);
    // if (data.statusCode >= 400) {
    //   return setErrors([ data.message ]);
    // };
    // return;
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
            history.push("/");
          }
        })
    }
    return;
  };

  const disabled = disableBool();

  return (
    <>
      <div className="split-pages-page">
        <h1 className="split-pages-header">Sign up to collect art by the world's leading artists</h1>
        <form className="split-pages-container" encType="multipart/form-data">
          {/* <ul id='signup__error-list'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
          </ul> */}
          <PageSplit>
            <InputDiv
              labelStyle={'__label'}
              label={'Enter your email: *'}
            >
              <input
                className='__input'
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
                className='__input'
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
                className='__input'
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
                className='__input'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </InputDiv>
          </PageSplit>
          <PageSplit>
            <InputDiv
              labelStyle={'__label'}
              label={"Tell us a little about yourself: *"}
            >
              <input
                className='__input'
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
                className='__input'
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
                className='__input'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </InputDiv>
            <InputDiv >
              <input
                id='proPic'
                className='__input'
                type='file'
                onChange={(e) => setImage(e.target.files[ 0 ])}
              />
            </InputDiv>
          </PageSplit>
        </form>
      </div>
      <BottomNav>
        <Link to={'/'} className="page-return">
          <h3>
            <i className="fa-solid fa-angle-left" /> Back to Home
          </h3>
        </Link>
        <div className="page-return">
          <Button
            buttonStyle={"btn--login"}
            buttonSize={"btn--wide"}
            onClick={handleSubmit}
            disableButton={disabled}
          >
            Sign Up
          </Button>
        </div>
      </BottomNav>
    </>
  );
}

export default SignupFormPage;
