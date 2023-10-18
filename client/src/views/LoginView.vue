<script>
import { mapActions, mapWritableState } from "pinia";
import { useUserStore } from "../stores/user";

export default {
  data() {
    return {
      email: "",
      password: "",
      otpValue: ["", "", "", ""],
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["otpForm", "loginForm"]),
    nextInput() {
      return this.otpValue1 === "" ? 1 : this.otpValue2 === "" ? 2 : this.otpValue3 === "" ? 3 : this.otpValue4 === "" ? 4 : null;
    },
  },
  methods: {
    ...mapActions(useUserStore, ["getOTP", "loginHandler", "formOTP", "googleLogin"]),

    getOTPComponent() {
      const input = {
        email: this.email,
        password: this.password,
      };
      this.getOTP(input);
    },
    loginComponent() {
      this.otpValue = this.otpValue.join("");
      const input = {
        email: this.email,
        password: this.password,
        otp: this.otpValue,
      };
      this.loginHandler(input);
    },

    callback(response) {
      this.credential = response.credential;
      this.googleLogin(this.credential);
    },

    handleInput(event, index) {
      const value = event.target.value;
      const inputs = document.querySelectorAll("#otp > *[id]");

      if (value !== "") {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      } else {
        if (index > 0) {
          inputs[index - 1].focus();
        }
      }
    },
  },
  created() {
    this.otpForm = false;
    this.loginForm = true;
  },
};
</script>

<template>
  <div>
    <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10" v-show="loginForm">
      <div class="flex shadow-md">
        <div class="flex flex-wrap content-center justify-center rounded-l-md bg-white" style="width: 32rem; height: 32rem">
          <div class="w-96">
            <h1 class="text-xl font-semibold text-center">Welcome back</h1>
            <p class="text-gray-400 text-center text">Sign in! Please enter your details</p>
            <form class="mt-4" @submit.prevent="getOTPComponent">
              <div class="mb-3">
                <label class="mb-2 block text-xs font-semibold">Email</label>
                <input type="email" placeholder="Email" class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500" v-model="email" />
              </div>
              <div class="mb-6">
                <label class="mb-2 block text-xs font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="*****"
                  class="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-3 bg-white px-3 text-gray-500"
                  v-model="password"
                />
              </div>
              <div class="mb-3">
                <button class="mb-1.5 block w-full text-center text-white bg-primary px-2 py-2.5 rounded-md">Sign in</button>
              </div>
            </form>
            <div class="grid grid-cols-2 gap-5 justify-center">
              <GoogleLogin :callback="callback" class="w-24" />
              <a href="https://jatsspro.jirjatss.online/zoom-OAuth" class="flex flex-wrap m-auto justify-center border border-gray-300 hover:border-gray-500 px-2 py-2.5 rounded-md text-sm">
                <img class="w-5 mr-2" src="https://assets.stickpng.com/images/5e8ce318664eae0004085461.png" />
                Sign in With Zoom
              </a>
            </div>
            <div class="text-center mt-4">
              <span class="text-xs text-gray-400 font-semibold">Don't have account? </span>
              <router-link to="/register" class="text-xs font-semibold text-purple-700">Sign up</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- otp -->
    <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10" v-show="otpForm">
      <div class="flex shadow-md">
        <div class="flex flex-wrap content-center justify-center rounded-l-md bg-white" style="width: 24rem; height: 24rem">
          <div class="w-72">
            <div class="flex flex-col items-center justify-center text-center">
              <div class="font-semibold text-xl">
                <p>Email Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {{ email }}</p>
              </div>
            </div>

            <div>
              <form @submit.prevent="loginComponent" class="py-10">
                <div class="flex flex-col">
                  <div class="flex flex-row items-center justify-center mx-auto w-full max-w-xs gap-x-2 text-black" id="otp">
                    <input
                      class="w-10 h-10 border border-black flex flex-col items-center justify-center text-center px-0 outline-none text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      v-model="otpValue[0]"
                      @input="(event) => handleInput(event, 0)"
                      id="first"
                    />

                    <input
                      class="w-10 h-10 border border-black flex flex-col items-center justify-center text-center px-0 outline-none text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id="second"
                      maxlength="1"
                      v-model="otpValue[1]"
                      @input="(event) => handleInput(event, 1)"
                    />

                    <input
                      class="w-10 h-10 border border-black flex flex-col items-center justify-center text-center px-0 outline-none text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id="third"
                      maxlength="1"
                      @input="(event) => handleInput(event, 2)"
                      v-model="otpValue[2]"
                    />

                    <input
                      class="w-10 h-10 border border-black flex flex-col items-center justify-center text-center px-0 outline-none text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id="fourth"
                      maxlength="1"
                      @input="(event) => handleInput(event, 3)"
                      v-model="otpValue[3]"
                    />
                  </div>
                </div>

                <div class="mt-7">
                  <button class="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">Verify Account</button>
                </div>
              </form>
              <div class="flex flex-col space-y-2 -mt-7">
                <p class="text-red-500 text-center text-sm font-medium">Don't refresh!</p>

                <button @click="formOTP" class="inline-blocks text-center">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
