<script>
import { mapActions } from "pinia";
import { useUserStore } from "../../stores/user";

export default {
  emits: ["changePage"],
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    ...mapActions(useUserStore, ["logoutHandler"]),
  },
};
</script>

<template>
  <div class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-white border-r z-20" id="main-nav">
    <div class="w-full h-20 border-b flex px-4 items-center mb-8">
      <p class="font-semibold text-3xl text-[#002e74] pl-4">JatssPro</p>
    </div>

    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1">ADMIN</p>
      <div class="w-full flex items-center text-[#002e74] h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <span class="material-symbols-outlined me-2"> dashboard </span>
        <router-link to="/admin/dashboard"><span class="text-gray-700">Dashborad</span></router-link>
      </div>
      <div class="w-full flex items-center text-[#002e74] h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <span class="material-symbols-outlined me-2"> add_circle </span>
        <router-link to="/admin/addcourse"><span class="text-gray-700">Add Course</span></router-link>
      </div>
      <div class="w-full flex items-center text-[#002e74] h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <span class="material-symbols-outlined me-2"> import_contacts </span>
        <router-link to="/admin/course"><span class="text-gray-700">View Course</span></router-link>
      </div>
      <div class="w-full flex items-center text-[#002e74] h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <span class="material-symbols-outlined me-2"> psychology </span>
        <router-link to="/admin/mentor"><span class="text-gray-700">View Mentor</span></router-link>
      </div>
    </div>
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1">LOGS</p>
      <div class="w-full flex items-center text-[#002e74] h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <span class="material-symbols-outlined me-2"> history </span>
        <button><span class="text-gray-700">View Logs</span></button>
      </div>
    </div>
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1">ACCOUNT</p>
      <div class="w-full flex items-center text-[#002e74] h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
        <span class="material-symbols-outlined me-2"> logout </span>
        <button @click="logoutHandler"><span class="text-gray-700">Logout</span></button>
      </div>
    </div>
  </div>
</template>
