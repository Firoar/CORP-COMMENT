import { useEffect, useState } from "react";

import OneReview from "./OneReview";
import styles from "/home/chiru/Desktop/byte grad/CORP-COMMENT/src/css/app.module.css";
import { useMyStore } from "../../../useStore_PostDat";
import { get_all_postAxios, sleep } from "../../../apiFetch";
import { useNavigate } from "react-router-dom";

// const mydata = [
//   {
//     post_id: 1,
//     post_company: "starbucks",
//     post_review: "cofee was too sweet",
//     post_owner_id: 2,
//     post_created_at: "2024-06-30T13:39:59.386386+05:30",
//     post_no_of_likes: 0,
//     post_liked_by_current_user: false,
//   },
//   {
//     post_id: 2,
//     post_company: "airtel",
//     post_review: "app user interface not good",
//     post_owner_id: 9,
//     post_created_at: "2024-06-29T13:50:23.935417+05:30",
//     post_no_of_likes: 0,
//     post_liked_by_current_user: false,
//   },
// ];
const PostBox = () => {
  const token = localStorage.getItem("access_token");
  const { changedPost, changedLike } = useMyStore();
  // console.log(changedPost);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_all_postAxios(token as string);
        setData(result);
        console.log(result);
      } catch (error: any) {
        // console.error("Error fetching data:", error);
        if (error.response) {
          const { status, data } = error.response;
          switch (status) {
            case 401:
              setErrorMsg("unauthorized, Login again");
              // alert("login expired!! \nLogin again");
              await sleep(5000);
              navigate("/sign-in");
              break;
            case 415:
              setErrorMsg(data.detail || "review is not of required type");
              break;
            case 404:
              setErrorMsg(data.detail || " not found !!");
              break;
            default:
              setErrorMsg(`AN unExpected Error Occured : ${status}`);
          }
        } else if (error.request) {
          setErrorMsg("Network Error, check your internet");
        } else {
          setErrorMsg("S00mething went wrong");
        }
        setData([]); // Clear data on error or handle appropriately
      }
    };

    fetchData();
  }, [changedPost, changedLike, token]);

  return (
    <div className={styles["review-post-box"]}>
      {errorMsg.length > 0 ? (
        <div className={styles["error-msg"]}>{errorMsg}</div>
      ) : (
        <></>
      )}
      {data?.map((obj) => (
        <OneReview key={obj.post_id} dataObj={obj} />
      ))}
    </div>
  );
};
export default PostBox;
