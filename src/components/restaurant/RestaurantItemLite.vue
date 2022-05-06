<template>
  <div class="card p-3">
    <div class="card-image">
      <figure>
        <img
          v-bind:src="restaurant.pictures[0]"
          class="restaurant-image is-rounded"
          alt=""
        />
      </figure>
      <div class="card-content is-overlay is-clipped">
        <span class="tag is-primary">
          {{ restaurant.rating.toFixed(1) }}
          <i class="fas fa-star"></i>
        </span>
      </div>
      <div class="content">
        <h1 class="restaurant-name">{{ restaurant.name }}</h1>
        <div class="price-range" v-if="restaurant.price_range">
          Price range:
          <span v-for="i in restaurant.price_range" v-bind:key="i">
            <i class="fas fa-dollar-sign"></i>
          </span>
        </div>
        <div class="address">Address: {{ restaurant.address }}</div>
        <div class="phone-number">
          Phone number:
          {{ restaurant.tel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "restaurant-item-lite",
  props: ["restaurant"]
};
</script>

<style scoped>
.restaurant-image {
  max-width: 250px;
  max-height: 250px;
}
</style>
