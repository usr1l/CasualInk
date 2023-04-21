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
          <Route exact path="/artworks/new" component={UploadArtworkForm} />
        </Switch>
      )}
    </>
  );
}

export default App;
