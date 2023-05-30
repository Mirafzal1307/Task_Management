import axios from "axios";
// import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
console.log(axios.defaults.baseURL);

axios.defaults.headers.Accept = "application/json";
axios.defaults.headers["Content-Type"] = "application/json";
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const { user } = useUserStore();

    console.log(user, "in axios ts");

    if (user?.token.length)
      config.headers.Authorization = `Bearer ${user.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (config) => config,
  (error) => {
    // const toast = useToast();
    const { logout } = useUserStore();

    if (
      error.response?.status === 400 &&
      error.response.data?.message.includes("Already authenticated")
    )
      logout();

    if (error.response?.status === 400 || error.response?.status === 500)
      if (error.response?.status === 422)
        if (error.response?.status === 401)
          // toast.error(error.response.data?.message);

          // toast.error(error.response.data?.message);

          logout();

    if (error.message === "Network Error")
      // toast.error("Серверда хатолик юз берди, илтимос қайтадан уриниб кўринг");

      return error;
  }
);

export default axios;
