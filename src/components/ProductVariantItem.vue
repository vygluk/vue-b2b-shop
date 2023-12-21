<template>
  <div class="bg-white shadow rounded-xl hover:scale-105 transition-all">
    <div class="p-3">
      <!-- Image container -->
      <div class="image-container mb-4">
        <!-- Adjusted image to fit within its container -->
        <img src="/tshirt.png" alt="Product Image" class="object-contain w-full h-48 rounded" />
      </div>
      <!-- Details container -->
      <div class="font-bold">
        <div>Code: {{ variant.code }}</div>
        <div>Price: {{ variant.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  variant: Object
});
</script>

<style scoped>
.image-container {
  height: 200px; /* Adjust the height as needed */
  max-width: 100%;
}

img {
  max-height: 100%; /* Ensure the image fits in the container */
}
</style>
