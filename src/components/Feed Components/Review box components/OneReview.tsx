import { like_post } from "../../../apiFetch";
import { useMyStore } from "../../../useStore_PostDat";
import styles from "/home/chiru/Desktop/byte grad/CORP-COMMENT/src/css/app.module.css";

const OneReview = ({ dataObj }: { dataObj: any }) => {
  const token = localStorage.getItem("access_token") as string;
  const { changedLike, setChangedLike } = useMyStore();

  console.log(dataObj.post_random_color);

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
    const hoursPassed = timeDiff / (1000 * 3600);

    if (hoursPassed < 24) {
      return 0; // Return 0 if less than 24 hours have passed
    } else {
      return Math.ceil(hoursPassed / 24); // Round up to the nearest day
    }
  };

  // Calculate days passed since creation
  const daysPassed = getDaysPassed(createdAt);

  // Function to generate random background color
  // const getRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  // Generate random background color for company letter
  const companyLetterStyle = {
    backgroundColor: dataObj.post_random_color,
  };

  const handleUpvote = async () => {
    try {
      await like_post(token, Number(dataObj.post_id));
      setChangedLike(!changedLike); // Trigger state update
    } catch (error) {
      console.error("Error liking post:", error);
      // Handle error as needed (e.g., show error message)
    }
  };

  return (
    <div className={styles["one-post"]}>
      <button className={styles["upvote-btn"]} onClick={handleUpvote}>
        {alreadyLiked === false ? (
          <span className="upvote-mark">▲</span>
        ) : (
          <></>
        )}
        <span>{likes}</span>
      </button>

      <div className={styles["Company-letter"]} style={companyLetterStyle}>
        {companyLetter}
      </div>
      <div>
        <div className={styles["Company"]}>{company}</div>
        <div className={styles["review-text"]}>{review}</div>
      </div>
      <div className={styles["daysPassed"]}>
        {daysPassed === 0 ? "New" : `${daysPassed}d`}
      </div>
    </div>
  );
};

export default OneReview;
