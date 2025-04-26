import axiosClient from "./axiosClient";

const axiosUser = {
    PostLogin: () => {
        return axiosClient.post("/User/login");
      },
    PostRegister: () => {
        return axiosClient.post("/User/register");
      },

}

export default axiosUser;