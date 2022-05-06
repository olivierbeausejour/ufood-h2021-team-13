<template>
  <div>
    <user-info :isUserLocal="isUserLocal" :userId="userId" :key="userInfoKey" />
    <div class="container section content">
      <user-visit-list v-bind:userId="userId" :key="userVisitKey" />
      <favorite-restaurants
        v-if="isUserLocal"
        :key="userFavoriteRestaurantsKey"
        v-bind:favoriteRestaurantLists="favoriteRestaurantLists"
        v-bind:onAddList="addFavoriteRestaurantList"
        v-bind:onUpdateList="updateFavoriteRestaurantList"
        v-bind:onDeleteList="deleteFavoriteRestaurantList"
        v-bind:onError="errorToast"
      />
    </div>
  </div>
</template>

<script>
import * as api from "../api/ufoodApi";
import FavoriteRestaurants from "../components/favorites/FavoriteRestaurants";
import UserInfo from "../components/user/UserInfo.vue";
import UserVisitList from "../components/visit/UserVisitList.vue";

export default {
  name: "user",
  data() {
    return {
      isUserLocal: false,
      favoriteRestaurantLists: [],
      userId: this.$attrs["id"],
      actualUser: {},
      userInfoKey: 0,
      userVisitKey: 1,
      userFavoriteRestaurantsKey: 2
    };
  },
  async created() {
    api.setRouter(this.$router);
    api.addRedirectProp("id", this.userId);

    this.actualUser = await api.getActualUser(true);
    this.isUserLocal = this.userId === this.actualUser.id;
    api.addRedirectProp("isUserLocal", this.isUserLocal);

    const favoriteRestaurants = await api.getFavoriteRestaurantLists();
    this.favoriteRestaurantLists = favoriteRestaurants.items;
  },
  beforeRouteUpdate(to, from, next) {
    const {
      params: { id }
    } = to;
    this.userId = id;
    this.isUserLocal = this.userId === this.actualUser.id;
    this.userInfoKey++;
    this.userVisitKey++;
    this.userFavoriteRestaurantsKey++;
    next();
  },
  methods: {
    async addFavoriteRestaurantList(listName) {
      try {
        const createdFavoriteRestaurantList = await api.createFavoriteRestaurantList(
          listName
        );
        this.favoriteRestaurantLists.push(createdFavoriteRestaurantList);
      } catch (e) {
        this.errorToast();
      }
    },
    async updateFavoriteRestaurantList(listId, listName) {
      try {
        await api.renameFavoriteRestaurantList(listId, listName);
        const index = this.favoriteRestaurantLists.findIndex(
          favoriteRestaurantList => favoriteRestaurantList.id === listId
        );
        this.favoriteRestaurantLists[index].name = listName;
      } catch (e) {
        this.errorToast();
      }
    },
    async deleteFavoriteRestaurantList(listId) {
      try {
        await api.deleteFavoriteRestaurantList(listId);
        this.favoriteRestaurantLists = this.favoriteRestaurantLists.filter(
          favoriteRestaurantList => favoriteRestaurantList.id !== listId
        );
      } catch (e) {
        this.errorToast();
      }
    },
    errorToast() {
      this.$buefy.toast.open({
        duration: 5000,
        message: "An error occured, please try again later",
        type: "is-danger"
      });
    }
  },
  components: {
    FavoriteRestaurants,
    UserVisitList,
    UserInfo
  }
};
</script>

<style></style>
