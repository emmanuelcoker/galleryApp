<template>
  <div class="w-4/5 mx-auto md:max-w-72 mx-auto text-center mt-10">
    <button
      @click="$emit('discover-more')"
      type="button"
      class="bg-green-500 text-white rounded-2xl px-12 py-3 w-64"
    >
      Discover more
    </button>
  </div>
</template>

<script>
export default {
  name: "DiscoverMore",
  emits: ["discover-more"],
};
</script>

<style></style>
