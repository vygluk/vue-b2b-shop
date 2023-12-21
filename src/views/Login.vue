<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-semibold text-center text-gray-800 mb-8">Login</h1>
      <form @submit.prevent="submitLogin">
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-600" for="username">Email</label>
          <input class="block w-full px-4 py-3 mb-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring focus:ring-opacity-40 focus:ring-blue-500 focus:outline-none" type="text" id="email" v-model="credentials.email" required>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-600" for="password">Password</label>
          <input class="block w-full px-4 py-3 mb-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring focus:ring-opacity-40 focus:ring-blue-500 focus:outline-none" type="password" id="password" v-model="credentials.password" required>
        </div>
        <button type="submit" class="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Log In
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { authState } from '../state/authState';

const credentials = ref({ email: '', password: '' });
const router = useRouter();

const submitLogin = async () => {
  try {
    const response = await axios.post('http://34.145.105.9/api/login', credentials.value);
    localStorage.setItem('access_token', response.data.token);
    console.log('Login successful:', response.data.token);
    authState.isLoggedIn = true;
    router.push({ name: 'dashboard' });
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
};

</script>
