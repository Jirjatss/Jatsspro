<script>
import { mapActions, mapWritableState } from "pinia";
import { useUserStore } from "../stores/user";
import Navbar from "../components/layout/Navbar.vue";
import CardMyCourse from "../components/card/CardMyCourse.vue";

export default {
  components: {
    Navbar,
    CardMyCourse,
  },
  computed: {
    ...mapWritableState(useUserStore, ["myCourses"]),
  },
  methods: {
    ...mapActions(useUserStore, ["getMyCourse"]),
  },
  created() {
    this.getMyCourse();
  },
};
</script>

<template>
  <div>
    <Navbar />
    <div class="card-mentor min-h-screen py-28 px-16 flex">
      <div class="flex flex-wrap justify-center gap-5 m-auto" v-if="myCourses">
        <CardMyCourse v-for="course in myCourses" :key="course.id" :course="course" />
      </div>
    </div>
  </div>
</template>

<style></style>
