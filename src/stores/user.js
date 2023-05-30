import AuthService from "@/services/auth.services/auth.service";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggingOut: false,
    loading: false,
    // user: JSON.parse(localStorage.getItem("user")),
    users: [],
    totalUsers: 0,
    currentPage: 1,
    userID: 0,

    currentUser: {
      role: 0,
      branch_id: 0,
      name: "",
      email: "",

      // password: '',
      new_password: "",
      new_password_confirmation: "",
    },

    userRoles: [],

    isCreatingUser: false,
    isUpdatingUser: false,
    isUserDeleting: false,

    selectedUser: null,
  }),

  actions: {
    async login(userCredentials) {
      console.log("async login", userCredentials);
      try {
        this.loading = true;
        // eslint-disable-next-line prettier/prettier, no-debugger
        // await getCookie()

        const { data } = await AuthService.login(userCredentials);

        this.user = data;
        // localStorage.setItem("user", JSON.stringify(data));

        return data;
      } catch (error) {
        return error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        this.isLoggingOut = true;
        // await loggingout();
        localStorage.removeItem("user");

        location.reload();
      } finally {
        this.isLoggingOut = false;
      }
    },

    // async updateUser(userdata) {
    //   try {
    //     this.loading = true;
    //     console.log("updateUser", userdata);

    //     // one of the following users
    //     return await updateUser(userdata, this?.userID);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    // async updateUserInfo(userdata) {
    //   try {
    //     this.loading = true;
    //     console.log("updateUser", userdata);

    //     // one of the following users
    //     return await updateUserInfo(userdata);
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    async getAllUsers(page = 1, perPage = 15) {
      try {
        this.loading = true;
        this.users = [];

        const { data: users, meta } = await AuthService.fetchAllUsers(
          page,
          perPage
        );

        this.totalUsers = meta.total;
        this.users = users;
      } finally {
        this.loading = false;
      }
    },

    // async getUserRoles() {
    //   const { data: roles } = await fetchUserRoles();

    //   this.userRoles = roles;
    // },

    // async getUserById(id) {
    //   this.userID = id;

    //   const { data: user } = await fetchUserById(id);

    //   this.currentUser = user;
    //   this.isUpdatingUser = true;
    // },

    // async showDeleteConfirmation(user) {
    //   this.selectedUser = user;
    //   this.isUserDeleting = true;
    // },

    // async cancelUserDeleting() {
    //   this.isUserDeleting = false;
    //   this.selectedUser = null;
    // },

    // async confirmUserDelete() {
    //   return await deleteUserById(this.selectedUser.id);
    // },
  },

  getters: {},
});
