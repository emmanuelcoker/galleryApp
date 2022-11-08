<template>
  <div>
    <nav class="bg-white shadow-md">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="[(mainDropDown = !mainDropDown), (subDropDown = false)]"
            >
              <span class="sr-only">Open main menu</span>
              <!--
            Icon when menu is closed.

            Heroicon name: outline/bars-3

            Menu open: "hidden", Menu closed: "block"
          -->
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <!--
            Icon when menu is open.

            Heroicon name: outline/x-mark

            Menu open: "block", Menu closed: "hidden"
          -->
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <!--Desktop screens left side-->
          <div
            class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
          >
            <!--Logo Here-->
            <div class="flex flex-shrink-0 items-center">
              <router-link
                :to="{ name: 'home' }"
                exact-active-class="no-active"
              >
                <img
                  exact-active-class="no-active"
                  class="block h-8 w-auto lg:hidden"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </router-link>

              <router-link :to="{ name: 'home' }" exact-active-class="no-active"
                ><img
                  exact-active-class="no-active"
                  class="hidden h-8 w-auto lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
              /></router-link>
            </div>

            <!--big screen links-->
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <router-link :to="{ name: 'about' }" :class="navLinkStyles"
                  >About</router-link
                >

                <router-link :to="{ name: 'my-gallery' }" :class="navLinkStyles"
                  >Photos</router-link
                >

                <router-link
                  :to="{ name: 'illustrations' }"
                  :class="navLinkStyles"
                  >Illustrations</router-link
                >

                <router-link :to="{ name: 'vectors' }" :class="navLinkStyles"
                  >Vectors</router-link
                >

                <router-link :to="{ name: 'music' }" :class="navLinkStyles"
                  >Music
                </router-link>
                <router-link :to="{ name: 'effects' }" :class="navLinkStyles"
                  >Sound Effects</router-link
                >

                <!--Auth Links for sm-->
                <div
                  v-if="!userLoggedIn"
                  class="flex align-items-center justify-between"
                >
                  <button
                    class="sm:hidden hover:bg-blue-500 text-gray-900 font-bold py-2 px-6 mx-1 rounded-lg"
                    @click="loginModalVisibility = !loginModalVisibility"
                  >
                    Login
                  </button>
                  <button
                    class="sm:hidden hover:bg-blue-500 text-gray-900 font-bold py-2 px-6 mx-1 rounded-lg"
                    @click="registerModalVisibility = !registerModalVisibility"
                  >
                    Register
                  </button>
                </div>
                <div v-else>
                  <button
                    class="sm:hidden bg-amber-200 hover:bg-amber-500 text-white font-bold py-2 px-6 mx-1 rounded-lg"
                    @click="logOut"
                  >
                    Log Out
                  </button>
                  <router-link
                    exact-active-class="no-active"
                    :to="{ name: 'upload' }"
                    class="sm:hidden bg-green-400 hover:bg-green-800 text-white font-bold py-2 px-6 mx-1 rounded-lg"
                  >
                    Upload
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!--Desktop screen auth links Right side-->
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <div
              v-if="!userLoggedIn"
              class="flex align-items-center justify-between"
            >
              <button
                class="hidden md:block hover:bg-blue-500 text-gray-900 font-bold py-2 px-6 mx-1 rounded-lg"
                @click="loginModalVisibility = !loginModalVisibility"
              >
                Login
              </button>
              <button
                class="hidden md:block hover:bg-blue-500 text-gray-900 font-bold py-2 px-6 mx-1 rounded-lg"
                @click="registerModalVisibility = !registerModalVisibility"
              >
                Register
              </button>
            </div>
            <div v-else class="flex flex-row">
              <router-link
                to="/upload"
                exact-active-class="no-active"
                class="hidden md:block bg-green-400 hover:bg-green-800 text-white font-bold py-2 px-6 mx-1 rounded-lg"
              >
                Upload
              </router-link>
            </div>

            <!--Notification  and profile buttons-->
            <button
              v-if="userLoggedIn"
              type="button"
              class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">View notifications</span>
              <!-- Heroicon name: outline/bell -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <transition name="menu">
              <div class="relative ml-3">
                <div>
                  <button
                    v-if="userLoggedIn"
                    type="button"
                    class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    @click="subDropDown = !subDropDown"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
                <div
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                  v-if="subDropDown"
                >
                  <!-- Active: "bg-gray-100", Not Active: "" -->
                  <a
                    class="block px-4 py-2 cursor-pointer hover:bg-blue-200 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                    >Your Profile</a
                  >
                  <a
                    class="block px-4 cursor-pointer hover:bg-blue-200 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                    >Settings</a
                  >
                  <a
                    class="block px-4 py-2 cursor-pointer hover:bg-blue-200 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                    @click.prevent="logOut"
                    >Sign out</a
                  >
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. Left Side -->
      <transition name="menu">
        <div class="sm:hidden" id="mobile-menu" v-if="mainDropDown">
          <div class="flex flex-col space-y-1 px-2 pt-2 pb-3">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <router-link :to="{ name: 'about' }" :class="navLinkStyles"
              >About</router-link
            >

            <router-link :to="{ name: 'my-gallery' }" :class="navLinkStyles"
              >Photos</router-link
            >

            <router-link :to="{ name: 'illustrations' }" :class="navLinkStyles"
              >Illustrations</router-link
            >

            <router-link :to="{ name: 'vectors' }" :class="navLinkStyles"
              >Vectors</router-link
            >

            <router-link :to="{ name: 'music' }" :class="navLinkStyles"
              >Music
            </router-link>
            <router-link :to="{ name: 'effects' }" :class="navLinkStyles"
              >Sound Effects</router-link
            >

            <!--Mobile auth links right side-->
            <div v-if="!userLoggedIn">
              <button
                class="sm:hidden bg-blue-300 hover:bg-blue-500 text-gray-900 font-bold py-2 px-6 mx-1 rounded-lg"
                @click="loginModalVisibility = !loginModalVisibility"
              >
                Login
              </button>
              <button
                class="sm:hidden bg-amber-400 hover:bg-blue-500 text-gray-900 font-bold py-2 px-6 mx-1 rounded-lg"
                @click="registerModalVisibility = !registerModalVisibility"
              >
                Register
              </button>
            </div>
            <div v-else>
              <router-link
                :to="{ name: 'upload' }"
                exact-active-class="no-active"
                class="sm:hidden bg-green-400 hover:bg-green-800 text-white font-bold py-2 px-6 mx-1 rounded-lg"
              >
                Upload
              </router-link>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <login-modal v-if="loginModalVisibility"></login-modal>
      </transition>

      <transition name="fade">
        <register-modal v-if="registerModalVisibility"></register-modal>
      </transition>
    </nav>
  </div>
</template>

<script>
import { mapWritableState, mapActions } from "pinia";
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";
import LoginModal from "./LoginModal.vue";
import RegisterModal from "./RegisterModal.vue";
import { auth } from "@/includes/firebase";
export default {
  name: "AppNav",
  data() {
    return {
      mainDropDown: false,
      subDropDown: false,
      navLinkStyles:
        "text-gray-800 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium",
    };
  },
  components: {
    LoginModal,
    RegisterModal,
  },
  methods: {
    ...mapActions(useUserStore, ["signUserOut", "authenticate"]),
    async logOut() {
      try {
        await this.signUserOut();
        //redirect the user away from an auth required page
        if (this.$route.meta.requiresAuth) {
          this.$router.push({ name: "home" });
        }
      } catch (error) {
        console.log("Sorry Something Went  Wrong!");
      }
    },
  },
  computed: {
    ...mapWritableState(useModalStore, {
      loginModalVisibility: "loginModal",
      registerModalVisibility: "registerModal",
    }),
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  beforeRouteEnter(to, from, next) {
    this.mainDropDown = false;
    this.subDropDown = false;
    next();
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.menu-enter-from,
.menu-leave-to {
  height: 0px;
}

.menu-enter-to,
.menu-leave-from {
  height: 400px;
}

.menu-enter-active,
.menu-leave-active {
  transition: height 0.4s linear;
}
</style>
