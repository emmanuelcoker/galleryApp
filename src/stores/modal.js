import { defineStore } from "pinia";

export default defineStore("modal", {
  state: () => ({
    loginModal: false,
    registerModal: false,
  }),
  getters: {
    hiddenLogin(state) {
      return !state.loginModal ? "hidden" : "";
    },
    hiddenRegisterModal(state) {
      return !state.registerModal ? "hidden" : "";
    },
  },
});
