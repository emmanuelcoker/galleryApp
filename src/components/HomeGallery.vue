<template>
  <div class="columns-2 md:columns-3 lg:columns-4">
    <div
      v-for="image in images"
      :key="image.id"
      class="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20"
    >
      <img
        class="w-full rounded-md"
        :src="image.image_url"
        :style="{
          backgroundColor: image.color,
        }"
      />
      <div class="test__body absolute inset-0 p-8 text-white flex flex-col">
        <div class="relative">
          <a class="test__link absolute inset-0" target="_blank" href="/"></a>
          <h1 class="test__title text-3xl font-bold mb-3">
            {{ image.description }}
          </h1>
          <p class="test__author font-sm font-light">{{ image.author }}</p>
        </div>
        <div class="mt-auto">
          <span
            class="test__tag bg-white bg-opacity-60 py-1 px-4 rounded-md text-black"
            >{{ image.likes }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { photos_configuration, configuration } from "@/includes/unsplash";

export default {
  name: "HomeGallery",
  data() {
    return {
      show: "",
      images: [],
      show_per_page: 10,
      pending_requests: false,
      current_page: 1,
    };
  },
  methods: {
    async handleImage() {
      if (this.pending_requests) {
        return;
      }

      let snapshots;

      if (this.images.length) {
        this.pending_requests = true;
        configuration.per_page = this.show_per_page;
        configuration.page = this.current_page++;
      } else {
        configuration.page = this.current_page;
      }

      snapshots = await fetch(`${photos_configuration.getUrl()}`).then(
        (response) => response.json()
      );

      snapshots.forEach((item) => {
        const image = {
          id: item.id,
          width: item.width,
          height: item.height,
          image_url: item.urls.full,
          likes: item.likes,
          color: item.color,
          liked_by_user: item.liked_by_user,
          author: item.user.first_name,
        };
        this.images.push(image);
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
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {
    this.handleImage();
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.slide-in-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-in-enter-to {
  transform: translateY(0px);
  opacity: 1;
}

.slide-in-enter-active {
  transition: all 0.3s linear;
}
</style>
