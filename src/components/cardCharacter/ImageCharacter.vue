<template>
  <div class="card__img">
    <img :src="image" alt="Avatar" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
}>();
</script>

<style lang="scss" scoped>
.card__img {
  flex: 2 1 0%;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    margin: 0px;
    opacity: 1;
    transition: opacity 0.5s ease 0s;
    object-position: center center;
    object-fit: cover;
  }
}
</style>
