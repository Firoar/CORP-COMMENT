import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupAxios } from "../apiFetch";
import { SignupData } from "../interfaces.ts";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    // console.log({ name, email, password, confirmPassword });

    // data mut b sent for sign up
    const signupData: SignupData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirmPassword") as string,
    };

    console.log(signupData, " : SD");

    try {
      const data = await signupAxios(signupData);
      console.log(data);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      if (data.ready_to_login) {
        alert("U can login now ");
        navigate("/sign-in");
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 422:
            setErrorMsg(data.detail || "Your inputs are mismatched");
            break;
          case 409:
            setErrorMsg(data.detail || "Duplicate data");
            break;
          case 404:
            setErrorMsg("Not found!!");
            break;
          case 500:
            setErrorMsg("Internal Server error :(");
            break;
          default:
            setErrorMsg("Unexpected error occured");
            break;
        }
      } else if (error.request) {
        setErrorMsg("Network error");
      } else {
        setErrorMsg("Somethinng went wrong!!");
      }
    }
  };
  return (
    <div className="sign-form">
      <form onSubmit={handleSubmit} className="s-in-form">
        <h3>Register</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="block"
          required
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="block"
          required
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="block"
          required
          onChange={handleChange}
          value={formData.password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="block"
          required
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        <button className="block-btn" type="submit">
          Sign Up
        </button>
        <div>
          Have Account?<Link to="/sign-in">SignIn Here</Link>
        </div>
        {errorMsg.length > 0 && <p className="warning">{errorMsg}</p>}
      </form>
    </div>
  );
};
export default SignUp;
