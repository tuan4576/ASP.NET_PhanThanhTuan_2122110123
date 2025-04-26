import axiosClient from "./axiosClient";

const apiProduct = {
    getAll: () => {
        return axiosClient.get("/Product");
      },

}

export default apiProduct;