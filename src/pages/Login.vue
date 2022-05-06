<template>
  <div
    id="login"
    class="columns is-flex is-justify-content-center is-align-items-center"
  >
    <div
      id="login-info"
      class="column is-one-third-desktop is-two-thirds-tablet is-four-fifths-mobile"
    >
      <a href="/">
        <img src="../assets/logo.png" alt="Logo" class="mb-3" />
      </a>
      <div class="box">
        <b-field label="Email address">
          <b-input
            v-model="email"
            type="email"
            placeholder="Email"
            required
          ></b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          ></b-input>
        </b-field>
        <b-field>
          <div class="buttons">
            <b-button type="is-primary" v-on:click="login">Login</b-button>
            <b-button
              type="is-primary"
              v-on:click="createAccoutModalActive = true"
              >Create an account</b-button
            >
          </div>
        </b-field>
      </div>
    </div>
    <modal-create-account
      v-bind:isActive="createAccoutModalActive"
      v-bind:onCreate="createAccount"
      v-bind:onClose="closeModal"
    />
  </div>
</template>

<script>
import ModalCreateAccount from "../components/authentication/ModalCreateAccount";

import * as api from "../api/ufoodApi";

export default {
  data() {
    return {
      email: "",
      password: "",
      createAccoutModalActive: false
    };
  },
  props: ["redirectName", "redirectProps"],
  async created() {
    if (await api.isLoggedIn()) {
      this.redirectLogin();
    }
  },
  methods: {
    async login() {
      const formattedEmail = this.email.trim();
      if (
        formattedEmail.length === 0 ||
        !formattedEmail.includes("@") ||
        this.password.length === 0
      )
        return;
      try {
        await api.login(
          formattedEmail,
          this.password,
          () => {
            this.redirectLogin();
          },
          () => {
            this.errorToast("Invalid email or password.");
          },
          () => {
            this.errorToast();
          }
        );
      } catch (e) {
        this.errorToast();
      }
    },
    redirectLogin() {
      let redirect = {
        name: this.redirectName ? this.redirectName : "home"
      };
      if (this.redirectProps) {
        redirect.params = this.redirectProps;
      }
      this.$router.push(redirect);
    },
    async createAccount(name, email, password) {
      try {
        await api.signup(name, email, password);
        this.closeModal();
        this.email = email;
        this.password = password;
      } catch {
        this.errorToast(`Email ${email} already in use.`);
      }
    },
    closeModal() {
      this.createAccoutModalActive = false;
    },
    errorToast(toastMessage) {
      const message = toastMessage
        ? toastMessage
        : "An error occured, please try again later.";
      this.$buefy.toast.open({
        duration: 5000,
        message,
        type: "is-danger"
      });
    }
  },
  components: {
    ModalCreateAccount
  }
};
</script>

<style scoped>
#login {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #8054d4;
}

#login-info {
  height: fit-content;
}
</style>
