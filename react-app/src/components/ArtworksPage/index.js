import React, { useEffect, useState } from 'react';
import "./ArtworksPage.css";
import PageContainer from '../PageContainer';
import ImagePreview from '../ImagePreview';
import { useSelector } from 'react-redux';
import DisplayArtSection from '../DisplayArtSection';
import { Link } from 'react-router-dom';

const ArtworksPage = () => {
  const allArtworksObj = useSelector(state => state.artworks.allArtworks);
  const allArtworks = Object.values(allArtworksObj);
  const currUser = useSelector(state => state.session.user);

  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ recentUploads, setRecentUploads ] = useState([]);

  const artworksOrder = allArtworks.sort((a, b) => {
    return b.id - a.id;
  });

  useEffect(() => {
    const uploads = [];

    for (let i = 0; i < 5; i++) {
      uploads.push(artworksOrder[ i ]);
      setRecentUploads(uploads)
    };

    setIsLoaded(true);
  }, [ allArtworksObj ]);

  return (
    <>
      {isLoaded && (
        <PageContainer>
          <div className='page-content-container'>
            <h1>Recent Uploads</h1>
            <div className='artwork-showcase-container'>
              {currUser ? (
                <>
                  {recentUploads.map(artwork => (
                    <Link to={`/artworks/${artwork.id}`} className='artwork-showcase-container-item'>
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
                    <div className='artwork-showcase-container-item'>
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
            <h1>All Artworks</h1>
            <DisplayArtSection items={allArtworks} />
          </div>
        </PageContainer>
      )}
    </>
  )
};

export default ArtworksPage
