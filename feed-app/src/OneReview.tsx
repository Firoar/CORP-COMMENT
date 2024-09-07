// import React from "react";

const OneReview = ({ dataObj }: { dataObj: any }) => {
  const likes = dataObj.post_no_of_likes;
  const alreadyLiked = dataObj.post_liked_by_current_user;
  const company = dataObj.post_company;
  const companyLetter = company ? company[0].toUpperCase() : "";
  const review = dataObj.post_review;
  const createdAt = dataObj.post_created_at;

  // Function to calculate number of days between two dates
  const getDaysPassed = (dateString: string) => {
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - createdDate.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Calculate days passed since creation
  const daysPassed = getDaysPassed(createdAt);

  return (
    <div className="one-post">
      <button className="upvote-btn">
        {alreadyLiked == false ? <span>▲</span> : <></>}
        <span>{likes}</span>
      </button>

      <div className="Company-letter">{companyLetter}</div>
      <div>
        <div className="Company">{company}</div>
        <div className="review-text">{review}</div>
      </div>
      <div className="daysPassed">
        {daysPassed - 1 == 0 ? "New" : `${daysPassed - 1}d`}
      </div>
    </div>
  );
};

export default OneReview;
