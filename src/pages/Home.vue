<template>
  <div class="container section">
    <div class="columns is-desktop">
      <div class="column is-one-quarter-desktop">
        <restaurant-filters
          v-bind:setPriceRange="setPriceRange"
          v-bind:setItemsLimit="setItemsLimit"
          v-bind:itemsLimit="itemsLimit"
          v-bind:setGenres="setGenres"
        />
      </div>
      <div class="column content">
        <b-autocomplete
          v-model="searchedRestaurantName"
          v-on:input="filterRestaurants"
          :data="restaurants"
          field="name"
          type="search"
          icon="magnify"
          placeholder="Search a restaurant..."
        />
        <div>
          <b-icon icon="format-list-bulleted-square"></b-icon>
          <b-switch
            class="mt-4 ml-4"
            passive-type="is-primary"
            @input="mapMode = !mapMode"
          ></b-switch>
          <b-icon icon="map"></b-icon>
        </div>
        <h2 class="title is-3 mt-4">Restaurants</h2>
        <div v-if="!mapMode">
          <restaurant-list v-bind:restaurants="restaurants" />
          <div class="is-flex is-justify-content-center">
            <b-button
              type="is-primary"
              v-bind:class="{
                'is-hidden': !viewMoreButtonVisible,
                'is-loading': viewMoreButtonIsLoading
              }"
              class="m-4"
              v-on:click="onViewMoreButtonClicked"
            >
              View more
            </b-button>
          </div>
        </div>
        <restaurant-map
          v-bind:restaurants="restaurants"
          v-bind:currentLocation="currentLocation"
          v-bind:mapLocation="mapLocation"
          v-bind:setMapLocation="setMapLocation"
          v-bind:isVisible="mapMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { latLng } from "leaflet";

import RestaurantFilters from "../components/filters/RestaurantFilters";
import RestaurantList from "../components/restaurant/RestaurantList";
import RestaurantMap from "../components/restaurant/RestaurantMap";

import * as api from "../api/ufoodApi";

import geolocalisation from "../services/geolocalisation";

export default {
  name: "home",
  data() {
    return {
      restaurants: [],
      searchedRestaurantName: this.initialSearchedRestaurantName
        ? this.initialSearchedRestaurantName
        : "",
      searchBarRestaurantName: [],
      priceRanges: [],
      itemsLimit: api.defaultRestaurantListLimit,
      genres: [],
      viewMoreButtonVisible: true,
      viewMoreButtonIsLoading: false,
      mapLocation: geolocalisation.getDefaultPosition(),
      currentLocation: geolocalisation.getDefaultPosition(),
      mapMode: false
    };
  },
  props: ["initialSearchedRestaurantName"],
  async created() {
    api.setRouter(this.$router);

    this.$root.$on("onNavigationSearchBarEnter", newSearchedRestaurantName => {
      this.searchedRestaurantName = newSearchedRestaurantName;
      this.filterRestaurants();
    });

    geolocalisation
      .getCurrentPosition()
      .then(location => {
        const {
          coords: { latitude, longitude }
        } = location;
        this.mapLocation = this.currentLocation = latLng(latitude, longitude);
      })
      .catch(() => {
        this.errorToast("Could not fetch current location.");
      });
  },
  methods: {
    async filterRestaurants() {
      try {
        const restaurantsResponse = await api.getRestaurants(
          this.searchedRestaurantName,
          this.priceRanges,
          this.genres,
          this.searchedRestaurantName.length === 0
            ? this.mapLocation
            : undefined
        );
        this.restaurants = restaurantsResponse.items;
        this.viewMoreButtonVisible =
          this.restaurants.length < restaurantsResponse.total;
      } catch (e) {
        this.errorToast();
      }
    },
    errorToast(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message
          ? message
          : "An error occured, please try again later.",
        type: "is-danger"
      });
    },
    async setPriceRange(newPriceRanges) {
      this.priceRanges = newPriceRanges;
      await this.filterRestaurants();
    },
    async setItemsLimit(newItemsLimit) {
      api.setRestaurantListLimit(newItemsLimit);
      await this.filterRestaurants();
    },
    async setGenres(newGenres) {
      this.genres = newGenres;
      await this.filterRestaurants();
    },
    async setMapLocation(newLocation) {
      this.mapLocation = newLocation;
      await this.filterRestaurants();
    },
    async onViewMoreButtonClicked() {
      this.viewMoreButtonIsLoading = true;
      api.incrementRestaurantListLimit();
      this.$root.$emit("onViewMoreRestaurants", api.getRestaurantListLimit());
      await this.filterRestaurants();
      this.viewMoreButtonIsLoading = false;
    }
  },
  components: {
    RestaurantFilters,
    RestaurantList,
    RestaurantMap
  }
};
</script>

<style scoped></style>
