<template>
  <div>
    <b-collapse class="card" animation="slide">
      <template #trigger="props">
        <div class="card-header" role="button">
          <h2 class="card-header-title">
            {{ favoriteRestaurantList.name }} ({{ favoriteRestaurants.length }})
          </h2>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>

      <div class="card-content">
        <div class="content">
          <div
            class="is-flex is-justify-content-center"
            v-if="favoriteRestaurants.length <= 0"
          >
            <p class="subtitle is-6">
              This list does not contain any restaurants yet.
            </p>
          </div>
          <b-carousel-list
            :data="favoriteRestaurants"
            :items-to-show="itemsPerFavoriteList"
          >
            <template #item="restaurant">
              <favorite-restaurant-item
                v-bind:key="restaurant.id"
                v-bind:restaurant="restaurant"
                v-bind:onDeleteRestaurant="deleteRestaurantFromList"
              />
            </template>
          </b-carousel-list>
        </div>
      </div>
      <footer class="card-footer">
        <a
          class="card-footer-item"
          v-on:click="
            {
              isUpdateListModalActive = true;
            }
          "
          >Edit</a
        >
        <a
          class="card-footer-item"
          v-on:click="
            {
              isDeleteListModalActive = true;
            }
          "
          >Delete</a
        >
      </footer>
    </b-collapse>
    <modal-favorite-restaurant
      v-bind:isActive="isUpdateListModalActive"
      v-bind:favoriteRestaurantList="favoriteRestaurantList"
      v-bind:actionType="'Rename'"
      v-bind:onAction="onUpdateList"
      v-bind:onClose="closeAllModals"
    />
    <modal-favorite-restaurant
      v-bind:isActive="isDeleteListModalActive"
      v-bind:favoriteRestaurantList="favoriteRestaurantList"
      v-bind:actionType="'Delete'"
      v-bind:onAction="onDeleteList"
      v-bind:onClose="closeAllModals"
    />
  </div>
</template>

<script>
import * as api from "../../api/ufoodApi";
import FavoriteRestaurantItem from "./FavoriteRestaurantItem";
import ModalFavoriteRestaurant from "./ModalFavoriteRestaurant";

export default {
  name: "favorite-restaurant-list",
  data() {
    return {
      favoriteRestaurants: [],
      itemsPerFavoriteList: 4,
      isUpdateListModalActive: false,
      isDeleteListModalActive: false
    };
  },
  props: ["favoriteRestaurantList", "onUpdateList", "onDeleteList", "onError"],
  async created() {
    try {
      for (let k = 0; k < this.favoriteRestaurantList.restaurants.length; k++) {
        const restaurant = this.favoriteRestaurantList.restaurants[k];
        const fetchedRestaurant = await api.getRestaurantById(restaurant.id);
        this.favoriteRestaurants.push(fetchedRestaurant);
      }

      this.updateItemsAmountPerFavoriteList();
      window.addEventListener("resize", this.updateItemsAmountPerFavoriteList);
    } catch (e) {
      this.onError();
    }
  },
  methods: {
    closeAllModals() {
      this.isUpdateListModalActive = false;
      this.isDeleteListModalActive = false;
    },
    async deleteRestaurantFromList(restaurantId) {
      try {
        await api.deleteRestaurantFromFavoriteList(
          this.favoriteRestaurantList.id,
          restaurantId
        );
        this.favoriteRestaurants = this.favoriteRestaurants.filter(
          favoriteRestaurant => favoriteRestaurant.id != restaurantId
        );
      } catch (e) {
        this.onError();
      }
    },
    updateItemsAmountPerFavoriteList() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 450) {
        this.itemsPerFavoriteList = 1;
      } else if (windowWidth <= 600) {
        this.itemsPerFavoriteList = 2;
      } else if (windowWidth <= 750) {
        this.itemsPerFavoriteList = 3;
      } else {
        this.itemsPerFavoriteList = 4;
      }
    }
  },
  components: {
    FavoriteRestaurantItem,
    ModalFavoriteRestaurant
  }
};
</script>

<style scoped></style>
