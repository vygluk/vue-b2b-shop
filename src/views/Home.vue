<template>
  <div class="pt-20 p-8 pb-0 text-blue-500"> <!-- pt-20 (or 5rem) to give enough space for the fixed navbar -->
    <h1 class="text-4xl font-bold mb-4">Available products</h1>
  </div>
  <Variants />
</template>

<script setup>
import Variants from "../components/ProductVariant.vue";
</script>
