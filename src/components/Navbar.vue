<template>
  <header class="bg-white shadow flex justify-between items-center px-5 h-16 fixed w-full z-20">
    <router-link :to="{ name: 'home' }" class="flex items-center h-full text-blue-500 font-bold">
      <!-- B2B Shop SVG Icon -->
      <img src="/shop.svg" class="mr-2" alt="B2B Shop" width="24" height="24" />
      B2B Shop
    </router-link>
    <nav class="flex items-center gap-1">
      <!-- Desktop Menu Items -->
      <router-link :to="{ name: 'dashboard' }" class="px-2 transition-colors hover:bg-blue-500 hover:text-white hidden md:flex">
        <img src="/dashboard.svg" class="mr-2" alt="Dashboard" width="24" height="24" />
        Dashboard
      </router-link>
      <router-link v-if="!authState.isLoggedIn" :to="{ name: 'login' }" class="px-2 transition-colors hover:bg-blue-500 hover:text-white hidden md:flex">
        <img src="/login.svg" class="mr-2" alt="login" width="24" height="24" />
        Login
      </router-link>
      <button v-if="authState.isLoggedIn" @click="logout" class="px-2 transition-colors hover:bg-blue-500 hover:text-white hidden md:flex">
        <img src="/logout.svg" class="mr-2" alt="logout" width="24" height="24" />
        Logout
      </button>
    </nav>
    <button @click="isMenuOpen = !isMenuOpen" class="md:hidden">
      <!-- Hamburger Icon -->
      <img src="/hamburger.svg" class="mr-2" alt="logout" width="24" height="24" />
    </button>
    <nav v-show="isMenuOpen" class="md:hidden absolute top-full left-0 bg-white w-full z-10">
      <!-- Mobile Menu Items -->
      <router-link
        :to="{ name: 'dashboard' }"
        class="flex items-center px-2 py-1 transition-colors hover:bg-blue-500 hover:text-white"
      >
        <img src="/dashboard.svg" class="mr-2" alt="Dashboard" width="24" height="24" />
        Dashboard
      </router-link>

      <router-link
        v-if="!authState.isLoggedIn"
        :to="{ name: 'login' }"
        class="flex items-center px-2 py-1 transition-colors hover:bg-blue-500 hover:text-white"
      >
        <img src="/login.svg" class="mr-2" alt="Login" width="24" height="24" />
        Login
      </router-link>
      <button
        v-if="authState.isLoggedIn"
        @click="logout"
        class="flex items-center px-2 py-1 transition-colors hover:bg-blue-500 hover:text-white"
      >
        <img src="/logout.svg" class="mr-2" alt="Logout" width="24" height="24" />
        Logout
      </button>

    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';
import { authState } from '../state/authState';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const isMenuOpen = ref(false);

    const logout = () => {
      localStorage.removeItem('access_token');
      authState.isLoggedIn = false;
      isMenuOpen.value = false;
      router.push({ name: 'home' });
    };

    return { authState, logout, isMenuOpen };
  }
};
</script>

<style>
/* Add your CSS styles here */
@media (min-width: 768px) {
  .menu {
    display: none;
  }
}

body {
  padding-top: 4rem; /* This is approximate, adjust to match the header height */
}
</style>
