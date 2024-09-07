import PostBox from "./Review box components/PostBox";
import SearchBox from "./Review box components/SearchBox";
import styles from "/home/chiru/Desktop/byte grad/CORP-COMMENT/src/css/app.module.css";

const ReviewBox = () => {
  return (
    <div className={styles["review-box"]}>
      <SearchBox />
      <PostBox />
    </div>
  );
};
export default ReviewBox;
