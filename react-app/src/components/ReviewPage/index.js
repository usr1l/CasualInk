import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputDiv from '../InputDiv';
import profileIcon from "../static/profile-icon.png";
import ProfileDescriptionCard from '../ProfileDescriptionCard';
import "./ReviewPage.css";
import Button from '../Button';
import { thunkCreateReview } from '../../store/reviews';

const ReviewPage = ({ reviewsList, name, user }) => {
  const [ reviews, setReviews ] = useState([]);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ comment, setComment ] = useState('');
  const [ commentError, setCommentError ] = useState('');
  const { allReviews } = useSelector(state => state.reviews);
  const { allUsers } = useSelector(state => state.users);
  const currUserId = useSelector(state => state.session.user.id);

  const dispatch = useDispatch();

  useEffect(() => {
    const res = [];
    for (const id of reviewsList) {
      const review = allReviews[ id ];
      const user = allUsers[ review.reviewer_id ];
      review[ "profilePic" ] = user.profilePic;
      review[ "name" ] = `${user.firstname} ${user.lastname[ 0 ]}.`;
      res.push(allReviews[ id ]);
    };

    setReviews(res);
    setIsLoaded(true);
  }, [ reviewsList, isLoaded ]);

  const handleReview = (comment, receiverId) => {
    if (comment.length < 1) return setCommentError('Invalid comment');
    const res = dispatch(thunkCreateReview({ comment, receiverId }));
    if (res.ok) {
      setComment('');
      setCommentError('');
    };
  };

  return (
    <>
      {isLoaded && (
        <>
          <div
            className='window border'
            style={{ boxSizing: "border-box", margin: "40px 10px" }}
          >
            <h1 style={{ margin: '0' }}>See what other's say about {name}!</h1>
            {currUserId !== user && (
              <>
                <InputDiv
                  labelFor='comment'
                  label="Or maybe you have something to share, leave them a review here:"
                  placeholder={''}
                  error={commentError}
                >
                </InputDiv>
                <textarea
                  name='comment'
                  className='__input input--long'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                ></textarea>
                <br />
                <Button
                  buttonSize={"btn--wide"}
                  buttonStyle={"btn--login"}
                  onClick={() => handleReview(comment, user)}
                >Review {name}</Button>
              </>
            )}
          </div>
          <div>
            {reviews.map((review) => (
              <div
                style={{
                  boxSizing: "border-box",
                  margin: "40px 10px",
                  display: "flex",
                  flexDirection: "column"
                }}
                className='window border'>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0 0 20px",
                    height: "55px",
                    boxSizing: "border-box"
                  }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 20px 0 0"
                    }}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%"
                      }}
                      src={review.profilePic ? review.profilePic : profileIcon} />
                  </div>
                  <div
                    style={{
                      height: "100%",
                      justifyContent: "space-evenly"
                    }}
                    className='column'>
                    <Link
                      to={`/user/${review.reviewer_id}/`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                      className='click'>
                      {review.name}
                    </Link>
                    <div style={{ color: "grey" }}>{review.updated_at.slice(0, 17)}</div>
                  </div>
                </div>
                <div>{review.review}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
};

export default ReviewPage;
