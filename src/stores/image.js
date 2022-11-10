import { defineStore } from "pinia";
import { photos_configuration } from "@/includes/unsplash";
import {
  auth,
  favouritesCollection,
  imageCollection,
} from "@/includes/firebase";

export default defineStore("image", {
  state: () => ({
    images: [],
    favourites: [],
    uploadedImages: [],
  }),
  actions: {
    async getImage() {
      let snapshots;

      snapshots = await fetch(`${photos_configuration.getUrl()}`).then(
        (response) => response.json()
      );

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
        };

        if (this.favourites.find((fav) => fav.id == item.id)) {
          image.text_color = "red";
        } else {
          image.text_color = "black";
        }

        this.images.push(image);
      });
    },

    async getFavourites() {
      let snapshots;
      snapshots = await favouritesCollection
        .where("uid", "==", auth.currentUser.uid)
        .get();

      snapshots.forEach((document) => {
        const image = {
          ...document.data(),
          text_color: "red",
          docID: document.id,
        };

        this.favourites.push(image);
      });
    },

    async addFavourite(image) {
      try {
        const imageToUpload = {
          ...image,
          uid: auth.currentUser.uid,
          text_color: "red",
        };

        //push to the list if only the image doesnt already exist
        if (this.favourites.find((fav) => fav.id === imageToUpload.id)) {
          await favouritesCollection.doc(imageToUpload.docID).delete();

          let objIndex = this.favourites.findIndex(
            (fav) => fav.id == imageToUpload.id
          );
          this.favourites.splice(objIndex, 1);
          return;
        }

        let imageToAdd = await favouritesCollection.doc();
        imageToAdd.set({ ...imageToUpload, docID: imageToAdd.id });
        this.favourites.push(imageToUpload);
        //update the value of the item in the image list
        let objIndex = this.images.findIndex(
          (fav) => fav.id == imageToUpload.id
        );

        this.images[objIndex].text_color = "red";
      } catch (error) {
        console.log(error);
      }
    },

    async getUploadedImages() {
      try {
        let snapshots;
        snapshots = await imageCollection
          .where("uid", "==", auth.currentUser.uid)
          .get();

        snapshots.forEach((document) => {
          const image = {
            ...document.data(),
            text_color: "red",
            docID: document.id,
          };
          this.uploadedImages.push(image);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
