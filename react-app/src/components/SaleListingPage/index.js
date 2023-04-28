import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PageSplit from '../PageSplit';
import { thunkGetSingleArtlistingId } from '../../store/artlistings';
import "./SaleListingPage.css";
import ProfileDescriptionCard from '../ProfileDescriptionCard';


const SaleListingPage = () => {
  const { artworkId, artlistingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const artwork = useSelector(state => state.artworks.allArtworks[ artworkId ]);
  const artlisting = useSelector(state => state.artlistings.allArtlistings[ artlistingId ]);

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    if (!artwork || !artlisting) history.push("/not-found");
  }, [ artwork, artlisting, history ]);

  useEffect(() => {
    if (artlisting) {
      dispatch(thunkGetSingleArtlistingId(parseInt(artlisting.id)))
        .then(() => setIsLoaded(true));
    }
  }, [ dispatch, artlisting ]);


  return (
    <>
      {isLoaded && !!artlisting && (
        <>
          <PageSplit
            pageSplitClass={"center"}
          >
            <>
              <h1>Details</h1>
              <div className='specs-box'>
                <div className='specs-box-element'>
                  <div className='specs-box-element-label'>Title</div>
                  <div className='specs-box-element-text'>{artwork.title}</div>
                </div>
                <div className='specs-box-element'>
                  <div className='specs-box-element-label'>Materials</div>
                  <div className='specs-box-element-text'>{artwork.materials}</div>
                </div>
                <div className='specs-box-element'>
                  <div className='specs-box-element-label'>Size</div>
                  <div className='specs-box-element-text'>{`${artwork.height} x ${artwork.width} in | ${parseFloat(artwork.height * 2.54).toFixed(2)} x ${parseFloat(artwork.width * 2.54).toFixed(2)} cm`}</div>
                </div>
                <div className='specs-box-element'>
                  <div className='specs-box-element-label'>Price</div>
                  <div className='specs-box-element-text'>{`$ ${artlisting.price}`}</div>
                </div>
              </div>
              <div className='specs-box'>
                <ProfileDescriptionCard
                  imgSrc={artwork.owner.profilePic ? artwork.owner.profilePic : ""}
                  heading={`${artwork.owner.firstname}`}
                  subHeading={`Member since ${artwork.owner.joinDate.split(" ")[ 3 ]}`}
                />
              </div>
            </>
          </PageSplit>
          <PageSplit
            pageSplitClass={"center"}
          >
            This
          </PageSplit>
        </>
      )}
    </>
  )
};

export default SaleListingPage;
