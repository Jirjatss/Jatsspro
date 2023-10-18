<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "../stores/user";
import Navbar from "../components/layout/Navbar.vue";
import TableRowStudentVue from "../components/TableRowStudent.vue";

export default {
  components: {
    Navbar,
    TableRowStudentVue,
  },
  data() {
    return {
      showPreloader: true,
      sectionDetail: false,
    };
  },
  methods: {
    ...mapActions(useUserStore, ["getCourseByIdAdmin", "deleteMeeting"]),
  },
  computed: {
    ...mapState(useUserStore, ["courseDetailAdmin"]),
    fPrice() {
      return Number(this.courseDetailAdmin.price).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },
    fDate() {
      const date = new Date(this.courseDetailAdmin.start_time);

      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();
      const hour = date.getHours();
      const minute = String(date.getMinutes()).padStart(2, "0");

      const time = `${hour}:${minute}`;
      return `${time} WIB, ${day} ${month} ${year}.`;
    },
  },
  created() {
    this.getCourseByIdAdmin(this.$route.params.id);

    setTimeout(() => {
      this.sectionDetail = true;
      this.showPreloader = false;
    }, 1700);
  },
};
</script>

<template>
  <div class="card-mentor bg-cover">
    <Navbar />
    <div class="grid h-screen text-black" v-show="showPreloader">
      <div class="flex">
        <div class="inline-block mt-72 m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
      <div class="text-center mt-5 text-primary md:-mt-44">Lagi Loading</div>
    </div>
    <section v-show="sectionDetail">
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 sm:py-24 lg:px-8">
        <div class="max-w-3xl">
          <h2 class="text-3xl font-bold sm:text-4xl text-black">
            <a @click.prevent="this.$router.back()" class="hover:cursor-pointer"><span class="material-symbols-outlined"> arrow_back_ios </span></a>
            {{ courseDetailAdmin.name }}
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div class="grid grid-rows">
            <div class="relative h-96 w-72 overflow-hidden sm:w-80 lg:w-full sm:h-80 lg:h-80 mt-5">
              <img alt="Party" :src="courseDetailAdmin.imageUrl" class="inset-0 w-full object-fit" />
              <a>
                <div class="absolute top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition text-4xl duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <div>
              <div class="overflow-x-auto">
                <table class="table">
                  <!-- head -->
                  <thead class="bg-[#a8e4dc]">
                    <tr class="text-black">
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>

                  <tbody>
                    <TableRowStudentVue v-for="(student, index) in courseDetailAdmin.MyCourses" :key="student.id" :index="index" :student="student.User" />
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="lg:py-16">
            <article class="space-y-4 text-black font-bold">
              <div class="flow-root bg-[#a8e4dc] p-10 md:-mt-12 border border-[#002e74] rounded-lg">
                <dl class="-my-3 divide-y divide-gray-100 text-sm">
                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-black">Mentor</dt>
                    <dd class="text-gray-700 sm:col-span-2">{{ courseDetailAdmin.Mentor ? courseDetailAdmin.Mentor.name : "" }}</dd>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-black">Name</dt>
                    <dd class="text-gray-700 sm:col-span-2">{{ courseDetailAdmin.name }}</dd>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-black">Agenda</dt>
                    <dd class="text-gray-700 sm:col-span-2">{{ courseDetailAdmin.agenda }}</dd>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-black">Topic</dt>
                    <dd class="text-gray-700 sm:col-span-2">{{ courseDetailAdmin.topic }}</dd>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-black">Price</dt>
                    <dd class="text-gray-700 sm:col-span-2">
                      {{ fPrice }}
                    </dd>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-black">Schedule</dt>
                    <dd class="text-gray-700 sm:col-span-2">
                      {{ fDate }}
                    </dd>
                  </div>
                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-black">
                      QR Code
                      <br />
                      <br />
                      <a
                        :href="courseDetailAdmin.Meeting.start_url"
                        target="_blank"
                        class="z-[2] w-full mt-6 bg-gradient-to-r from-cyan-400 to-blue-300 text-white border-primary px-4 py-2 text-xs font-medium uppercase transition duration-150 ease-in-out hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-600 focus:outline-none focus:ring-0"
                      >
                        Start Meeting Now
                      </a>

                      <button
                        @click="deleteMeeting(courseDetailAdmin.Meeting.id, courseDetailAdmin.Meeting.zoom_id)"
                        class="z-[2] w-full mt-4 bg-red-500 text-white border-primary px-6 py-1.5 text-xs font-medium uppercase transition duration-150 ease-in-out hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-600 focus:outline-none focus:ring-0"
                      >
                        Delete Meeting
                      </button>
                    </dt>
                    <div v-html="qrCode" style="width: 400px; margin: auto"></div>
                  </div>
                </dl>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>
