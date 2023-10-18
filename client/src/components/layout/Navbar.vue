<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useUserStore } from "../../stores/user";

export default {
  data() {
    return {
      active: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ["userProfile"]),
    ...mapWritableState(useUserStore, ["isAdmin", "isLogin", "myCourses"]),
    fImage() {
      if (this.userProfile) {
        if (this.userProfile.profileImage) {
          const uint8Array = new Uint8Array(this.userProfile.profileImage.data);
          const blob = new Blob([uint8Array], { type: "image/png/PNG/jpg/jpeg" }); // Sesuaikan tipe MIME sesuai dengan jenis gambar

          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        }
      }
    },
  },
  methods: {
    ...mapActions(useUserStore, ["getUserProfile", "getMyCourse", "logoutHandler"]),
    changeBg() {
      if (this.$router !== "/") {
        this.active = true;
      } else {
        if (window.scrollY >= 30) {
          this.active = true;
        } else {
          this.active = false;
        }
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.changeBg);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.changeBg);
  },
  created() {
    this.changeBg();
    if (localStorage.access_token) {
      this.isLogin = true;
      this.getUserProfile();
      this.getMyCourse();
    }

    if (localStorage.userRole === "Admin") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  },
};
</script>

<template>
  <div :class="{ 'navbar bg-[#002e74] hover:bg-[#002e74] text-white px-5 fixed z-20  w-full': active, 'navbar hover:bg-[#002e74] bg-transparent text-white px-5 fixed z-20 w-full': !active }">
    <div class="navbar-start">
      <div class="flex-1">
        <router-link to="/" class="btn btn-ghost normal-case text-xl">Bjatss</router-link>
      </div>
    </div>
    <div class="navbar-center hidden lg:flex" v-if="!isAdmin">
      <ul class="menu menu-horizontal px-1">
        <li><router-link class="hover:text-white" to="/">Home</router-link></li>
        <li><router-link class="hover:text-white" to="/mycourse">My Course</router-link></li>
      </ul>
    </div>
    <div class="navbar-end px-3">
      <div class="flex" v-if="isLogin">
        <div class="dropdown dropdown-end" v-if="!isAdmin">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <router-link class="indicator" to="/mycourse">
              <span class="material-symbols-outlined"> shopping_cart </span>
              <span class="badge badge-sm indicator-item badge-error">{{ myCourses.length }}</span>
            </router-link>
          </label>
        </div>
        <div class="dropdown dropdown-end flex">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <span class="material-symbols-outlined"> account_circle </span>
          </label>
          <ul tabindex="0" class="mt-16 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#002e74] rounded-box w-52">
            <li>
              <router-link to="/profile" class="hover:text-white">{{ userProfile ? "Edit Profile" : "Add Profile" }}</router-link>
            </li>
            <li><a @click.prevent="logoutHandler" class="hover:text-white">Logout</a></li>
          </ul>
        </div>
      </div>
      <router-link to="/login" v-if="!isLogin">Login</router-link>
    </div>
  </div>
</template>

<style></style>
