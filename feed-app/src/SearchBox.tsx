import { useEffect, useState } from "react";

const SearchBox = () => {
  const [text, setText] = useState("");
  const [count, setcount] = useState(150);
  useEffect(() => {
    setcount(150 - text.length);
  }, [text]);

  return (
    <div className="review-search-box">
      <h3 className="text-overlay review-title">CorpComment</h3>
      <h1 className="text-overlay review-about">
        Give Feedback. <i>Publicly</i>
      </h1>

      <textarea
        name=""
        id=""
        className="review-textarea"
        maxLength={150}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button className="review-submit-btn">Submit</button>
      <p className="review-count">{count}</p>
    </div>
  );
};
export default SearchBox;
