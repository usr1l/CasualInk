import React, { useEffect, useState } from 'react';
import "./ReviewPage.css";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReviewPage = ({ reviewsList }) => {
  const [ reviews, setReviews ] = useState([]);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const { allReviews } = useSelector(state => state.reviews);
  const { allUsers } = useSelector(state => state.users);

  useEffect(() => {
    const res = [];
    for (const id of reviewsList) {
      const review = allReviews[ id ];
      const user = allUsers[ review.reviewer_id ];
      review[ "profilePic" ] = user.profilePic;
      review[ "username" ] = user.username;
      res.push(allReviews[ id ])
    };

    setReviews(res);
    setIsLoaded(true);
  }, [ reviewsList, isLoaded ])


  return (
    <>
      {isLoaded && (
        <div>
          {reviews.map((review) => (
            <div style={{ boxSizing: "border-box", margin: "40px 10px" }} className='window border'>
              <div>{review.profilePic}</div>
              <div>{review.username}</div>
              <div>{review.receiver_id}</div>
              <div>{review.reviewer_id}</div>
              <div>{review.review}</div>
              <div>{review.updated_at}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
};

export default ReviewPage;
