import React, { useEffect, useState } from 'react';
import "./ArtworksPage.css";
import PageContainer from '../PageContainer';
import ImagePreview from '../ImagePreview';
import { useSelector } from 'react-redux';
import DisplayArtSection from '../DisplayArtSection';
import { Link } from 'react-router-dom';

const ArtworksPage = () => {
  const allArtworksObj = useSelector(state => state.artworks.allArtworks);
  const currUser = useSelector(state => state.session.user);
  const allArtworks = Object.values(allArtworksObj);

  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ recentUploads, setRecentUploads ] = useState([]);


  useEffect(() => {
    const recentList = [];

    let i = allArtworks.length - 1;
    while (recentList.length < 5) {
      if (allArtworks[ i ]) recentList.push(allArtworks[ i ]);
      if (i > 0) i -= 1;
      else return;
    };

    setRecentUploads(recentList);
    setIsLoaded(true);

  }, [ allArtworksObj ]);

  return (
    <>
      {isLoaded && (
        <PageContainer>
          <div className='page-content-container'>
            <h1 className='horizontal-scroll-header'>Recent Uploads</h1>
            <div className='artwork-showcase-container'>
              {currUser ? (
                <>
                  {recentUploads.map(artwork => (
                    <Link to={`/artworks/${artwork.id}`} key={`${artwork.title}-${artwork.id}`} className='artwork-showcase-container-item'>
                      <div className='showcase-image-container'>
                        <ImagePreview
                          imgSrc={artwork.image}
                        />
                      </div>
                      <br />
                      {artwork.title}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {recentUploads.map(artwork => (
                    <div key={`${artwork.title}-${artwork.id}`} className='artwork-showcase-container-item'>
                      <div className='showcase-image-container'>
                        <ImagePreview
                          imgSrc={artwork.image}
                        />
                      </div>
                      <br />
                      {artwork.title}
                    </div>
                  ))}
                </>
              )}
            </div>
            <h1 className='horizontal-scroll-header'>All Artworks</h1>
            <DisplayArtSection items={allArtworks} />
          </div>
        </PageContainer>
      )}
    </>
  )
};

export default ArtworksPage
