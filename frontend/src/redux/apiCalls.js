import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { userRequest } from "../requestMethod";
import { registerStart, registerSuccess, registerFailure } from "./userRedux";
export const login = async (dispatch, user) => {
  console.log(user);
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/signin", user);
    console.log(res);

    dispatch(loginSuccess(res.data));
    window.location = "./profile";
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const register = async (dispatch, user) => {
  console.log(user);
  dispatch(registerStart());
  try {
    const res = await userRequest.post("/auth/signup", user);
    console.log(res);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};
