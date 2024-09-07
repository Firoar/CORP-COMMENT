import React, { useEffect, useState } from "react";
import styles from "/home/chiru/Desktop/byte grad/CORP-COMMENT/src/css/app.module.css";
import { get_all_postAxios, sleep } from "../../apiFetch";
import { useMyStore } from "../../useStore_PostDat";
import { useNavigate } from "react-router-dom";

const CompanyBox: React.FC = () => {
  const token = localStorage.getItem("access_token");
  const { changedPost, changedLike } = useMyStore();
  const [data, setData] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get_all_postAxios(token as string);
        setData(result);
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
            case 404:
              setErrorMsg(data.detail || " not found !!");
              break;
            case 415:
              setErrorMsg(data.detail || "review is not of required type");
              break;
            default:
              setErrorMsg(`AN unExpected Error Occured : ${status}`);
          }
        } else if (error.request) {
          setErrorMsg("Network Error, check your internet");
        } else {
          setErrorMsg("S000mething went wrong");
        }

        setData([]); // Clear data on error or handle appropriately
      }
    };

    fetchData();
  }, [token, changedPost, changedLike]); // Include token and changedPost in dependencies

  return (
    <div className={styles["company-box"]}>
      {errorMsg.length > 0 ? (
        <div className={styles["error-msg"]}>{errorMsg}</div>
      ) : (
        <></>
      )}
      {data.map((dataObj) => (
        <div key={dataObj.post_id} className={styles["one-company"]}>
          {dataObj.post_company}
        </div>
      ))}
    </div>
  );
};

export default CompanyBox;
