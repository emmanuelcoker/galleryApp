<template>
  <div class="columns-2 md:columns-3 lg:columns-4">
    <gallery-item
      class="cursor-pointer"
      v-for="image in images"
      :key="image.id"
      :image="image"
    ></gallery-item>
  </div>
</template>

<script>
import { photos_configuration, configuration } from "@/includes/unsplash";
import GalleryItem from "@/components/GalleryItem.vue";

export default {
  name: "HomeGallery",
  components: {
    GalleryItem,
  },
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
