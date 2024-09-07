import CompanyBox from "./Feed Components/CompanyBox";
import ReviewBox from "./Feed Components/ReviewBox";
import styles from "../css/app.module.css";

const Feed = () => {
  // const setPostData = usePostDataStore((state) => state.setPostData);
  // const token = localStorage.getItem("access_token");
  // const { data } = useGetAllPosts(token as string);
  // setPostData(data as any[]);
  // console.log(data);

  return (
    <div className={styles["main-feed"]}>
      <ReviewBox />
      <CompanyBox />
    </div>
  );
};
export default Feed;
