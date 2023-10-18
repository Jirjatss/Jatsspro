<script>
export default {
  props: ["mentor"],
  data() {
    return {
      achievments: [],
    };
  },

  created() {
    this.achievments = this.mentor.achievment.split(",");
  },
};
</script>

<template>
  <div class="card w-full bg-transparent text-black cursor-pointer">
    <figure>
      <img :src="mentor.image" :alt="mentor.name" class="md:w-56 md:h-56 w-72 h-72" />
    </figure>
    <div class="card-body bg-[#ffb701] py-4 rounded-xl">
      <p class="card-title text-xl mx-auto">{{ mentor.name }}</p>
      <div class="flex flex-wrap gap-2">
        <span class="mb-2" v-for="(course, index) in this.mentor.Courses" :key="index">{{ course.name }}</span>
      </div>

      <div class="text-justify">
        <p class="text-center mb-2 flex" v-for="(achievment, index) in achievments" :key="index">
          <span class="material-symbols-outlined me-2">verified</span>
          {{ achievment }}
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
