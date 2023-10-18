<script>
import { mapActions } from "pinia";

import { useUserStore } from "../../stores/user";

export default {
  props: ["course"],
  computed: {
    fDate() {
      const date = new Date(this.course.start_time);

      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();
      const hour = date.getHours();
      const minute = String(date.getMinutes()).padStart(2, "0");

      const time = `${hour}:${minute}`;
      return `${time} - ${day} ${month} ${year}`;
    },
  },
  methods: {
    ...mapActions(useUserStore, ["createMeeting"]),
    createMeetingComponent() {
      const input = {
        agenda: this.course.agenda,
        topic: this.course.topic,
        start_time: this.course.start_time,
        duration: this.course.duration,
      };
      this.createMeeting(this.course.id, input);
    },
    getDetail() {
      this.$router.push(`/admin/course/${this.course.id}`);
    },
  },
};
</script>

<template>
  <div class="card relative bg-white rounded-lg lg:w-80 w-full shadow-2xl">
    <div href="#" class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      <div class="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 class="text-lg font-bold text-gray-900 sm:text-md">
            {{ course.name }}
          </h3>
          <span class="inline-block whitespace-nowrap w-1/2 rounded-[0.27rem] bg-gradient-to-r from-cyan-400 to-blue-300 px-[1.65em] pb-[0.25em] pt-[0.35em] align-baseline text-[0.75em] font-semibold leading-none text-white mb-2"> </span>
        </div>

        <div class="hidden sm:block sm:shrink-0">
          <img :alt="course.name" :src="course.imageUrl" class="h-16 w-16 rounded-lg object-cover shadow-sm" />
        </div>
      </div>

      <div class="my-4">
        <p class="max-w-[40ch] text-sm text-gray-500">
          {{ course.topic }}
        </p>
      </div>
      <div class="">
        <dt class="text-sm font-medium text-gray-600">Schedule</dt>

        <dd class="text-sm text-gray-500">{{ fDate }}</dd>
      </div>

      <dl class="mt-6 grid grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium text-gray-600">Price</dt>
          <dd class="text-xs text-gray-500">{{ course.price }}</dd>
        </div>

        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium text-gray-600">Mentor</dt>
          <dd class="text-xs text-gray-500">{{ course.Mentor.name }}</dd>
        </div>
      </dl>
    </div>
    <button @click="getDetail" v-if="course.status" class="absolute inset-x-0 bottom-0 mt-3 bg-gradient-to-r text-white from-green-300 via-blue-500 to-purple-600 rounded-b-lg text-center py-2">See Detail</button>
    <button v-else @click="createMeetingComponent" class="absolute inset-x-0 bottom-0 mt-3 bg-gradient-to-r text-white from-green-300 via-blue-500 to-purple-600 rounded-b-lg text-center py-2">Create Meeting</button>
  </div>
</template>

<style></style>
