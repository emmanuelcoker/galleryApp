<template>
  <wall-template @search="search">
    <template v-slot:wallImg>
      <img
        src="@/assets/mountains.jpg"
        class="absolute brightness-75 bg-center bg-no-repeat bg-cover w-full h-[70vh] md:h-[90vh] z-0"
        alt="background wallpaper"
      />
    </template>

    <template v-slot:main-title>
      <div class="text-white font-bold">
        <p
          class="text-2xl md:text-4xl md:my-2 text-center opacity-100 font-sans leading-9"
        >
          Stunning Free Images and Royalty Free Stock
        </p>
      </div>
    </template>

    <template v-slot:sub-title>
      <div class="text-white">
        <p
          class="text-lg md:text-xl text-center opacity-100 font-serif leading-5 mt-2 md:my-4"
        >
          Over 2.7 million+ high quality stock images, videos and music shared
          by our talented community.
        </p>
      </div>
    </template>

    <template v-slot:search-field>
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >Search</label
      >
      <div class="relative">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <vee-field
          type="search"
          name="search"
          id="default-search"
          class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
          autocomplete="off"
        />
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </template>

    <!-- <template v-slot:search-icon>
      <i class="absolute text-gray-600 top-7 right-5 fa fa-search text-xl"></i>
    </template> -->

    <template v-slot:smaller-text>
      <p class="text-md md:text-lg text-gray-300 font-sans leading-5 mt-2">
        Popular Images: nature, wallpaper, halloween, background, sky, sky
        cloud, cat, christmas, food, diwali, dog, money, iphone wallpaper
      </p>
    </template>
  </wall-template>
</template>

<script>
import WallTemplate from "./WallTemplate.vue";
import { mapActions } from "pinia";
import useImageStore from "@/stores/image";

export default {
  name: "AppWallBanner",
  components: {
    WallTemplate,
  },
  data() {
    return {};
  },

  methods: {
    ...mapActions(useImageStore, ["searchImage"]),
    async search(value) {
      await this.searchImage(value);
      this.$router.push({ name: "search", params: { query: value.search } });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: rgb(53, 48, 48);
  font-weight: 700;
  font-family: sans-serif;
  opacity: 1; /* Firefox */
}
</style>
