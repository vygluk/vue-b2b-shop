<template>
  <footer class="footer bg-blue-500 text-white py-4">
    <div class="container mx-auto px-4 text-center">
      <p>&copy; {{ currentYear }} B2B Shop. All rights reserved.</p>
      <p>
        Follow us on social media.
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" class="text-white hover:underline">
          Instagram
        </a>
      </p>
      <!-- You can also add other social media links here -->
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentYear = ref(new Date().getFullYear());

onMounted(() => {
  currentYear.value = new Date().getFullYear();
});
</script>

<style scoped>
.footer {
  /* Footer styles */
}
</style>
