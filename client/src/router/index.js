import { createRouter, createWebHistory } from "vue-router";
import ProfileView from "../views/ProfileView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import DetailCourseView from "../views/DetailCourseView.vue";
import MyCourseView from "../views/MyCourseView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import MentorView from "../views/MentorView.vue";
import DashboardView from "../views/DashboardView.vue";
import CourseView from "../views/CourseView.vue";
import AddCourseView from "../views/AddCourseView.vue";
import DetailCourseAdminView from "../views/DetailCourseAdminView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/course/:id",
      name: "course",
      component: DetailCourseView,
    },
    {
      path: "/admin/course/:id",
      name: "course admin",
      component: DetailCourseAdminView,
    },
    {
      path: "/mycourse",
      name: "my course",
      component: MyCourseView,
    },

    {
      path: "/admin/mentor",
      name: "mentor",
      component: MentorView,
    },
    {
      path: "/admin/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/admin/course",
      name: "admin course",
      component: CourseView,
    },

    {
      path: "/admin/addcourse",
      name: "add course",
      component: AddCourseView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

export default router;
