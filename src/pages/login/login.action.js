import api from "../../apis/index";
import { notification } from "antd";
import {SIGN_IN} from "../../constants/types";

export const signIn = (username, password) => async (dispatch) => {
  api
    .post("./auth/login", {
      username,
      password,
    })
    .then((res) => {
      console.log(res);
      if (res?.status === 200) {
        window.localStorage.setItem("token", res.data.token);
        dispatch({ type: SIGN_IN });
          notification["success"]({
            message: "Đăng nhập thành công",
            duration: 1,
          });
      } else {
        notification["error"]({
          message: "Đăng nhập thất bại",
          duration: 1,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      notification["error"]({
        message: err.message,
        duration: 1,
      });
    });
};
