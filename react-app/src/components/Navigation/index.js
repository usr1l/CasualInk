import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import SiteLogo from '../SiteLogo';
import { login } from '../../store/session';
import './Navigation.css';
import Button from '../Button';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	const dispatch = useDispatch();

	const history = useHistory()
	const [ showMenu, setShowMenu ] = useState(false);
	const demoUser = () => {
		dispatch(login("demo@aa.io", "password"))
			.then(() => window.location.reload())
	}

	const closeMenu = () => setShowMenu(false)

	return (
		<nav id='navbar'>
			<div id='navbar-top'>
				{/* <SiteLogo /> */}
				<NavLink exact to="/">Home</NavLink>
				<div></div>
				<div id='navbar-container'>
					{/* <SearchBar /> */}
					<div></div>
					<div>
					</div>
					{isLoaded && (
						<div>
							{sessionUser && (
								<ProfileButton user={sessionUser} />
							)}
							{/* {!sessionUser && (
								<> */}
							<Button
								buttonSize={'btn--medium'}
								buttonStyle={'btn--demo'}
								onClick={demoUser}
							>Demo User</Button>
							<OpenModalButton
								buttonText={'Log In'}
								onButtonClick={closeMenu}
								modalComponent={<LoginFormModal />}
								modalCSSClass={'btn btn--demo btn-medium'}
							/>
							<OpenModalButton
								buttonText={'Sign Up'}
								onButtonClick={closeMenu}
								modalComponent={<SignupFormModal />}
								modalCSSClass={'btn btn--demo btn-medium'}
							/>
							{/* </>
							)} */}
						</div>
					)}
				</div >
			</div>
			<div id='navbar-bot'>
			</div>
		</nav>
	);
}

export default Navigation;
