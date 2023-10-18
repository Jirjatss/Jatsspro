<template>
  <div class="lg:flex justify-between items-center mb-6 px-7">
    <p class="text-2xl font-semibold mb-2 lg:mb-0">Welcome Back, {{ username }}!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.username = localStorage.username;
  },
};
</script>

<style></style>
