<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-5by3">
        <router-link
          :to="{
            name: 'restaurant',
            params: { restaurant: restaurant, id: restaurant.id }
          }"
        >
          <img :src="restaurant.pictures[0]" />
        </router-link>
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <b-field grouped>
          <p class="title is-6">{{ restaurant.name }}</p>
          <p class="control" style="margin-left: auto">
            <b-button
              v-on:click="onDeleteRestaurant(restaurant.id)"
              size="is-small"
              icon-left="delete"
              type="is-danger"
            />
          </p>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "favorite-restaurant-item",
  props: ["restaurant", "onDeleteRestaurant"]
};
</script>

<style scoped></style>
