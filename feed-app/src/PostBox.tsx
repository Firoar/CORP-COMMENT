import OneReview from "./OneReview";

const data = [
  {
    post_id: 1,
    post_company: "starbucks",
    post_review: "cofee was too sweet",
    post_owner_id: 2,
    post_created_at: "2024-06-30T13:39:59.386386+05:30",
    post_no_of_likes: 0,
    post_liked_by_current_user: false,
  },
  {
    post_id: 2,
    post_company: "airtel",
    post_review: "app user interface not good",
    post_owner_id: 9,
    post_created_at: "2024-06-29T13:50:23.935417+05:30",
    post_no_of_likes: 0,
    post_liked_by_current_user: false,
  },
];
const PostBox = () => {
  return (
    <div className="review-post-box">
      {data.map((obj) => (
        <OneReview key={obj.post_id} dataObj={obj} />
      ))}
    </div>
  );
};
export default PostBox;
