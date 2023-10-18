<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "../stores/user";
import CardMentorAdmin from "../components/card/CardMentorAdmin.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import MastheadVue from "../components/Masthead.vue";

export default {
  components: {
    CardMentorAdmin,
    Sidebar,
    MastheadVue,
  },
  computed: {
    ...mapState(useUserStore, ["mentors"]),
  },
  methods: {
    ...mapActions(useUserStore, ["getMentor"]),
  },
  created() {
    this.getMentor();
  },
};
</script>

<template>
  <div>
    <Sidebar />
    <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen py-10 card-mentor bg-cover">
      <MastheadVue />
      <div class="grid grid-cols-4 px-6">
        <CardMentorAdmin v-for="mentor in mentors" :key="mentor.id" :mentor="mentor" />
      </div>
    </div>
  </div>
</template>

<style></style>
