<template>
  <div class="content section">
    <div class="mb-5">
      <b-carousel :indicator-inside="false" :indicator-custom="true">
        <b-carousel-item v-for="i in restaurant.pictures.length" :key="i">
          <span class="image">
            <img
              :src="getImgUrl(i - 1)"
              class="carousel-image"
              alt="image du restaurant"
            />
          </span>
        </b-carousel-item>
        <template #indicators="props">
          <span class="al image">
            <img
              :src="getImgUrl(props.i)"
              :title="props.i"
              class="small-carousel-image"
              alt="image du restaurant"
            />
          </span>
        </template>
      </b-carousel>
    </div>
    <div>
      <div class="restaurant-name-rate">
        <h2 class="restaurant-name">{{ restaurant.name }}</h2>
        <section>
          <b-rate v-bind:value="restaurant.rating" :disabled="true"></b-rate>
        </section>
      </div>
      <div class="price-range">
        <span v-for="star in restaurant.price_range" v-bind:key="star">
          <i class="fas fa-dollar-sign"></i>
        </span>
        <span v-for="genre in restaurant.genres" v-bind:key="genre">
          {{ genre }} <span> • </span>
        </span>
      </div>
      <div class="rate"></div>
      <div class="restaurant-adress">
        <div>
          <h3 class="restaurant-adress">{{ restaurant.address }}</h3>
        </div>
      </div>
      <div class="restaurant-hours">
        <h3>Openings hours</h3>
        <div
          v-for="(hour, day) in restaurant.opening_hours"
          v-bind:key="day"
          class="open-hours"
        >
          <span v-if="hour === null">{{ day }} : closed</span>
          <span v-else>{{ day }} : {{ hour }}</span>
          <br />
        </div>
      </div>
      <h3>{{ restaurant.tel }}</h3>
    </div>
    <div class="buttons">
      <ModalVisitRestaurant :is-small="false" :restaurantId="restaurant.id" />
      <AddRestaurantToFavoriteModal :restaurantId="restaurant.id" />
    </div>
    <RestaurantMap
      class="map"
      v-bind:restaurants="[restaurant]"
      v-bind:mapLocation="mapLocation"
      v-bind:setMapLocation="setMapLocation"
      v-bind:isVisible="true"
    />
  </div>
</template>

<script>
import ModalVisitRestaurant from "../components/visit/ModalVisitRestaurant";
import AddRestaurantToFavoriteModal from "../components/favorites/AddRestaurantToFavoriteModal";
import RestaurantMap from "../components/restaurant/RestaurantMap";
import { latLng } from "leaflet";
import * as api from "../api/ufoodApi";
import geolocalisation from "../services/geolocalisation";

export default {
  components: {
    ModalVisitRestaurant,
    AddRestaurantToFavoriteModal,
    RestaurantMap
  },
  props: ["restaurantItem"],
  async created() {
    if (!this.restaurantItem) {
      this.restaurant = await api.getRestaurantById(this.$attrs["id"]);
    }
    const {
      location: { coordinates }
    } = this.restaurant;
    this.mapLocation = latLng(coordinates[1], coordinates[0]);

    api.setRouter(this.$router);
    api.addRedirectProp("restaurantItem", this.restaurant);
    api.addRedirectProp("id", this.restaurant.id);
  },
  methods: {
    setMapLocation(newLocation) {
      this.mapLocation = newLocation;
    },
    getImgUrl(value) {
      return this.restaurant.pictures[value];
    },
    alertCustom() {
      this.$buefy.dialog.alert({
        title: "Directions",
        message:
          '<img src="../assets/map.png" alt="" /> <br>I have a title, a custom button and <b>HTML</b>!',
        confirmText: "Let's go !"
      });
    },
    alertCustomError() {
      this.$buefy.dialog.alert({
        title: "Restaurant Infos",
        message: "Adresse du restaurant",
        type: "is-primary",
        hasIcon: true,
        icon: "thumbtack",
        iconPack: "fa",
        ariaRole: "alertdialog",
        ariaModal: true
      });
    }
  },
  data() {
    return {
      restaurant: this.restaurantItem,
      restaurants: [],
      mapLocation: geolocalisation.getDefaultPosition()
    };
  }
};
</script>

<style scoped>
.is-active .al img {
  filter: grayscale(0%);
}
.al img {
  filter: grayscale(100%);
}
.carousel {
  width: 100%;
  margin: auto;
}
.restaurant-name {
  font-size: 25px;
  font-weight: bold;
  color: rgb(121, 87, 213);
  margin-bottom: 5px;
}
.restaurant-adress {
  margin-right: 10px;
  margin-bottom: 5px;
}
.carousel-image {
  height: 420px;
  width: 1040px;
  margin: 2% auto auto;
}
.small-carousel-image {
  height: 80px;
  width: 180px;
}
.map {
  z-index: -1;
}
@media only screen and (max-width: 360px) {
  .buttons-map {
    display: flex;
  }
  .small-carousel-image {
    height: 50px;
    width: 150%;
  }
}
</style>
