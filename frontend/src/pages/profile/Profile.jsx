import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import s from "./profile.module.css";
import { userRequest } from "../../requestMethod";
import axios from "axios";
function Profile() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  let navigate = useNavigate();
  const [input, setInput] = useState(true);
  const [res, serRes] = useState(false);
  const [data, setData] = React.useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("BASE_URL"));
    try {
      const headers = {
        authorization: localStorage.getItem("TOKEN"),
      };
      let obj = {
        name: data.name,
        email: data.email,
        age: data.age,
      };
      console.log(obj);
      axios
        .put(localStorage.getItem("BASE_URL") + "user", data, { headers })
        .then((response) => {
          serRes(true);
          setInput(true);
          serRes(false);
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userRequest.get("user");
        setData(res.data);
        getAge();
      } catch (err) {}
    };
    getData();
  }, []);

  function getAge() {
    var today = new Date();
    var birthDate = new Date(data.age);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div className={s.container}>
      <div className={s.containerSec}>
        <button
          className={s.button6}
          onClick={() => {
            setInput(false);
          }}
        >
          Edit
        </button>
        <button
          className={s.button6}
          disabled={isFetching}
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
            navigate("/login");
          }}
        >
          logout
        </button>
      </div>
      <form className={s.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="">Name : </label>
        <input
          disabled={input}
          className={input ? s.customInput : ""}
          type="text"
          defaultValue={data.name}
          onChange={(e) => {
            setData({
              ...data,
              name: e.target.value,
            });
          }}
        />
        <br />
        <label htmlFor="">Email : </label>
        <input
          disabled={input}
          className={input ? s.customInput : ""}
          type="email"
          defaultValue={data.email}
          onChange={(e) => {
            setData({
              ...data,
              email: e.target.value,
            });
          }}
        />
        <br />
        <label htmlFor="">Age : </label>
        {input && (
          <input
            disabled={input}
            className={input ? s.customInput : ""}
            type="text"
            value={getAge()}
          />
        )}{" "}
        {!input && (
          <input
            disabled={input}
            className={input ? s.customInput : ""}
            type="date"
            defaultValue={data.age}
            onChange={(e) => {
              setData({
                ...data,
                age: e.target.value,
              });
            }}
          />
        )}
        <br />
        {res && <p>Update Successfully</p>}
        <div className={s.container__}>
          {!input && (
            <>
              <button className={s.button6} type="submit">
                Submit
              </button>
              <button
                className={s.button6}
                onClick={() => {
                  setInput(true);
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;
