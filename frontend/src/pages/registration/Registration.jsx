import React, { memo, useState } from "react";
import s from "./registration.module.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";
const Registration = memo(() => {
  const [err, setErr] = useState(false);
  const [pass, setPass] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  let navigate = useNavigate();

  const [all, setAll] = useState({
    fname: "",
    lname: "",
    email: "",
    age: "",
    password: "",
    CPassword: "",
  });
  //   let navigate = useNavigate();
  //   let post = async () => {
  //     await userRequest.post("/auth/register", all);
  //   };
  const clicked = (e) => {
    e.preventDefault();

    if (
      all.fname &&
      all.CPassword &&
      all.password &&
      all.age &&
      all.email &&
      all.lname
    ) {
      setErr(false);
      let { password, CPassword } = all;

      if (password !== CPassword) {
        setPass(true);
      } else {
        let obj = {
          name: all.fname + all.lname,
          password: all.password,
          age: all.age,
          email: all.email,
        };

        register(dispatch, obj);
        console.log(all);
        setPass(false);
        navigate("/login");
      }
    } else {
      setErr(true);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Create an account</h1>
        <form className={s.form}>
          <input
            required
            type="text"
            className={s.input}
            placeholder="first name"
            onChange={(e) => {
              setAll({
                ...all,
                fname: e.target.value,
              });
            }}
          />
          <input
            required
            type="date"
            className={s.input}
            onChange={(e) => {
              setAll({
                ...all,
                age: e.target.value,
              });
            }}
          />
          <input
            required
            type="text"
            className={s.input}
            placeholder="last name"
            onChange={(e) => {
              setAll({
                ...all,
                lname: e.target.value,
              });
            }}
          />

          <input
            required
            type="email"
            className={s.input}
            placeholder="email"
            onChange={(e) => {
              setAll({
                ...all,
                email: e.target.value,
              });
            }}
          />
          <input
            required
            type="password"
            className={s.input}
            placeholder="password"
            onChange={(e) => {
              setAll({
                ...all,
                password: e.target.value,
              });
            }}
          />
          <input
            required
            type="password"
            className={s.input}
            placeholder="confirm password"
            onChange={(e) => {
              setAll({
                ...all,
                CPassword: e.target.value,
              });
            }}
          />
          {err && <div>Please fill all inputs</div>}
          {pass && <div>Password not match !!</div>}

          <button
            disabled={isFetching}
            onClick={clicked}
            className={s.btn}
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
});

export default Registration;
