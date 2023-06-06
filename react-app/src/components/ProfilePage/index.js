import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams, NavLink, Switch, Route, Link } from 'react-router-dom';
import ProfileDescriptionCard from '../ProfileDescriptionCard';
import DisplayArtSection from '../DisplayArtSection';
import BottomNav from '../BottomNav';
import Button from '../Button';
import PageContainer from '../PageContainer';
import "./ProfilePage.css";
import NavBar from '../NavBar';

const ProfilePage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const artworks = useSelector(state => state.artworks.allArtworks);
  const currUser = useSelector(state => state.users.allUsers[ userId ]);
  const userArtworks = currUser.artworks;
  const currId = currUser.id;

  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ allArtworks, setAllArtworks ] = useState([]);

  useEffect(() => {
    if (currUser) {
      setIsLoaded(true);
      const art = [];
      for (const key of userArtworks) {
        art.push(artworks[ key ]);
      };
      setAllArtworks(art);
    };
  }, [ currUser, artworks, userArtworks ]);


  return (
    <>
      <div id="profile-page-container">
        {isLoaded && (
          <>
            <div id='profile-page-banner'>
              <ProfileDescriptionCard
                imgSrc={currUser.profilePic ? currUser.profilePic : ""}
                cardStyle='membership-page-member-cards'
                heading={`${currUser.firstname} ${currUser.lastname}`}
                subHeading={`Member since ${currUser.joinDate.split(" ")[ 3 ]}`}
              />
              <div>
              </div>
            </div>
            <NavBar>
              <NavLink to={`/user/${userId}/profile/`} className="navbar-item" activeClassName='navbar-navlink-active'>
                My Collection
              </NavLink>
            </NavBar>
          </>
        )}
        <PageContainer>
          <Switch >
            <Route exact path={`/user/:userId/profile`} >
              <DisplayArtSection items={allArtworks} />
            </Route>
          </Switch>
          <Switch>
            {/* <Route exact path={`/user/:userId`} */}
          </Switch>
        </PageContainer>
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
