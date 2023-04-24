import React, { useEffect, useState } from 'react';
import PageContainer from '../PageContainer';
import "./SingleArtworkPage.css";
import BottomNav from '../BottomNav';
import { Link, useHistory, useParams } from 'react-router-dom';
import Button from '../Button';
import PageSplit from '../PageSplit';
import ImagePreview from '../ImagePreview';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetSingleArtworkId } from '../../store/artworks';

const SingleArtworkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { artworkId } = useParams();

  const currUser = useSelector(state => state.session.user);
  const artwork = useSelector(state => state.artworks.allArtworks[ artworkId ])



  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if (!artwork) history.push("/")
  }, [ artwork ])

  useEffect(() => {
    dispatch(actionGetSingleArtworkId(artworkId))
  }, [ dispatch ])

  return (
    <>
      {isLoaded && (
        <>
          <PageContainer>
            <div className="split-pages-page">
              <h1 className="split-pages-header">UPLOAD NEW ARTWORK</h1>
              <div className="split-pages-container"></div>
              <PageSplit>
                <ImagePreview />
                <div></div>
              </PageSplit>
            </div>
          </PageContainer>
        </>
      )}
      <BottomNav>
        <Link to={'/'} className="page-return">
          <h3>
            <i className="fa-solid fa-angle-left" /> Back to Home
          </h3>
        </Link>
        <div className="page-return">
          {currUser && (
            <Button
              buttonStyle='btn--login'
              // onClick={onSubmit}
              buttonSize='btn--wide'
            >Edit This Artwork
            </Button>
          )}
        </div>
      </BottomNav>
    </>
  )
};

export default SingleArtworkPage;
