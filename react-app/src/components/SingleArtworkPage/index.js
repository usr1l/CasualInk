import React, { useEffect, useState } from 'react';
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
import AuctionListingPage from '../AuctionListingPage';
import ListingModal from '../ListingModal';
import EditListingModal from '../EditListingModal';

const SingleArtworkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { artworkId } = useParams();

  const currUser = useSelector(state => state.session.user);
  const allArtworks = useSelector(state => state.artworks.allArtworks);
  const artwork = allArtworks[ artworkId ];

  // for button conditional rendering
  const [ artlistingBool, setArtlistingBool ] = useState(false);
  const [ auctionlistingBool, setAuctionlistingBool ] = useState(false);
  const [ ownerStatus, setOwnerStatus ] = useState(false);

  // const [ userStatus, setUserStatus ] = useState("user");
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if (!artwork) history.push("/not-found");
  }, [ artwork ]);

  useEffect(() => {
    if (artwork) {
      dispatch(thunkGetSingleArtworkId(parseInt(artworkId)))
        .then(() => currUser.id === artwork.ownerId ? setOwnerStatus(true) : setOwnerStatus(false))
        .then(() => artwork.artListing ? setArtlistingBool(true) : setArtlistingBool(false))
        .then(() => artwork.auctionListing ? setAuctionlistingBool(true) : setAuctionlistingBool(false))
        .then(() => setIsLoaded(true));
    }
  }, [ dispatch, artwork ]);

  // check for sale id
  useEffect(() => {
    if (artwork.artListing) setArtlistingBool(true);
    else setArtlistingBool(false);
  }, [ artwork, artwork.artListing ])

  // check for auction id
  useEffect(() => {
    if (artwork.auctionListing) setAuctionlistingBool(true);
    else setAuctionlistingBool(false);
  }, [ artwork, artwork.auctionListing ])

  const ownerState = (userStatus) => {
    let response;
    switch (userStatus) {
      default:
        response = "owner"
        break;
    };
    return response;
  };

  // scroll to area on buttonclick
  const scrollToEffect = (id) => {
    const ele = document.getElementById(id);
    if (ele) ele.scrollIntoView({ behavior: "smooth", block: "start" })
  };

  return (
    <>
      {isLoaded && !!artwork && (
        <>
          <SingleFullPageDiv containerClass="single-page-small">
            <PageSplit
              pageSplitClass={"end"}
            >
              <ImagePreview
                imgWrapperStyle={"img-preview-wrapper-big"}
                imgSrc={artwork.image}
              />
            </PageSplit>
            <PageSplit
              pageSplitClass={"start"}
            >
              <div className='single-art-description-card'>
                <h1>{`${artwork.title}`}</h1>
                <h2>{`${artwork.artistName}, ${artwork.year}`}</h2>
                <h2>Owner: {artwork.owner.username}</h2>
                <h3>Description</h3>
                <div className='description-card-text'>{artwork.description}</div>
              </div>
              {!ownerStatus && !artwork.available && (
                <Button
                  disableButton={true}
                >Art Not Listed For Sale/Auction
                </Button>
              )}
              {!ownerStatus && artwork.available && (!artlistingBool && !auctionlistingBool) && (
                <Button
                  disableButton={true}
                >Available for Sale, Inquire Owner for Prices
                </Button>
              )}
              {ownerStatus && !artwork.available && (
                <Button
                  disableButton={true}
                >Update Availability to Create a New Listing</Button>
              )}
              {artwork.available && artlistingBool && (
                <button
                  className='btn btn--demo btn--splash'
                  onClick={() => {
                    history.push(`/artworks/${artworkId}/artlistings/${artwork.artListing}`)
                    scrollToEffect("target");
                  }}
                >
                  Go To Sale Listing
                </button>
              )}
              {ownerStatus && artwork.available && auctionlistingBool && (
                <button
                  className='btn btn--demo btn--splash'
                // onClick={() => history.push(`/artworks/${artworkId}/artlistings/${artwork.artListing}`)}
                >
                  Go To Auction Listing
                </button>
              )}

              {ownerStatus && artwork.available && artlistingBool && (
                <OpenModalButton
                  buttonText={'Update Listing'}
                  modalCSSClass={'btn btn--demo btn--splash'}
                  modalComponent={<EditListingModal props={artworkId} artListingId={artwork.artListing} type={"sale"} />}
                />
              )}
              {/* {ownerStatus && artwork.available && auctionlistingBool && (
                <OpenModalButton
                  buttonText={'Update Listing'}
                  modalCSSClass={'btn btn--demo btn--splash'}
                  modalComponent={<EditListingModal artworkId={artworkId} type={"auction"} />}
                />
              )} */}
              {ownerStatus && artwork.available && !artwork.artListing && !artwork.auctionListing && (
                <OpenModalButton
                  buttonText={'Create A Listing'}
                  modalCSSClass={'btn btn--demo btn--splash'}
                  modalComponent={<ListingModal artworkId={artworkId} />}
                />
              )}
            </PageSplit>
          </SingleFullPageDiv>
          <NavBar>
            {artwork.artListing && (
              <NavLink to={`/artworks/${artworkId}/artlistings/${artwork.artListing}`} className="navbar-item" activeClassName='navbar-navlink-active'>
                Sale Listing
              </NavLink>
            )}
            {/* {artwork.auctionListing && (
              <NavLink to={`/artworks/${artworkId}/auctionlistings/${artwork.auctionListing}`} className="navbar-item" activeClassName='navbar-navlink-active'>
                Auction Listing
              </NavLink>
            )} */}
          </NavBar>
          <SingleFullPageDiv id="target" containerClass="single-page-section">
            <Switch>
              <Route path="/artworks/:artworkId/artlistings/:artlistingId" component={SaleListingPage} />
              {/* <Route path="/artworks/:artworkId/auctionlistings/:auctionlistingId" component={AuctionListingPage} /> */}
            </Switch>
          </SingleFullPageDiv>
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
