<script>
import { mapActions, mapWritableState } from "pinia";
import { useUserStore } from "../stores/user";

import MastheadVue from "../components/Masthead.vue";
import SidebarVue from "../components/layout/Sidebar.vue";

export default {
  components: {
    MastheadVue,
    SidebarVue,
  },
  props: ["username"],
  computed: {
    ...mapWritableState(useUserStore, ["courses", "mentors", "students"]),
  },
  methods: {
    ...mapActions(useUserStore, ["getMentor", "getCourse", "getStudents"]),
  },
  created() {
    this.getMentor();
    this.getCourse();

    if (!localStorage.zoom_access_token) localStorage.zoom_access_token = this.$route.query.zoom_access_token;
    if (!localStorage.access_token) {
      localStorage.access_token = this.$route.query.access_token;
      this.getStudents();
    }
    if (!localStorage.username) localStorage.username = this.$route.query.username;
    if (!localStorage.userRole) localStorage.userRole = this.$route.query.userRole;
  },
};
</script>

<template>
  <div>
    <SidebarVue />
    <div class="w-full pl-0 lg:pl-64 min-h-screen py-10 card-mentor bg-cover">
      <MastheadVue />
      <div class="p-6">
        <div class="flex flex-wrap -mx-3">
          <div class="w-1/2 xl:w-1/4 px-3">
            <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-16 h-16 fill-current mr-4 hidden lg:block">
                <path
                  d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm80-200v-380l200-200v400L560-360Zm-160 65v-396q-33-14-68.5-21.5T260-720q-37 0-72 7t-68 21v397q35-13 69.5-19t70.5-6q36 0 70.5 6t69.5 19Zm0 0v-396 396Z"
                />
              </svg>

              <div class="text-gray-700">
                <p class="font-semibold text-3xl">{{ courses.length }}</p>
                <p>Total Course</p>
              </div>
            </div>
          </div>

          <div class="w-1/2 xl:w-1/4 px-3">
            <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-16 h-16 fill-current mr-4 hidden lg:block">
                <path
                  d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"
                />
              </svg>

              <div class="text-gray-700">
                <p class="font-semibold text-3xl">{{ students.length }}</p>
                <p>Total Students</p>
              </div>
            </div>
          </div>
          <div class="w-1/2 xl:w-1/4 px-3">
            <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-16 h-16 fill-current mr-4 hidden lg:block">
                <path
                  d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"
                />
              </svg>

              <div class="text-gray-700">
                <p class="font-semibold text-3xl">{{ mentors.length }}</p>
                <p>Total Mentors</p>
              </div>
            </div>
          </div>
          <div class="w-1/2 xl:w-1/4 px-3">
            <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-16 h-16 fill-current mr-4 hidden lg:block">
                <path
                  d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"
                />
              </svg>

              <div class="text-gray-700">
                <p class="font-semibold text-3xl">177</p>
                <p>Total Logs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
