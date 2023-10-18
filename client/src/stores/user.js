import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useUserStore = defineStore("user", {
  state: () => ({
    baseUrl: "https://jatsspro.jirjatss.online/",
    otpForm: true,
    loginForm: false,
    userProfile: [],
    mentors: [],
    courses: [],
    isLogin: false,
    isAdmin: false,
    courseDetail: {},
    courseDetailAdmin: {},
    myCourses: [],
    students: [],
  }),
  getters: {},
  actions: {
    swal(icon, title, msg) {
      Swal.fire({
        icon: icon,
        title: title,
        text: msg,
        showConfirmButton: false,
        timer: 1500,
      });
    },

    formOTP() {
      this.otpForm = !this.otpForm;
      this.loginForm = !this.loginForm;
    },

    async registerHandler(input) {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "register",
          data: input,
        });
        this.$router.push("/login");
        this.swal("success", "Success", "Success Register");
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },

    async getOTP(input) {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "getOTP",
          data: input,
        });
        this.formOTP();
        this.swal("success", "Success", data.message);
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },

    logoutHandler() {
      localStorage.clear();
      this.$router.push("/login");
      this.swal("success", "Success", "Success Logout");
    },

    async loginHandler(input) {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "login",
          data: input,
        });
        localStorage.access_token = data.access_token;
        localStorage.username = data.username;
        localStorage.userRole = data.userRole;
        this.$router.push("/");
        this.swal("success", "Success", "Success Login");
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async googleLogin(credential) {
      try {
        const { data } = await axios({
          method: "POST",
          url: this.baseUrl + "google-login",
          headers: {
            google_token: credential,
          },
        });

        localStorage.access_token = data.access_token;
        localStorage.access_token = data.access_token;
        localStorage.username = data.username;
        localStorage.role = data.userRole;
        this.$router.push("/");
        this.swal("success", "Success", "Success Login");
      } catch (error) {
        console.log(error);

        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },

    async postUserProfile(input) {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "profile",
          headers: {
            access_token: localStorage.access_token,
            "Content-Type": "multipart/form-data",
          },
          data: input,
        });
        this.swal("success", "Success", "Success create profile");
        this.getUserProfile();
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async editUserProfile(id, input) {
      try {
        const { data } = await axios({
          method: "patch",
          url: this.baseUrl + "profile/" + id,
          headers: {
            access_token: localStorage.access_token,
            "Content-Type": "multipart/form-data",
          },
          data: input,
        });
        this.getUserProfile();
        this.swal("success", "Success", "Success create profile");
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async getUserProfile() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "profile",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.userProfile = data;
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async getMentor() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "mentor",
        });

        this.mentors = data;
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async getCourse() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "course",
        });

        this.courses = data;
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async getCourseById(id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + "course/" + id,
        });

        this.courseDetail = data;
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async getCourseByIdAdmin(id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + "admin/course/" + id,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.courseDetailAdmin = data;
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },

    async addMyCourse(id) {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "mycourse/" + id,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.getMyCourse();
        this.$router.push("/mycourse");
        this.swal("success", "Success", "Success add course");
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async getMyCourse() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "mycourse",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.myCourses = data;
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },

    async payCourse(id) {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "mycourse/payment/" + id,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        window.snap.pay(data.token, {
          onSuccess: async () => {
            try {
              const { data } = await axios({
                method: "patch",
                url: this.baseUrl + "mycourse/" + id,
                headers: {
                  access_token: localStorage.access_token,
                },
              });
              this.getMyCourse();
            } catch (error) {
              const msg = error.response.data.message;
              this.swal("error", "Oops...", msg);
            }
          },
        });
        this.getMyCourse();
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async deleteMyCourse(id) {
      try {
        const { data } = await axios({
          method: "delete",
          url: this.baseUrl + "mycourse/" + id,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.swal("success", "Success", "Success add course");
        this.getMyCourse();
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async createMeeting(id, input) {
      try {
        const { data } = await axios({
          method: "post",
          url: this.baseUrl + "meeting/" + id,
          headers: {
            access_token: localStorage.access_token,
            token: localStorage.zoom_access_token,
          },
          data: input,
        });
        this.getCourse();
        this.swal("success", "Success", "Success create Meeting");
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },

    async deleteMeeting(id, zoomId) {
      try {
        const { data } = await axios({
          method: "delete",
          url: this.baseUrl + "meeting/" + id + "/" + zoomId,
          headers: {
            access_token: localStorage.access_token,
            token: localStorage.zoom_access_token,
          },
        });
        this.swal("success", "Success", "Success delete Meeting");
        this.$router.push("/admin/course");
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
    async getStudents() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "student",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        this.students = data;
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },

    async addCourse(input) {
      try {
        await axios({
          method: "post",
          url: this.baseUrl + "course",
          headers: {
            access_token: localStorage.access_token,
          },
          data: input,
        });
        this.$router.push("/admin/course");
        this.getCourse();
        this.swal("success", "Success", "Success add Course");
      } catch (error) {
        const msg = error.response.data.message;
        this.swal("error", "Oops...", msg);
      }
    },
  },
});
