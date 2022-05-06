<template>
  <div
    class="restaurant-item column is-two-fifths-tablet is-half-desktop is-one-third-widescreen"
    v-bind:class="{
      'is-half-mobile': mobileHalfColumn && !mobileFullColumn,
      'is-three-quarters-mobile': !mobileHalfColumn && !mobileFullColumn
    }"
  >
    <div class="card p-3">
      <div class="card-image">
        <figure class="image is-2by1">
          <img v-bind:src="restaurant.pictures[0]" class="is-rounded" alt="" />
        </figure>
        <div class="card-content is-overlay is-clipped">
          <span class="tag is-primary">
            {{ restaurant.rating.toFixed(1) }}
            <i class="fas fa-star"></i>
          </span>

          <ModalVisitRestaurant
            class="is-pulled-right"
            :isSmall="true"
            :restaurantId="restaurant.id"
          />
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
      <footer class="card-footer">
        <router-link
          :to="{
            name: 'restaurant',
            params: { restaurantItem: restaurant, id: restaurant.id }
          }"
          class="card-footer-item"
        >
          SEE
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script>
import ModalVisitRestaurant from "../visit/ModalVisitRestaurant";

export default {
  name: "restaurant-item",
  props: ["restaurant"],
  data() {
    return {
      mobileHalfColumn: false,
      mobileFullColumn: false
    };
  },
  async created() {
    window.addEventListener("resize", this.onWindowResized);
    this.onWindowResized();
  },
  methods: {
    onWindowResized() {
      this.mobileHalfColumn = window.innerWidth >= 600;
      this.mobileFullColumn = window.innerWidth <= 450;
    }
  },
  components: { ModalVisitRestaurant }
};
</script>

<style scoped>
.content {
  height: 200px;
}
.restaurant-name {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media screen and (max-width: 768px) {
  .restaurant-item {
    font-size: 80%;
  }
}
</style>
