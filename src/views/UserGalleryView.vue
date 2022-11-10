<template>
  <wall-template>
    <template v-slot:wallImg>
      <img
        src="@/assets/flowers.jpg"
        class="absolute brightness-75 bg-center left-0 right-0 top-0 bottom-0 bg-no-repeat bg-cover w-full h-[70vh] md:h-[90vh] z-0"
        alt="background wallpaper"
      />
    </template>

    <template v-slot:main-title>
      <div class="text-white font-bold">
        <p
          class="text-2xl md:text-4xl md:my-2 text-center opacity-100 font-sans leading-9"
        >
          Stunning free stock photos for download
        </p>
      </div>
    </template>

    <template v-slot:sub-title>
      <div class="text-white">
        <p
          class="text-lg md:text-xl text-center opacity-100 font-serif leading-5 mt-2 md:my-4"
        >
          Over 2.3 million+ royalty free stock photos shared by our talented
          community.
        </p>
      </div>
    </template>

    <template v-slot:search-field>
      <vee-field
        name="search"
        type="text"
        class="p-4 px-5 mt-3 opacity-100 w-full text-gray-700 bg-white rounded-lg"
        placeholder="Search images, vectors, videos and music"
      />
    </template>

    <template v-slot:search-icon>
      <i class="absolute text-gray-600 top-7 right-5 fa fa-search text-xl"></i>
    </template>

    <template v-slot:smaller-text>
      <p class="text-md md:text-lg text-gray-300 font-sans leading-5 mt-2">
        Popular Images: nature, wallpaper, halloween, background, sky, sky
        cloud, cat, christmas, food, diwali, dog, money, iphone wallpaper
      </p>
    </template>
  </wall-template>

  <div
    v-show="favourites.length > 0"
    class="w-full flex flex-col justify-center align-items-center py-7"
  >
    <p
      class="mx-auto text-2xl font-bold sm:text-4xl font-sans text-gray-900 text-center"
    >
      Your Liked Pictures
    </p>
    <span
      class="mx-auto text-sm sm:text-lg text-center font-sans text-gray-700 mt-2"
      >Checkout new pictures uploaded around the world</span
    >
  </div>

  <home-gallery
    :images="favourites"
    :handleImage="handleFavourites"
  ></home-gallery>

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

  <home-gallery :images="images" :handleImage="handleImage"></home-gallery>
</template>

<script>
import HomeGallery from "../components/HomeGallery.vue";
import WallTemplate from "../components/WallTemplate.vue";
import { mapActions, mapWritableState } from "pinia";
import { configuration } from "@/includes/unsplash";
import useImageStore from "@/stores/image";

export default {
  name: "UserGalleryView",
  components: {
    HomeGallery,
    WallTemplate,
  },
  data() {
    return {
      show_per_page: 10,
      pending_requests: false,
      current_page: 1,
    };
  },
  methods: {
    ...mapActions(useImageStore, ["getFavourites", "getImage"]),
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

      await this.getImage();

      this.pending_requests = false;
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

    async handleFavourites() {
      if (this.pending_requests) {
        return;
      }

      if (this.favourites.length) {
        this.pending_requests = true;
      }
      await this.getFavourites();
      // snapshots.forEach((item) => {
      //   this.favourites.push(item);
      // });

      this.pending_requests = false;
    },
  },

  computed: {
    ...mapWritableState(useImageStore, ["images", "favourites"]),
  },
};
</script>

<style></style>
