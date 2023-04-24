import React from 'react';
import PageContainer from '../PageContainer';
import "./SingleArtworkPage.css";
import BottomNav from '../BottomNav';
import { Link } from 'react-router-dom';
import Button from '../Button';

const SingleArtworkPage = () => {
  return (
    <>
      <PageContainer>

      </PageContainer>
      <BottomNav>
        <Link to={'/'} className="page-return">
          <h3>
            <i className="fa-solid fa-angle-left" /> Back to Home
          </h3>
        </Link>
        <div className="page-return">
          <Button
            buttonStyle='btn--login'
            // onClick={onSubmit}
            buttonSize='btn--wide'
          >Edit This Artwork
          </Button>
        </div>
      </BottomNav>
    </>
  )
};

export default SingleArtworkPage;
