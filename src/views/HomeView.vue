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
  <home-gallery></home-gallery>
</template>

<script>
import AppWallBanner from "@/components/AppWallBanner.vue";
import HomeGallery from "@/components/HomeGallery.vue";
export default {
  name: "HomeView",
  components: {
    AppWallBanner,
    HomeGallery,
  },
};
</script>

<style></style>
