<script>
import { mapActions, mapWritableState } from "pinia";
import SidebarVue from "../components/layout/Sidebar.vue";
import { useUserStore } from "../stores/user";

export default {
  components: {
    SidebarVue,
  },
  data() {
    return {
      name: "",
      agenda: "",
      topic: "",
      start_time: "",
      duration: "",
      imageUrl: "",
      price: "",
      MentorId: 0,
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["mentors"]),
  },
  methods: {
    ...mapActions(useUserStore, ["addCourse", "getMentor"]),
    addCourseComponent() {
      const input = {
        name: this.name,
        agenda: this.agenda,
        topic: this.topic,
        start_time: this.start_time,
        duration: this.duration,
        imageUrl: this.imageUrl,
        price: this.price,
        MentorId: this.MentorId,
      };
      this.addCourse(input);
    },
  },
  created() {
    this.getMentor();
  },
};
</script>

<template>
  <div>
    <SidebarVue />
    <div class="w-full pl-0 lg:pl-64 min-h-screen py-10 card-mentor bg-cover">
      <div class="flex flex-wrap rounded-l-md px-16">
        <div class="w-[34rem] p-6 px-10 bg-white shadow-xl rounded">
          <h1 class="text-xl font-semibold text-center">Create new Course</h1>

          <p class="text-gray-400 text-center text">Please enter course details</p>

          <form @submit.prevent="addCourseComponent" enctype="multipart/form-data" class="mt-7">
            <div class="mb-3">
              <label class="mb-2 block text-sm font-semibold">Name</label>
              <input
                type="text"
                placeholder="Javascript"
                class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                v-model="name"
              />
            </div>

            <div class="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Agenda</label>
                <input
                  type="text"
                  placeholder="Belajar JS"
                  class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                  v-model="agenda"
                />
              </div>

              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Topic</label>
                <input
                  type="text"
                  placeholder="Belajar membuat file JS"
                  class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                  v-model="topic"
                />
              </div>
            </div>
            <div class="mb-3">
              <label class="mb-2 block text-sm font-semibold">Image Url</label>
              <input
                type="text"
                placeholder="https://sajadganteng.jpg"
                class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                v-model="imageUrl"
              />
            </div>
            <div class="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Price</label>
                <input
                  type="number"
                  placeholder="Rp XXX"
                  class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                  v-model="price"
                />
              </div>
              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Duration</label>
                <input
                  type="number"
                  placeholder="60 Minutes"
                  class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                  v-model="duration"
                />
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Schedule</label>
                <input
                  type="datetime-local"
                  id="myDateTime"
                  class="border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                  name="myDateTime"
                  onchange="adjustDateTimeFormat(event)"
                  v-model="start_time"
                />
              </div>

              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Mentor</label>
                <select name="category" class="block w-full border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3.5 bg-white px-3 text-gray-500" v-model="MentorId">
                  <option value="0" selected disabled>-- Select Mentor --</option>

                  <option :value="mentor.id" v-for="mentor in mentors" :key="mentor.id">{{ mentor.name }}</option>
                </select>
              </div>
            </div>

            <div class="mb-3 mt-3">
              <button class="mb-1.5 block w-full text-center text-white bg-primary px-2 py-2.5 rounded-md">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
