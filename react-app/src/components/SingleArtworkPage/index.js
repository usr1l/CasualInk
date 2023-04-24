import React, { useEffect, useState } from 'react';
import PageContainer from '../PageContainer';
import "./SingleArtworkPage.css";
import BottomNav from '../BottomNav';
import { Link, useHistory, useParams } from 'react-router-dom';
import Button from '../Button';
import PageSplit from '../PageSplit';
import ImagePreview from '../ImagePreview';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSingleArtworkId } from '../../store/artworks';

const SingleArtworkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { artworkId } = useParams();

  const currUser = useSelector(state => state.session.user);
  const artwork = useSelector(state => state.artworks.allArtworks[ artworkId ])

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if (!artwork) history.push("/not-found")
  }, [ artwork ])

  useEffect(() => {
    dispatch(thunkGetSingleArtworkId(artworkId))
      .then(() => setIsLoaded(true));
  }, [ dispatch ])

  return (
    <>
      {isLoaded && (
        <>
          <PageContainer>
            <div className="split-pages-page">
              <div className="split-pages-container">
                <PageSplit
                  pageSplitClass={"center"}
                >
                  <ImagePreview
                    imgSrc={artwork.image}
                  />
                </PageSplit>
                <PageSplit
                  pageSplitClass={"center"}
                >
                  <div>
                    <h1>{`${artwork.title}`}</h1>
                    <h2>{`${artwork.artist_name}, ${artwork.year}`}</h2>
                    <div>{`${artwork.materials}`}</div>
                    <div>{`${artwork.height} x ${artwork.width} in | ${artwork.height * 2.54} x ${artwork.width * 2.54} cm`}</div>
                  </div>
                </PageSplit>
              </div>
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
          {currUser.id === artwork.owner_id && (
            <div className="edit-buttons-container">
              <Button
                buttonStyle='btn--demo'
                // onClick={() => history.push(`/artworks/${artworkId}/edit`)}
                buttonSize='btn--splash'
              >Delete Artwork
              </Button>
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
