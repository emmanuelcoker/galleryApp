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
    <home-gallery
      :images="searchContent"
      :handleImage="handleImage"
    ></home-gallery>
  </keep-alive>
</template>

<script>
import AppWallBanner from "@/components/AppWallBanner.vue";
import HomeGallery from "@/components/HomeGallery.vue";
import { configuration } from "@/includes/unsplash";
import { mapActions, mapWritableState } from "pinia";
import useImageStore from "@/stores/image";

export default {
  name: "HomeView",
  data() {
    return {
      show_per_page: 10,
      pending_requests: false,
      current_page: 1,
    };
  },
  methods: {
    ...mapActions(useImageStore, ["loadSearchContent"]),
    async handleImage() {
      if (this.pending_requests) {
        return;
      }

      if (this.searchContent.length > 0) {
        this.pending_requests = true;
        configuration.per_page = this.show_per_page;
        configuration.page = this.current_page++;
      } else {
        configuration.page = this.current_page;
      }

      await this.loadSearchContent(this.search_val);
      this.pending_requests = false;
      // console.log(this.images);
    },
  },
  computed: {
    ...mapWritableState(useImageStore, [
      "searchImage",
      "searchContent",
      "search_val",
    ]),
  },
  components: {
    AppWallBanner,
    HomeGallery,
  },

  async created() {
    if (this.searchContent == 0) {
      await this.handleImage();
    }
  },
};
</script>

<style></style>
