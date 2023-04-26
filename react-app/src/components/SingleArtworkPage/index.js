import React, { useEffect, useState } from 'react';
import PageContainer from '../PageContainer';
import "./SingleArtworkPage.css";
import BottomNav from '../BottomNav';
import { Link, NavLink, Route, Switch, useHistory, useParams } from 'react-router-dom';
import Button from '../Button';
import PageSplit from '../PageSplit';
import ImagePreview from '../ImagePreview';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteArtwork, thunkGetSingleArtworkId } from '../../store/artworks';
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import SingleFullPageDiv from '../SingleFullPageDiv';
import NavBar from '../NavBar';
import SaleListingPage from '../SaleListingPage';

const SingleArtworkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { artworkId } = useParams();

  const currUser = useSelector(state => state.session.user);
  const allArtworks = useSelector(state => state.artworks.allArtworks);
  const artwork = allArtworks[ artworkId ];

  const [ userStatus, setUserStatus ] = useState("user");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if (!artwork && isLoaded === false) history.push("/not-found");
  }, [ artwork, isLoaded ]);

  useEffect(() => {
    if (artwork) {
      dispatch(thunkGetSingleArtworkId(parseInt(artworkId)))
        .then(() => setIsLoaded(true));
    }
  }, [ dispatch, artwork ]);


  const ownerState = (userStatus) => {
    let response;
    switch (userStatus) {
      default:
        response = "owner"
        break;
    };
    return response;
  };

  return (
    <>
      {isLoaded && !!artwork && (
        <>
          <SingleFullPageDiv containerClass="single-page-small">
            <PageSplit
              pageSplitClass={"start"}
            >
              <ImagePreview
                imgWrapperStyle={"img-preview-wrapper-big"}
                imgSrc={artwork.image}
                imgClassName={"img--preview-big"}
              />
            </PageSplit>
            <PageSplit
              pageSplitClass={"start"}
            >
              <div className='single-art-description-card'>
                <h1>{`${artwork.title}`}</h1>
                <h2>{`${artwork.artistName}, ${artwork.year}`}</h2>
                <div>{`${artwork.materials}`}</div>
                <div>{`${artwork.height} x ${artwork.width} in | ${parseFloat(artwork.height * 2.54).toFixed(2)} x ${parseFloat(artwork.width * 2.54).toFixed(2)} cm`}</div>
              </div>
              <OpenModalButton
                buttonText={'Default'}
                modalCSSClass={'btn btn--demo btn--splash'}
              />
            </PageSplit>
          </SingleFullPageDiv>
          <NavBar>
            <NavLink to={`/artworks/${artworkId}/artlistings/${artwork.saleListing}`} >
            </NavLink>
          </NavBar>
          <Switch>
            <Route path="/artworks/:artworkId/artlistings/:artlistingId" component={SaleListingPage} />
          </Switch>
        </>
      )}
      <BottomNav>
        <Link to={'/'} className="page-return">
          <h3>
            <i className="fa-solid fa-angle-left" /> Back to Home
          </h3>
        </Link>
        <div className="page-return">
          {!!artwork && currUser.id === artwork.ownerId && (
            <div className="edit-buttons-container">
              <OpenModalButton
                buttonText={'Delete Artwork'}
                modalCSSClass={'btn btn--demo btn--splash'}
                modalComponent={<ConfirmDeleteModal deleteFn={thunkDeleteArtwork} itemId={artworkId} directTo={`/user/${currUser.id}/profile`} />}
              />
              <Button
                buttonStyle='btn--login'
                onClick={() => history.push(`/artworks/${artworkId}/edit`)}
                buttonSize='btn--splash'
              >Edit Artwork
              </Button>
            </div>
          )}
        </div>
      </BottomNav >
    </>
  )
};

export default SingleArtworkPage;
