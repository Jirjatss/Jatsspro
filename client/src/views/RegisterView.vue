<script>
import { mapActions } from "pinia";
import { useUserStore } from "../stores/user";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(useUserStore, ["registerHandler"]),
    registerComponent() {
      const input = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.registerHandler(input);
    },
  },
};
</script>
<template>
  <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
    <div class="flex shadow-md">
      <div class="flex flex-wrap content-center justify-center rounded-l-md bg-white m-auto p-16">
        <div class="w-96">
          <h1 class="text-xl font-semibold text-center">Welcome to JatssPro</h1>
          <p class="text-gray-400 text-center text">Sign Up! To get access</p>
          <form class="mt-4" @submit.prevent="registerComponent">
            <div class="mb-3">
              <label class="mb-2 block text-xs font-semibold">Username</label>
              <input
                type="text"
                placeholder="Username"
                class="w-full bg-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 px-3 text-gray-500 text-md"
                v-model="username"
              />
            </div>
            <div class="mb-3">
              <label class="mb-2 block text-xs font-semibold">Email</label>
              <input type="email" placeholder="Email" class="w-full bg-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 px-3 text-gray-500 text-md" v-model="email" />
            </div>
            <div class="mb-3">
              <label class="mb-2 block text-xs font-semibold">Password</label>
              <input
                type="password"
                placeholder="*****"
                class="w-full bg-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 px-3 text-gray-500 text-md"
                v-model="password"
              />
            </div>

            <div class="mb-3">
              <button class="mb-1.5 block w-full text-center text-white bg-primary px-2 py-2.5 rounded-md">Sign up</button>
            </div>
          </form>
          <div class="text-center">
            <span class="text-xs text-gray-400 font-semibold">Don't have account? </span>
            <router-link to="/login" class="text-xs font-semibold text-purple-700">Sign In</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
