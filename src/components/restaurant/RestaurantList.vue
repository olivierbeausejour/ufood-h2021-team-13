<template>
  <div>
    <div class="columns is-centered is-multiline is-mobile">
      <restaurant-item
        v-bind:key="restaurant.id"
        v-for="restaurant in restaurants"
        v-bind:restaurant="restaurant"
      />
      <p class="subtitle is-6 m-4" v-if="restaurants.length <= 0">
        No restaurants match the specified criterias.
      </p>
    </div>
  </div>
</template>

<script>
import RestaurantItem from "./RestaurantItem";

export default {
  name: "restaurant-list",
  components: {
    RestaurantItem
  },
  props: ["restaurants"]
};
</script>

<style scoped></style>
