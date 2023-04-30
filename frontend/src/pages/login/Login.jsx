import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import s from "./login.module.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Sign In</h1>
        <form action="" className={s.form}>
          <input
            required
            type="text"
            className={s.input}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="email"
          />

          <input
            required
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={s.input}
            placeholder="Password"
          />

          {error && <p>please check your details</p>}
          <button
            disabled={isFetching}
            onClick={(e) => {
              e.preventDefault();
              login(dispatch, { email, password });
            }}
            className={s.btn}
          >
            LOGIN
          </button>

          <a href="" className={s.link}>
            Do not you remember the password
          </a>
          <a href="/register" className={s.link}>
            Create a New Account
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
