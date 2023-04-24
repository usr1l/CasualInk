import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { thunkGetArtworks } from "./store/artworks";
import { thunkGetArtlistings } from "./store/artlistings";
import { thunkSetShoppingCart } from "./store/shoppingcarts";
import LandingPage from "./components/LandingPage";
import UploadArtworkForm from "./components/UploadArtworkForm";
import ArtworksPage from "./components/ArtworksPage";
import ArtListingsPage from "./components/ArtListingsPage";
import ShoppingCart from "./components/ShoppingCart";
import SignupFormPage from "./components/SignupFormPage";
import ProfilePage from "./components/ProfilePage";
import NotAuthorizedPage from "./components/NotAuthorizedPage";
import SingleArtworkPage from "./components/SingleArtworkPage";

function App() {
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState(false);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(thunkGetArtworks())
      .then(() => dispatch(thunkGetArtlistings()))
      .then(() => dispatch(authenticate()))
      .then(() => setIsLoaded(true));
  }, [ dispatch ]);

  useEffect(() => {
    if (user) dispatch(thunkSetShoppingCart());
  }, [ dispatch, user ])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          {user && (
            <Route exact path="/artworks" component={ArtworksPage} />
          )}
          {user && (
            <Route exact path="/collections" component={ArtListingsPage} />
          )}
          {user && (
            <Route exact path="/shopping-cart" component={ShoppingCart} />
          )}
          {user && (
            <Route exact path="/artworks/new" component={UploadArtworkForm} />
          )}
          {user && (
            <Route exact path="/user/:userId/profile" component={ProfilePage} />
          )}
          {user && (
            <Route exact path="/not-authorized" component={NotAuthorizedPage} />
          )}
          {user && (
            <Route exact path="/user/:userId/profile/" component={ProfilePage} />
          )}
          {user && (
            <Route exact path="/artworks/:artworkId" component={SingleArtworkPage} />
          )}
          <Route exact path="/signup" component={SignupFormPage} />
          <Route component={LandingPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
