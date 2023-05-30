import axios from "@/libs/axios";

const AuthService = {
  login: async (userCredentials) => {
    const { data } = await axios.post("/user/login", userCredentials);

    return data;
  },
  fetchAllUsers: async (page, perPage) => {
    const { data } = await axios.get(
      `/user/index?per-page=${perPage}&page=${page}`
    );

    return data;
  },
};

export default AuthService;
