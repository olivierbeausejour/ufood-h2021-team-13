<template>
  <nav class="navbar is-primary">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="../assets/logo.png" alt="Logo" />
        </a>
        <a
          role="button"
          class="navbar-burger"
          v-bind:class="{ 'is-active': navbarBurgerActive }"
          @click="onClickNavbarBurger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navigation"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navigation"
        class="navbar-menu"
        v-bind:class="{ 'is-active': navbarBurgerActive }"
      >
        <div class="navbar-start">
          <div class="navbar-item">
            <div class="field">
              <b-autocomplete
                v-model="searchedRestaurantName"
                v-on:input="filterRestaurants"
                @keydown.native.enter="onSearchBarEnter"
                :data="restaurants"
                field="name"
                type="search"
                icon="magnify"
                placeholder="Search a restaurant..."
              />
            </div>
          </div>
        </div>
        <div v-if="!isLoggedIn" class="navbar-end">
          <div class="navbar-item">
            <router-link to="/login">
              <b-button class="button is-primary">
                Sign in
              </b-button>
            </router-link>
          </div>
        </div>
        <div v-if="isLoggedIn" class="navbar-end">
          <div class="navbar-item">Hello, {{ user.name }}</div>
          <div class="navbar-item">
            <ModalDisplayUsers :is-user="true" :id="user.id" />
          </div>
          <div class="navbar-item">
            <router-link
              :to="{
                name: 'user',
                params: { id: user.id }
              }"
            >
              <b-button class="button is-primary">
                My profile
              </b-button>
            </router-link>
          </div>
          <div class="navbar-item">
            <b-button v-on:click="signOut" class="button is-light">
              Sign out
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import * as api from "../api/ufoodApi";
import ModalDisplayUsers from "../components/user/ModalDisplayUsers";
export default {
  name: "navigation",
  components: {
    ModalDisplayUsers
  },
  data: function() {
    return {
      restaurants: [],
      searchedRestaurantName: "",
      user: {},
      navbarBurgerActive: false,
      isLoggedIn: false
    };
  },
  async created() {
    try {
      this.user = await api.getActualUser(true);
      this.isLoggedIn = await api.isLoggedIn();
    } catch (e) {
      this.errorToast();
    }
  },
  methods: {
    async onSearchBarEnter() {
      try {
        await this.$router.push({
          name: "home",
          params: { initialSearchedRestaurantName: this.searchedRestaurantName }
        });
      } catch (e) {
        if (
          e.message.includes("Avoided redundant navigation to current location")
        ) {
          this.$root.$emit(
            "onNavigationSearchBarEnter",
            this.searchedRestaurantName
          );
        } else {
          this.errorToast();
        }
      }
    },
    async filterRestaurants() {
      try {
        const restaurantsResponse = await api.getRestaurants(
          this.searchedRestaurantName,
          [1, 2, 3, 4],
          []
        );
        this.restaurants = restaurantsResponse.items;
      } catch (e) {
        this.errorToast();
      }
    },
    async signOut() {
      await api.logout();
    },
    onClickNavbarBurger() {
      this.navbarBurgerActive = !this.navbarBurgerActive;
    },
    errorToast() {
      this.$buefy.toast.open({
        duration: 5000,
        message: "An error occured, please try again later.",
        type: "is-danger"
      });
    }
  }
};
</script>

<style></style>
