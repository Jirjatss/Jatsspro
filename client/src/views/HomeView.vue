<script>
import { mapActions, mapState } from "pinia";
import CardMentor from "../components/card/CardMentor.vue";
import { useUserStore } from "../stores/user";
import Navbar from "../components/layout/Navbar.vue";
import Hero from "../components/Hero.vue";
import CardCourse from "../components/card/CardCourse.vue";
import Footer from "../components/layout/Footer.vue";

export default {
  components: {
    CardMentor,
    Navbar,
    Hero,
    CardCourse,
    Footer,
  },
  data() {
    return {
      offset: 0,
      maxOffset: 0,
      currentIndex: 0,
      autoplayInterval: null,
      mentorComponent: [],
    };
  },
  methods: {
    ...mapActions(useUserStore, ["getMentor", "getCourse"]),
    prevSlide() {
      if (this.currentIndex > 0) {
        this.offset += 500;
        this.currentIndex--;
      } else {
        this.offset = this.maxOffset;
        this.currentIndex = this.mentors.length - 1;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.mentors.length - 1) {
        this.offset -= 500;
        this.currentIndex++;
      } else {
        this.offset = 0;
        this.currentIndex = 0;
      }
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 3500);
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    },
  },
  computed: {
    maxOffset() {
      return -(this.mentors.length - 1) * 100;
    },
    ...mapState(useUserStore, ["mentors", "courses"]),
  },
  created() {
    this.startAutoplay();
    this.getMentor();
    this.getCourse();
  },
  beforeDestroy() {
    this.stopAutoplay();
  },
};
</script>
<template>
  <div>
    <Navbar />

    <Hero />
    <div class="bg-gray-100 py-10">
      <div class="mx-auto text-center">
        <span class="text-4xl text-black border-b-4 border-[#002e74] mb-5 font-bold">Courses</span>
      </div>
      <div class="flex">
        <div class="grid md:grid-cols-4 grid-cols-1 py-16 justify-center m-auto gap-6">
          <CardCourse v-for="course in courses" :key="course.id" :course="course" />
        </div>
      </div>
    </div>
    <div class="bg-cover card-mentor py-10 px-7">
      <div class="mx-auto text-center">
        <span class="text-4xl text-black border-b-4 border-[#002e74] mb-5 font-bold">Mentor Terfavorit</span>
      </div>
      <div class="carousel relative overflow-hidden w-full">
        <div class="flex transition-transform ease-in-out duration-300 gap-x-2" :style="{ transform: `translateX(${offset}px)` }">
          <CardMentor class="slide w-full px-3 text-center" v-for="mentor in mentors" :key="mentor.id" :mentor="mentor" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
.card-mentor {
  background-image: url("../assets/bg.jpg"); /* Mengatur gambar latar belakang */
  /* Sesuaikan ukuran, posisi, dan properti latar belakang lainnya jika diperlukan */
}
.slide {
  min-width: 50%;
}
</style>
