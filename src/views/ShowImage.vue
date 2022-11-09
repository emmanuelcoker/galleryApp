<template>
  <div>
    Show Image

    <img :src="image.image_url" alt="slglfdglgd" />
  </div>
</template>

<script>
import { photos_configuration } from "@/includes/unsplash";

export default {
  name: "ShowImage",
  data() {
    return {
      image: {},
    };
  },
  methods: {
    async getImage() {
      //get image using the route param id
      let snapshot;
      try {
        snapshot = await fetch(
          `${photos_configuration.search(this.$route.params.id)}`
        ).then((response) => response.json());
      } catch (error) {
        console.log(error);
      }

      this.image.id = snapshot.id;
      this.image.width = snapshot.width;
      this.image.height = snapshot.height;
      this.image.image_url = snapshot.urls.full;
      this.image.likes = snapshot.likes;
      this.image.color = snapshot.color;
      this.image.liked_by_user = snapshot.liked_by_user;
      this.image.author = snapshot.user.first_name;
    },
  },
  created() {
    this.getImage();
  },
};
</script>

<style></style>
