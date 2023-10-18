<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "../stores/user";
import Navbar from "../components/layout/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      showPreloader: true,
      sectionDetail: false,
    };
  },
  methods: {
    ...mapActions(useUserStore, ["getCourseById", "addMyCourse"]),
  },
  computed: {
    ...mapState(useUserStore, ["courseDetail"]),
    fPrice() {
      return Number(this.courseDetail.price).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },
    fDate() {
      const date = new Date(this.courseDetail.start_time);

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
    this.getCourseById(this.$route.params.id);
    setTimeout(() => {
      this.sectionDetail = true;
      this.showPreloader = false;
    }, 1700);
  },
};
</script>

<template>
  <div>
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
            {{ courseDetail.name }}
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div class="relative h-96 w-72 overflow-hidden sm:w-80 lg:w-full sm:h-80 lg:h-80 mt-5">
            <img alt="Party" :src="courseDetail.imageUrl" class="inset-0 w-full object-fit" />
            <a>
              <div class="absolute top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition text-4xl duration-300 ease-in-out hover:opacity-100"></div>
            </a>
          </div>

          <div class="lg:py-16">
            <article class="space-y-4 text-gray-600">
              <div class="flow-root">
                <dl class="-my-3 divide-y divide-gray-100 text-sm">
                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-gray-900">Mentor</dt>
                    <dd class="text-gray-700 sm:col-span-2">{{ courseDetail.Mentor ? courseDetail.Mentor.name : "" }}</dd>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-gray-900">Name</dt>
                    <dd class="text-gray-700 sm:col-span-2">{{ courseDetail.name }}</dd>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-gray-900">Agenda</dt>
                    <dd class="text-gray-700 sm:col-span-2">{{ courseDetail.agenda }}</dd>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-gray-900">Topic</dt>
                    <dd class="text-gray-700 sm:col-span-2">{{ courseDetail.topic }}</dd>
                  </div>

                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-gray-900">Price</dt>
                    <dd class="text-gray-700 sm:col-span-2">
                      {{ fPrice }}
                    </dd>
                  </div>
                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-gray-900">Schedule</dt>
                    <dd class="text-gray-700 sm:col-span-2">
                      {{ fDate }}
                    </dd>
                  </div>
                  <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt class="font-medium text-gray-900">
                      QR Code
                      <br />
                      <button
                        @click="addMyCourse(courseDetail.id)"
                        class="z-[2] w-full mt-6 bg-gradient-to-r from-cyan-400 to-blue-300 text-white border-primary px-5 py-1.5 text-xs font-medium uppercase transition duration-150 ease-in-out hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-600 focus:outline-none focus:ring-0"
                      >
                        Add to My Course
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
