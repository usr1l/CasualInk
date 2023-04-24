import React, { useEffect, useState } from 'react';
import ProfileDescriptionCard from '../ProfileDescriptionCard';
import "./ProfilePage.css";
import { useSelector } from 'react-redux';
import { useHistory, useParams, NavLink, Switch, Route, Link } from 'react-router-dom';
import DisplayArtSection from '../DisplayArtSection';
import BottomNav from '../BottomNav';
import Button from '../Button';

const ProfilePage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const currUser = useSelector(state => state.session.user);
  const allArtworks = Object.values(currUser.artworks);
  const currId = currUser.id;

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if (currId != userId) history.push("/not-authorized");
    if (currUser) setIsLoaded(true);
  }, [ currUser ]);

  // edit later on, change so can access all user pages
  // let currUser;
  // if (currId === userId) currUser = useSelector(state => state.session.user)
  // else currUser =

  return (
    <>
      <div id="profile-page-container">
        {isLoaded && (
          <>
            <div id='profile-page-banner'>
              <ProfileDescriptionCard
                imgSrc={currUser.profilePic ? currUser : ""}
                cardStyle='membership-page-member-cards'
                heading={`${currUser.firstname} ${currUser.lastname}`}
                subHeading={`Member since ${currUser.joinDate.split(" ")[ 3 ]}`}
              />
              <div>
              </div>
            </div>
            <div className="navbar-wrapper">
              <div className="navbar-container">
                <NavLink to={`/user/${userId}/profile/collection`} className="navbar-item" activeClassName='navbar-navlink-active'>
                  My Collection
                </NavLink>
              </div>
            </div>
          </>
        )}
        <Switch >
          <Route exact path={`/user/:userId/profile/collection`} >
            <DisplayArtSection items={allArtworks} />
          </Route>
        </Switch>
      </div>
      <BottomNav>
        <Link to={'/'} className="page-return">
          <h3>
            <i className="fa-solid fa-angle-left" /> Back to Home
          </h3>
        </Link>
        <div className="page-return">
          <Button
            buttonStyle='btn--login'
            onClick={() => history.push("/artworks/new")}
            buttonSize='btn--wide'
          >Upload Artwork
          </Button>
        </div>
      </BottomNav>
    </>
  )
};

export default ProfilePage;
