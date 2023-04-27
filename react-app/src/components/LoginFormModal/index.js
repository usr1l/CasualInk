import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import Button from "../Button"
import InputDiv from "../InputDiv";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState([]);
  const [ disabled, setDisabled ] = useState(true);
  const { closeModal, modalContent, modalRef } = useModal();

  useEffect(() => {
    if (!email || !password) setDisabled(true)
    else setDisabled(false)
  }, [ email, password ])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  useEffect(() => {
    if (!modalContent) return;

    const modalClose = (e) => {
      if (!modalRef.current.contains(e.target)) {
        closeModal()
      };
    };
    document.addEventListener("click", modalClose);

    return () => document.removeEventListener("click", modalClose);
  }, [ modalContent ]);

  return (
    <div id='log-in'>
      <div className="form-container">
        <h1 id="log-in__h2">CASUAL INK</h1>
        <h2 id='log-in__title'>Log in to collect art by the world's leading artists</h2>
        <form id='log-in__form'>
          <ul className='log-in__error-list'>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <InputDiv
            label={'EMAIL'}
            divStyle={'input--wide'}
            labelStyle={'__label'}
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
            label={'PASSWORD'}
            divStyle={'input--wide'}
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
        </form>
        <Button
          buttonStyle={"btn--login"}
          buttonSize={"btn--wide"}
          onClick={handleSubmit}
          disableButton={disabled}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}

export default LoginFormModal;
