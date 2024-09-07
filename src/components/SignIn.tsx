import { FormEvent, useState } from "react";
import { SignInData } from "../interfaces";
import { signinAxios } from "../apiFetch";
import { useNavigate } from "react-router-dom";

function SignIn() {
  // const setToken = useStore((state) => state.setToken);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSUbmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    const signinData: SignInData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const data = await signinAxios(signinData);

      setFormData({ email: "", password: "" });

      if (data.access_token && data.token_type == "bearer") {
        localStorage.setItem("access_token", data.access_token);

        // now redirect
        navigate("/feed");
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        // console.log(status,data);
        switch (status) {
          case 404:
            setErrorMsg(data.detail || "bad request, please check your input");
            break;
          case 401:
            setErrorMsg(data.detail || "Unauthorized");
            break;
          case 500:
            setErrorMsg("Internal Server error");
            break;
          default:
            setErrorMsg("AN unExpected Error Occured");
            break;
        }
      } else if (error.request) {
        setErrorMsg("Network Error, check your internet");
      } else {
        setErrorMsg("S--mething went wrong");
      }
    }
  };
  return (
    <div className="sign-form">
      <form onSubmit={handleSUbmit} className="s-up-form">
        <h3>Login</h3>
        <input
          type="email"
          className="block2"
          required
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          required
          className="block2"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit" className="block-btn2">
          Sign In
        </button>
        {errorMsg.length > 0 && <p className="warning">{errorMsg}</p>}
      </form>
    </div>
  );
}

export default SignIn;
