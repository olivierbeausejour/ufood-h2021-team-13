<template>
  <div class="mt-5">
    <h1 class="title is-3">Favorite restaurants</h1>
    <div class="is-flex is-justify-content-center">
      <b-button
        class="mb-3"
        type="is-primary"
        icon-left="plus"
        v-on:click="
          {
            isAddListModalActive = true;
          }
        "
      >
        Add a list
      </b-button>
    </div>
    <modal-favorite-restaurant
      v-bind:isActive="isAddListModalActive"
      v-bind:favoriteRestaurantList="[]"
      v-bind:actionType="'Create'"
      v-bind:onAction="onAddList"
      v-bind:onClose="closeAddListModal"
    />
    <div>
      <favorite-restaurant-list
        v-bind:key="favoriteRestaurantList.id"
        v-for="favoriteRestaurantList in favoriteRestaurantLists"
        v-bind:favoriteRestaurantList="favoriteRestaurantList"
        v-bind:onUpdateList="onUpdateList"
        v-bind:onDeleteList="onDeleteList"
        v-bind:onError="onError"
      />
      <div
        class="box is-flex is-justify-content-center"
        v-if="favoriteRestaurantLists.length <= 0"
      >
        <p class="subtitle is-6">You do not have any favorite lists yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ModalFavoriteRestaurant from "./ModalFavoriteRestaurant";
import FavoriteRestaurantList from "./FavoriteRestaurantList";

export default {
  name: "favorite-restaurants",
  data() {
    return {
      isAddListModalActive: false
    };
  },
  props: [
    "favoriteRestaurantLists",
    "onAddList",
    "onUpdateList",
    "onDeleteList",
    "onError"
  ],
  methods: {
    closeAddListModal() {
      this.isAddListModalActive = false;
    }
  },
  components: {
    ModalFavoriteRestaurant,
    FavoriteRestaurantList
  }
};
</script>

<style scoped></style>
