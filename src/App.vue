<template>
  <app-nav></app-nav>
  <router-view></router-view>
  <app-footer></app-footer>
</template>

<script>
import AppNav from "@/components/AppNav.vue";
import AppFooter from "@/components/AppFooter.vue";
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import { auth } from "@/includes/firebase";

export default {
  name: "App",
  components: {
    AppNav,
    AppFooter,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>

<style></style>
