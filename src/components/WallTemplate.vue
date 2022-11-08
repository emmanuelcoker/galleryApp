<template>
  <div class="relative w-full h-[70vh] md:h-[90vh]">
    <slot name="wallImg"></slot>

    <div
      class="flex flex-col justify-center align-items-center h-full w-full px-5 brightness-200"
    >
      <slot name="main-title"></slot>
      <slot name="sub-title"></slot>

      <div class="w-full text-center">
        <vee-form
          class="outline-0 border-0 flex justify-center align-items-center"
        >
          <div class="relative w-full max-w-4xl">
            <slot name="search-field"></slot>
            <slot name="search-icon"></slot>
          </div>
        </vee-form>

        <div class="mx-auto text-center max-w-4xl">
          <slot name="smaller-text"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WallTemplate",
};
</script>

<style></style>
