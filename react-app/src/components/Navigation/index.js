import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import SiteLogo from '../SiteLogo';
import { login } from '../../store/session';
import './Navigation.css';
import Button from '../Button';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const [ showMenu, setShowMenu ] = useState(false);
	const demoUser = () => {
		dispatch(login("demo@aa.io", "password"))
			.then(() => history.push('/'));
	};

	const closeMenu = () => setShowMenu(false);

	return (
		<nav id='navbar'>
			<div id='navbar-top'>
				<div id='home-search-nav'>
					<SiteLogo />
					<SearchBar />
				</div>
				<div id='navbar-icons-container'>
					<div id='navbar-shortcuts'>
						{sessionUser ? (
							<Link to={`/user/${sessionUser.id}/profile`} className="navbar-bot-navbar-item" >My Collection</Link>
						) : (
							<div className="navbar-bot-navbar-item">Welcome to Casual Ink</div>
						)}
					</div>
					{isLoaded && (
						<div id='navbar-icons'>
							{sessionUser ? (
								<>
									<Button >
										<i className="fa-regular fa-paper-plane signed-in-icons"></i>
									</Button>
									<Button
										onClick={() => history.push("/shopping-cart")}>
										<i className="fa-solid fa-cart-shopping signed-in-icons"></i>
									</Button>
									<ProfileButton className="signed-in-icons" user={sessionUser} />
								</>
							) : (
								<>
									<Button
										buttonStyle={'btn--demo'}
										buttonSize={'btn--small'}
										onClick={demoUser}
									>Demo User
									</Button>
									<OpenModalButton
										buttonText={'Log In'}
										onButtonClick={closeMenu}
										modalComponent={<LoginFormModal />}
										modalCSSClass={'btn btn--login btn--small'}
									/>
									<Button
										buttonStyle={'btn--demo'}
										buttonSize={'btn--small'}
										onClick={() => history.push('/signup')}
									>Sign Up
									</Button>
								</>
							)}
						</div>
					)}
				</div >
			</div>
			<div id='navbar-bot'>
				<div id='navbar-bot-container'>
					<div id='navbar-bot-navbar'>
						<NavLink exact to={`/artworks`} className="navbar-bot-navbar-item" activeClassName='navbar-bot-navlink-active'>
							Artworks
						</NavLink>
						<NavLink exact to={`/collections`} className="navbar-bot-navbar-item" activeClassName='navbar-bot-navlink-active'>
							Collect
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
