<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div
            class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
          >
            <div
              class="absolute top-3 right-3 modal-close text-xl cursor-pointer z-50"
              @click="loginModalVisibility = false"
            >
              <i class="fas fa-times"></i>
            </div>

            <div class="w-full max-w-md space-y-8">
              <div>
                <img
                  class="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
                <h2
                  class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
                >
                  Sign in to your account
                </h2>
                <div class="p-4 w-full rounded-lg text-red-500">
                  {{ errorMessage }}
                </div>
              </div>
              <vee-form
                @submit="login"
                class="mt-8 space-y-6"
                :validation-schema="loginSchema"
              >
                <vee-field type="hidden" name="remember" value="true" />
                <div class="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label for="email-address" class="sr-only"
                      >Email address</label
                    >
                    <vee-field
                      id="email-address"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email address"
                    />
                    <error-message
                      name="email"
                      class="text-red-500"
                    ></error-message>
                  </div>
                  <div>
                    <label for="password" class="sr-only">Password</label>
                    <vee-field
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                    />
                    <error-message
                      name="password"
                      class="text-red-500"
                    ></error-message>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <vee-field
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      for="remember-me"
                      class="ml-2 block text-sm text-gray-900"
                      >Remember me</label
                    >
                  </div>

                  <div class="text-sm">
                    <a
                      href="#"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                      >Forgot your password?</a
                    >

                    <a
                      href="#"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                      @click.prevent="toggleModal"
                    >
                      Register Now!</a
                    >
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class="group relative flex w-full align-items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                      <!-- Heroicon name: mini/lock-closed -->
                      <svg
                        class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    Sign in
                    <i
                      v-show="loaderVisibility"
                      class="fas fa-spinner fa-spin absolute right-5 top-3"
                    ></i>
                  </button>
                </div>
              </vee-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions } from "pinia";
import useUserStore from "@/stores/user";
import useModalStore from "@/stores/modal";
export default {
  name: "LoginModal",
  data() {
    return {
      loginSchema: {
        email: "required|email|min:5|max:50",
        password: "required",
      },
      errorMessage: "",
      loaderVisibility: false,
    };
  },
  computed: {
    ...mapWritableState(useModalStore, {
      loginModalVisibility: "loginModal",
      registerModalVisibility: "registerModal",
    }),
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login(values) {
      this.loaderVisibility = true;
      try {
        await this.authenticate(values);
        this.loginModalVisibility = false;
        this.loaderVisibility = false;
      } catch (error) {
        console.log("Sorry Something Went  Wrong!");
        this.errorMessage = error.message;
        this.loaderVisibility = false;
      }
    },

    toggleModal() {
      this.registerModalVisibility = !this.registerModalVisibility;
      this.loginModalVisibility = !this.loginModalVisibility;
    },
  },
};
</script>

<style></style>
