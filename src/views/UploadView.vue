<template>
  <div
    @drag.prevent.stop=""
    @dragstart.prevent.stop=""
    @dragenter.prevent.stop="is_dragover = true"
    @dragover.prevent.stop="is_dragover = true"
    @dragleave.prevent.stop="is_dragover = false"
    @dragend.prevent.stop="is_dragover = false"
    @drop.prevent.stop="upload($event)"
    class="w-full px-10 py-20 h-[15rem] rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
    :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
  >
    <p class="my-auto">Drag and Drop Files Here</p>
  </div>
  <div v-for="upload in uploads" class="mb-4" :key="upload.name">
    <!-- File Name -->
    <div class="font-bold text-sm" :class="upload.text_class">
      <i :class="upload.icon"></i>
      {{ upload.name }}
    </div>
    <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
      <!-- Inner Progress Bar -->
      <div
        class="transition-all progress-bar bg-blue-400"
        :class="upload.variant"
        :style="{ width: upload.curr_progress + '%' }"
      ></div>
    </div>
  </div>

  <div class="w-full flex flex-col justify-center align-items-center py-7">
    <p
      class="mx-auto text-2xl font-bold sm:text-4xl font-sans text-gray-900 text-center"
    >
      Your Uploads
    </p>
    <span
      class="mx-auto text-sm sm:text-lg text-center font-sans text-gray-700 mt-2"
      >Checkout new pictures uploaded around the world</span
    >
  </div>

  <home-gallery
    :images="uploadedImages"
    :handleImage="handleImage"
  ></home-gallery>
</template>

<script>
import { auth, storage, imageCollection } from "@/includes/firebase";
import { mapActions, mapWritableState } from "pinia";
import useImageStore from "@/stores/image";
import HomeGallery from "../components/HomeGallery.vue";
export default {
  name: "UploadView",
  components: {
    HomeGallery,
  },
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  methods: {
    ...mapActions(useImageStore, ["getUploadedImages"]),
    async handleImage() {
      await this.getUploadedImages();
    },

    upload($event) {
      this.is_dragover = false;
      const files = [...$event.dataTransfer.files];

      files.forEach((file) => {
        //verify the file type on client side
        // if (file.type !== "image/jpg" || file.type !== "image/png") {
        //   return;
        // }

        //create a storage reference
        const storageRef = storage.ref();

        //create the image folder in the the db
        const imagesRef = storageRef.child(`images/${file.name}`);

        const task = imagesRef.put(file);

        const uploadIndex =
          this.uploads.push({
            task,
            curr_progress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;

        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].curr_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].text_class = "text-red-400";
            console.log(error);
          },
          async () => {
            const image = {
              uid: auth.currentUser.uid,
              author: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              likes: 0,
            };

            //add image download url
            image.image_url = await task.snapshot.ref.getDownloadURL();
            //get image

            let imgRef = await imageCollection.doc();
            let imgDetails = { ...image, id: imgRef.id };
            imgRef.set(imgDetails);

            this.uploadedImages.push(imgDetails);

            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_class = "text-green-400";
          }
        );
      });
      // console.log(files);
    },
  },
  computed: {
    ...mapWritableState(useImageStore, ["uploadedImages"]),
  },
};
</script>

<style></style>
