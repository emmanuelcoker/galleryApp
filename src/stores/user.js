import { defineStore } from "pinia";
import { auth, userCollection } from "@/includes/firebase.js";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      await userCollection.doc(userCred.user.uid).set({
        username: values.username,
        email: values.email,
      });

      this.userLoggedIn = true;
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      this.userLoggedIn = true;
    },

    async signUserOut() {
      await auth.signOut();
      this.userLoggedIn = false;
    },
  },
});
