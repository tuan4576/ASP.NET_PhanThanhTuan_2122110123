import axiosClient from "./axiosClient";

const apiCategory = {
    getAll: () => {
        return axiosClient.get("/Category");
      },

}

export default apiCategory;