<template>
  <b-modal
    v-model="isActive"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    :can-cancel="false"
    aria-role="dialog"
    aria-modal
  >
    <modal-favorite-restaurant-form
      v-bind:favoriteRestaurantList="favoriteRestaurantList"
      v-bind:actionType="actionType"
      v-bind:onAction="onAction"
      v-bind:onClose="onClose"
    />
  </b-modal>
</template>

<script>
import ModalFavoriteRestaurantForm from "./ModalFavoriteRestaurantForm";

export default {
  name: "update-favorite-restaurant-list-modal",
  props: [
    "isActive",
    "favoriteRestaurantList",
    "actionType",
    "onAction",
    "onClose"
  ],
  components: {
    ModalFavoriteRestaurantForm
  }
};
</script>

<style scoped></style>
