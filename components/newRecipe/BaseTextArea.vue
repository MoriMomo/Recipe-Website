<template>
  <div class="mb-3">
    <slot></slot>
    <textarea class="form-control" rows="4"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String,
      default: "",
    },
  },
};
</script>

<style>
</style>