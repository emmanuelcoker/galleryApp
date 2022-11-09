<template>
  <app-wall-banner></app-wall-banner>
  <div class="w-full flex flex-col justify-center align-items-center py-7">
    <p
      class="mx-auto text-2xl font-bold sm:text-4xl font-sans text-gray-900 text-center"
    >
      Create and Share New Memories
    </p>
    <span
      class="mx-auto text-sm sm:text-lg text-center font-sans text-gray-700 mt-2"
      >Checkout new pictures uploaded around the world</span
    >
  </div>
  <keep-alive>
    <home-gallery :images="images" :handleImage="handleImage"></home-gallery>
  </keep-alive>
</template>

<script>
import AppWallBanner from "@/components/AppWallBanner.vue";
import HomeGallery from "@/components/HomeGallery.vue";
import { configuration } from "@/includes/unsplash";
import { mapActions } from "pinia";
import useImageStore from "@/stores/image";

export default {
  name: "HomeView",
  data() {
    return {
      images: [],
      show_per_page: 10,
      pending_requests: false,
      current_page: 1,
    };
  },
  methods: {
    ...mapActions(useImageStore, ["getImage"]),
    async handleImage() {
      if (this.pending_requests) {
        return;
      }

      if (this.images.length) {
        this.pending_requests = true;
        configuration.per_page = this.show_per_page;
        configuration.page = this.current_page++;
      } else {
        configuration.page = this.current_page;
      }
      const imageSnapshots = await this.getImage();
      imageSnapshots.forEach((item) => {
        this.images.push(item);
      });

      this.pending_requests = false;
      // console.log(this.images);
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;

      let top = Math.round(scrollTop) + innerHeight;
      let percentage = (top / offsetHeight) * 100;

      if (percentage > 80 && percentage < 90) {
        this.handleImage();
      }
    },
  },
  components: {
    AppWallBanner,
    HomeGallery,
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style></style>
