<template>
  <div style="height: 700px; width: 100%">
    <l-map
      class="map"
      v-if="isVisible"
      :zoom="zoom"
      :center="mapLocation"
      :options="{ zoomSnap: 0.5 }"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker v-if="currentLocation" :lat-lng="currentLocation">
        <l-icon icon-url="/red-marker.png" :iconSize="[35, 35]" />
        <l-popup :options="{ interactive: true }">
          Current location
        </l-popup>
      </l-marker>
      <l-marker
        v-bind:key="restaurant.id"
        v-for="restaurant in restaurants"
        :lat-lng="getRestaurantLatLng(restaurant)"
      >
        <l-icon icon-url="/blue-marker.png" :iconSize="[35, 35]" />
        <l-popup>
          <router-link
            :to="{
              name: 'restaurant',
              params: { restaurantItem: restaurant, id: restaurant.id }
            }"
            class="card-footer-item"
          >
            <restaurant-item-lite v-bind:restaurant="restaurant" />
          </router-link>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from "vue2-leaflet";
import RestaurantItemLite from "./RestaurantItemLite";

export default {
  name: "restaurant-map",
  data() {
    return {
      zoom: 12,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
  },
  props: [
    "restaurants",
    "currentLocation",
    "mapLocation",
    "setMapLocation",
    "isVisible"
  ],
  methods: {
    zoomUpdate(newZoom) {
      this.zoom = newZoom;
    },
    centerUpdate(newCenter) {
      this.setMapLocation(newCenter);
    },
    getRestaurantLatLng(restaurant) {
      const { coordinates } = restaurant.location;
      return latLng(coordinates[1], coordinates[0]);
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    RestaurantItemLite
  }
};
</script>

<style scoped>
.restaurant-popup {
  cursor: pointer;
}
.map {
  z-index: 0;
}
</style>
