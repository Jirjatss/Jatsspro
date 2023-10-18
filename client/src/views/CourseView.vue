<script>
import { mapActions, mapWritableState } from "pinia";
import CardCourseAdmin from "../components/card/CardCourseAdmin.vue";
import SidebarVue from "../components/layout/Sidebar.vue";
import { useUserStore } from "../stores/user";
import Masthead from "../components/Masthead.vue";

export default {
  components: {
    SidebarVue,
    CardCourseAdmin,
    Masthead,
  },
  computed: {
    ...mapWritableState(useUserStore, ["courses"]),
  },
  methods: {
    ...mapActions(useUserStore, ["getCourse"]),
  },
  created() {
    this.getCourse();
  },
};
</script>

<template>
  <div>
    <SidebarVue />
    <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen py-10 card-mentor bg-cover">
      <Masthead />
      <div class="flex flex-wrap gap-6 px-5">
        <CardCourseAdmin v-for="course in courses" :key="course.id" :course="course" />
      </div>
    </div>
  </div>
</template>

<style></style>
