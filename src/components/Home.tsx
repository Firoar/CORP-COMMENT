import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="main">
      <div className="top"></div>
      <div className="title">CORP #Comment</div>
      <div className="about">Your One stop Place for all the reviews</div>
      <button className="btn  btn-sign-in" onClick={() => navigate("/sign-up")}>
        Sign Up
      </button>
      <div className="sign-up-div">
        Already have an account?{" "}
        <Link className="sign-up-link" to="/sign-in">
          Sign In
        </Link>
      </div>
    </div>
  );
};
export default Home;
