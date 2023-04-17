import axios from "axios";
import { setUser } from "../store/reducers/userReducer";

export const registration = async (form) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/api/auth/registration",
      form
    );

  } catch (e) {
    console.log(e.response.data);
  }
};

export const login = (form) => {
  return async (dispatch) => {
    try {
      const {
        data: { data },
      } = await axios.post("http://localhost:8000/api/auth/login", form);
      console.log(data);

      dispatch(setUser(data.user));
      localStorage.setItem("token", data.token);
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const {
        data: { data },
      } = await axios.post(
        "http://localhost:8000/api/auth/auth",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setUser(data.user));
      localStorage.setItem("token", data.token);
    } catch (e) {
      console.log(e.response.data);
      localStorage.removeItem("token");
    }
  };
};
