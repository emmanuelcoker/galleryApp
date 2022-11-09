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
import GalleryItem from "@/components/GalleryItem.vue";
import useImageStore from "@/stores/image";
import { mapWritableState } from "pinia";

export default {
  name: "HomeGallery",
  props: {
    images: {
      type: Array,
      required: true,
    },
    handleImage: {
      type: Function,
    },
  },
  components: {
    GalleryItem,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapWritableState(useImageStore, ["images"]),
  },
  created() {
    if (this.images.length == 0) {
      this.handleImage();
    }
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
