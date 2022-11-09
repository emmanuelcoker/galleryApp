<template>
  <router-link :to="{ name: 'show-image', params: { id: image.id } }">
    <div
      class="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20"
      @mouseover="tagVisibility = true"
      @mouseleave="tagVisibility = false"
    >
      <img
        class="w-full rounded-md"
        :src="image.image_url"
        :style="{
          backgroundColor: image.color,
        }"
      />

      <transition name="slide-in" mode="out-in">
        <div
          v-if="tagVisibility"
          class="test__body absolute top-2 right-2 p-3 text-white flex flex-col"
        >
          <div class="mt-auto flex flex-row justify-between items-center">
            <span
              @click.stop.prevent="addToFavourite(image)"
              :disabled="image.text_color === 'red'"
              class="test__tag bg-white cursor-pointer z-10 bg-opacity-60 w-auto py-1 px-2 sm:py-1 sm:px-2 rounded-md text-black mr-2"
              ><i
                class="fa fa-heart cursor-pointer"
                :class="{ 'text-red-600': likeStatus }"
                :style="{
                  color: image.text_color,
                }"
              ></i
            ></span>
            <span
              class="test__tag bg-white cursor-pointer z-10 bg-opacity-60 w-auto flex flex-row justify-between items-center px-2 py-2 sm:py-2 sm:px-2 rounded-md text-black"
              ><i class="fa fa-plus cursor-pointer"></i
            ></span>
          </div>
        </div>
      </transition>

      <transition name="slide-in" mode="out-in">
        <div
          v-if="tagVisibility"
          class="test__body absolute inset-0 p-3 text-white flex flex-col"
        >
          <div class="mt-auto flex flex-row justify-between items-center">
            <span
              class="test__tag bg-white bg-opacity-60 w-auto py-1 px-2 sm:py-1 sm:px-2 rounded-md text-black mr-2"
              >{{ image.author }}</span
            >
            <span
              class="test__tag bg-white bg-opacity-60 w-auto flex flex-row justify-between items-center px-2 py-1 sm:py-1 sm:px-4 rounded-md text-black"
              ><i class="fa fa-heart"></i> {{ image.likes }}</span
            >
          </div>
        </div>
      </transition>
    </div>
  </router-link>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import useImageStore from "@/stores/image";

export default {
  name: "GalleryItem",
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tagVisibility: false,
      likeStatus: false,
    };
  },
  methods: {
    ...mapActions(useImageStore, ["addFavourite"]),
    async addToFavourite(image) {
      await this.addFavourite(image);
    },
  },
};
</script>

<style scoped>
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateY(0px);
  opacity: 1;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s linear;
}
</style>
