import { useState, useEffect } from "react";
import styles from "/home/chiru/Desktop/byte grad/CORP-COMMENT/src/css/app.module.css";

import { ReviewData } from "../../../interfaces";
import { sleep, upload_postAxios } from "../../../apiFetch";
import { useMyStore } from "../../../useStore_PostDat";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const token = localStorage.getItem("access_token") as string;
  const { changedPost, setChangedPost } = useMyStore();
  // console.log(changedPost);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [count, setCount] = useState(150);

  useEffect(() => {
    setCount(150 - text.length);
  }, [text]);

  const handleSubmit = async () => {
    try {
      const reviewData: ReviewData = { review: text };

      // Call the API to upload the post
      await upload_postAxios(token, reviewData);

      // Clear the text area after successful submission
      setText("");

      setChangedPost(!changedPost);
    } catch (error: any) {
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
        console.log(error);

        setErrorMsg(`Soo2mething went wrong-${error}`);
      }
      setText("");
      // console.error("Error uploading post:", error);
    }
  };

  return (
    <div className={styles["review-search-box"]}>
      <h3 className={styles["review-title"]}>CorpComment</h3>
      <h1 className={styles["review-about"]}>
        Give Feedback. <i>Publicly</i>
      </h1>
      {errorMsg.length > 0 && <h3 className="review-error-msg">{errorMsg}</h3>}

      <textarea
        name=""
        id=""
        className={styles["review-textarea"]}
        maxLength={150}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button className={styles["review-submit-btn"]} onClick={handleSubmit}>
        Submit
      </button>
      <p className={styles["review-count"]}>{count}</p>
    </div>
  );
};

export default SearchBox;
