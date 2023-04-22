import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import Button from "../Button";
import "./SignupForm.css";
import InputDiv from "../InputDiv";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [ email, setEmail ] = useState("");
	const [ username, setUsername ] = useState("");
	const [ firstname, setFirstName ] = useState("");
	const [ lastname, setLastName ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirmPassword, setConfirmPassword ] = useState("");
	const [ profilePic, setProfilePic ] = useState("");
	const [ bio, setBio ] = useState("");
	const [ disabled, setDisabled ] = useState(true);
	const [ errors, setErrors ] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div id='signup'>
			<div className="form-container">
				<h1 id="signup__h2">CASUAL INK</h1>
				<h2 id='signup__title'>Sign up to collect art by the world's leading artists</h2>
				<form id='signup__form'>
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
							type='file'
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

export default SignupFormModal;
