import { defineStore } from "pinia";
import { photos_configuration } from "@/includes/unsplash";
import { auth, favouritesCollection } from "@/includes/firebase";

export default defineStore("image", {
  state: () => ({
    images: [],
    favourites: [],
  }),
  actions: {
    async getImage() {
      let snapshots;
      let images = [];

      snapshots = await fetch(`${photos_configuration.getUrl()}`).then(
        (response) => response.json()
      );

      //get all user favourites if logged in
      let favourites;
      if (auth.currentUser) {
        favourites = await this.getFavourites();
      }
      snapshots.forEach((item) => {
        let image = {
          id: item.id,
          width: item.width,
          height: item.height,
          image_url: item.urls.full,
          likes: item.likes,
          color: item.color,
          liked_by_user: item.liked_by_user,
          author: item.user.first_name,
          text_color: "black",
        };

        favourites.forEach((fav) => {
          if (fav.id === item.id) {
            image.text_color = "red";
            return;
          }
        });

        images.push(image);
      });

      return images;
    },

    async getFavourites() {
      let snapshots;
      let images = [];

      snapshots = await favouritesCollection
        .where("uid", "==", auth.currentUser.uid)
        .get();

      snapshots.forEach((document) => {
        const image = {
          ...document.data(),
          text_color: "text-white",
          docID: document.id,
        };
        images.push(image);
      });
      return images;
    },
  },
});
