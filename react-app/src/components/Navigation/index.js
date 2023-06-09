import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SiteLogo from '../SiteLogo';
import { login } from '../../store/session';
import Button from '../Button';
import SearchBar from '../SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const comingSoon = () => {
		return window.alert("Feature coming soon!")
	};

	const demoUser = () => {
		dispatch(login("demo@aa.io", "password"))
			.then(() => history.push('/'));
	};

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
							<Link to={`/user/${sessionUser.id}/`} className="navbar-bot-navbar-item" >My Collection</Link>
						) : (
							<div className="navbar-bot-navbar-item">Welcome to Casual Ink</div>
						)}
					</div>
					{isLoaded && (
						<div id='navbar-icons'>
							{sessionUser ? (
								<>
									<Button
										onClick={comingSoon}>
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
			<div className='navbar-bot'>
				<div className='navbar-bot-container'>
					<NavLink exact to={`/artworks`} className="navbar-bot-navbar-item" activeClassName='navbar-bot-navlink-active'>
						Artworks
					</NavLink>
					<NavLink exact to={`/collections`} className="navbar-bot-navbar-item" activeClassName='navbar-bot-navlink-active'>
						Collect
					</NavLink>

				</div>
				<div style={{
					"boxSizing": "border-box",
					"height": "90%",
					"width": "180px",

				}}>
					<div id='links'>
						<div id='link-icons'>
							<a href="https://www.linkedin.com/in/tony-zheng-577840156/" target="_blank">
								<i class="fa-brands fa-linkedin"></i>
							</a>
							<a href="https://github.com/usr1l" target="_blank">
								<i class="fa-brands fa-github"></i>
							</a>
							<a href="https://usr1l.github.io/#" target="_blank">
								<i class="fa-solid fa-globe"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
