<script>
export default {
  props: ["mentor"],
};
</script>

<template>
  <div class="card w-72 bg-white shadow-xl">
    <figure><img :src="mentor.image" alt="mentor.name" class="w-44 h-44" /></figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ mentor.name }}
      </h2>
      <div class="flex flex-wrap gap-2">
        <span class="mb-2" v-for="(course, index) in this.mentor.Courses" :key="index">{{ course.name }}</span>
      </div>
    </div>
    <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-b-lg"></span>
  </div>
</template>

<style></style>
