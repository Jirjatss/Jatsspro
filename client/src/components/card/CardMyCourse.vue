<script>
import { mapActions } from "pinia";
import { useUserStore } from "../../stores/user";

export default {
  props: ["course"],
  computed: {
    fDate() {
      const date = new Date(this.course.Course.start_time);

      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();
      const hour = date.getHours();
      const minute = String(date.getMinutes()).padStart(2, "0");

      const time = `${hour}:${minute}`;
      return `${time} WIB - ${day} ${month} ${year}`;
    },
  },
  methods: {
    ...mapActions(useUserStore, ["deleteMyCourse", "payCourse"]),
  },
};
</script>
<template>
  <div class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mt-6">
    <div class="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
      <img :src="course.Course ? course.Course.imageUrl : ''" alt="img-blur-shadow" layout="fill" class="w-full h-full" />
    </div>
    <div class="p-6">
      <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">{{ course.Course ? course.Course.name : "" }}</h5>
      <p class="block font-sans text-base font-semibold leading-relaxed text-inherit antialiased">Mentor: {{ course.Course ? course.Course.Mentor.name : "" }}</p>
      <p class="block font-sans text-base font-semibold leading-relaxed text-inherit antialiased">Topic: {{ course.Course ? course.Course.agenda : "" }}</p>
      <p class="block font-sans text-base leading-relaxed text-inherit antialiased font-semibold">Schedule : {{ fDate }}</p>
      <p class="block font-sans text-base leading-relaxed text-inherit antialiased font-semibold">Price : {{ course.Course ? course.Course.price : "" }}</p>
    </div>
    <div class="p-6 pt-0 flex flex-wrap gap-3">
      <a
        v-if="course.isPay"
        :href="course.Course.Meeting ? course.Course.Meeting.join_url : ''"
        class="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer"
        type="button"
        data-ripple-light="true"
        target="_blank"
      >
        Join Meeting Now
      </a>
      <button
        v-if="!course.isPay"
        @click="payCourse(course.id)"
        class="select-none rounded-lg bg-[#002e74] py-3 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer"
        data-ripple-light="true"
      >
        Pay Now
      </button>
      <button
        @click="deleteMyCourse(course.id)"
        class="select-none rounded-lg bg-red-500 py-3 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer"
        data-ripple-light="true"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<style></style>
