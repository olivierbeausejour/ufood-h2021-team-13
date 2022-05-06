<template>
  <div class="fav-modal">
    <section>
      <button
        class="button is-primary is-medium"
        @click="isComponentModalActive = true"
      >
        Add to favorite
      </button>
      <b-modal :active.sync="isComponentModalActive" has-modal-card>
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">
              Add restaurant to a list of favorites
            </p>
          </header>
          <section class="modal-card-body">
            <b-field v-for="list in favoriteLists" :key="list.id">
              <RadioButtonItemFavorite
                @selectedList="actualSelectedList"
                :favoriteList="list"
              />
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button"
              type="button"
              @click="isComponentModalActive = false"
            >
              Close
            </button>
            <button class="button is-primary" @click="addFavorite">Add</button>
          </footer>
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>
import RadioButtonItemFavorite from "./RadioButtonItemFavorite";
import * as api from "../../api/ufoodApi";
export default {
  name: "AddRestaurantToFavoriteModal",
  components: {
    RadioButtonItemFavorite
  },
  props: ["restaurantId"],
  data() {
    return {
      isComponentModalActive: false,
      favoriteLists: [],
      selectedList: ""
    };
  },
  async created() {
    const response = await api.getFavoriteRestaurantLists();
    this.favoriteLists = response.items;
  },
  methods: {
    addFavorite() {
      api.addRestaurantToFavoriteList(this.selectedList, this.restaurantId);
      this.isComponentModalActive = false;
      this.$buefy.toast.open({
        duration: 3000,
        message: "Thanks for your support!",
        type: "is-success"
      });
    },
    actualSelectedList(listName) {
      this.selectedList = listName;
    }
  }
};
</script>

<style scoped></style>
