<template>
  <wall-template>
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
</template>

<script>
import WallTemplate from "./WallTemplate.vue";
export default {
  name: "AppWallBanner",
  components: {
    WallTemplate,
  },
  data() {
    return {};
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
