<script>
import { mapActions, mapWritableState } from "pinia";
import { useUserStore } from "../stores/user";
import Navbar from "../components/layout/Navbar.vue";
export default {
  data() {
    return {
      gender: 0,
      address: "",
      phone: "",
      fullname: "",
      profileImage: null,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(useUserStore, ["postUserProfile", "getUserProfile", "editUserProfile"]),
    handleFileUpload(event) {
      this.profileImage = event.target.files[0];
      this.userProfile.profileImage = event.target.files[0];
    },

    uploadProfile() {
      const formData = new FormData();
      formData.append("address", this.address);
      formData.append("gender", this.gender);
      formData.append("fullname", this.fullname);
      formData.append("phone", this.phone);
      formData.append("profileImage", this.profileImage);
      this.postUserProfile(formData);
    },
    editProfile() {
      const formData = new FormData();
      formData.append("address", this.userProfile.address);
      formData.append("gender", this.userProfile.gender);
      formData.append("fullname", this.userProfile.fullname);
      formData.append("phone", this.userProfile.phone);
      formData.append("profileImage", this.userProfile.profileImage);
      this.editUserProfile(this.userProfile.id, formData);
    },
  },
  computed: {
    ...mapWritableState(useUserStore, ["userProfile"]),
    fImage() {
      if (this.userProfile) {
        const uint8Array = new Uint8Array(this.userProfile.profileImage.data);
        const blob = new Blob([uint8Array], { type: "image/png/PNG/jpg/jpeg" }); // Sesuaikan tipe MIME sesuai dengan jenis gambar

        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
      }
    },
  },
  created() {
    this.getUserProfile();
  },
};
</script>

<template>
  <div>
    <Navbar />
    <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10 card-mentor">
      <div class="shadow-md mt-10">
        <div class="flex flex-wrap content-center justify-center rounded-l-md bg-white py-6 px-16">
          <div class="w-[34rem]">
            <h1 class="text-xl font-semibold text-center">{{ userProfile ? "Edit your Profile" : "Create your Profile" }}</h1>

            <p class="text-gray-400 text-center text">Please enter your details</p>
            <form @submit.prevent="editProfile" enctype="multipart/form-data" class="mt-7" v-if="userProfile">
              <div class="grid grid-cols-2 gap-x-3">
                <div>
                  <div class="mb-3">
                    <label class="mb-2 block text-sm font-semibold">Fullname</label>
                    <input type="text" class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-black" v-model="userProfile.fullname" />
                  </div>
                  <div class="mb-3">
                    <label class="mb-2 block text-sm font-semibold">Address</label>
                    <input type="text" class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-black" v-model="userProfile.address" />
                  </div>
                </div>

                <div class="mt-3 text-center">
                  <img :src="fImage" class="w-96 h-44 rounded" alt="" />
                </div>
              </div>

              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Gender</label>
                <select class="select select-primary w-full bg-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 px-3 text-black text-md" v-model="userProfile.gender">
                  <option disabled selected value="0">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="mb-2 block text-xs font-semibold">Phone</label>
                <input type="number" class="w-full bg-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 px-3 text-black text-md" v-model="userProfile.phone" />
              </div>
              <div class="mb-6">
                <input type="file" class="file-input file-input-bordered file-input-primary w-full bg-white" @change="handleFileUpload" id="profileImage" />
                <br />
              </div>

              <div class="mb-3">
                <button class="mb-1.5 block w-full text-center text-white bg-primary px-2 py-2.5 rounded-md">Save</button>
              </div>
            </form>

            <form @submit.prevent="uploadProfile" enctype="multipart/form-data" class="mt-7" v-else>
              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Fullname</label>
                <input
                  type="text"
                  placeholder="M Hijir Sajad"
                  class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                  v-model="fullname"
                />
              </div>
              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Address</label>
                <input
                  type="text"
                  placeholder="Jl. XXX"
                  class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                  v-model="address"
                />
              </div>

              <div class="mb-3">
                <label class="mb-2 block text-sm font-semibold">Gender</label>
                <select class="select select-primary w-full bg-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 px-3 text-gray-500 text-md" v-model="gender">
                  <option disabled selected value="0">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="mb-2 block text-xs font-semibold">Phone</label>
                <input
                  type="number"
                  placeholder="081233XXX"
                  class="w-full bg-white rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 px-3 text-gray-500 text-md"
                  v-model="phone"
                />
              </div>
              <div class="mb-6">
                <input type="file" class="file-input file-input-bordered file-input-primary w-full bg-white" @change="handleFileUpload" id="profileImage" />
                <br />
              </div>

              <div class="mb-3">
                <button class="mb-1.5 block w-full text-center text-white bg-primary px-2 py-2.5 rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
