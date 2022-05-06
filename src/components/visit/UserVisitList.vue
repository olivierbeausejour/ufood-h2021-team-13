<template>
  <div class="visited-restaurants">
    <h1 class="title is-3">Visited restaurants</h1>
    <div v-if="userVisitList.length > 0">
      <user-visit
        v-for="userVisit in userVisitList"
        v-bind:key="userVisit.id"
        v-bind:userVisit="userVisit"
      />
    </div>
    <div class="is-flex is-justify-content-center">
      <b-button
        v-if="userVisitList.length > 5"
        type="is-primary"
        v-bind:class="{
          'is-loading': viewLessButtonIsLoading || fetchingUserVisits
        }"
        class="m-4"
        @click="decrementRequestVisitsLimit"
      >
        View less
      </b-button>
      <b-button
        v-if="visitsLimit < userVisitListAll.length"
        type="is-primary"
        v-bind:class="{
          'is-loading': viewMoreButtonIsLoading || fetchingUserVisits
        }"
        class="m-4"
        @click="incrementRequestVisitsLimit"
      >
        View more
      </b-button>
    </div>
    <b-progress type="is-primary" v-if="fetchingUserVisits"></b-progress>
    <div v-if="!userVisitList.length && !fetchingUserVisits">
      <user-visit-empty />
    </div>
  </div>
</template>

<script>
import UserVisit from "./UserVisit";
import UserVisitEmpty from "./UserVisitEmpty";
import * as api from "../../api/ufoodApi";

export default {
  name: "user-visit-list",
  components: {
    UserVisit,
    UserVisitEmpty
  },
  data() {
    return {
      userVisitListAll: [],
      userVisitList: [],
      visitsLimit: 5,
      fetchingUserVisits: false,
      viewMoreButtonIsLoading: false,
      viewLessButtonIsLoading: false
    };
  },
  props: ["userId"],
  methods: {
    incrementRequestVisitsLimit() {
      this.visitsLimit = Math.min(
        this.userVisitListAll.length,
        this.visitsLimit + 5
      );
      this.userVisitList = [];
      for (let i = 0; i < this.visitsLimit; i++) {
        this.userVisitList.push(this.userVisitListAll[i]);
      }
    },
    decrementRequestVisitsLimit() {
      this.visitsLimit = Math.max(0, this.visitsLimit - 5);
      this.userVisitList = [];
      for (let i = 0; i < this.visitsLimit; i++) {
        this.userVisitList.push(this.userVisitListAll[i]);
      }
    }
  },
  async created() {
    this.fetchingUserVisits = true;

    const response = await api.getVisitedRestaurantLists(this.userId);
    const userVisitList = response.items;

    for (let i = 0; i < userVisitList.length; i++) {
      const restaurant = await api.getRestaurantById(
        userVisitList[i].restaurant_id
      );
      const numVisit = await api.getNumberOfTimesVisited(
        userVisitList[i].restaurant_id
      );
      userVisitList[i].restaurant = restaurant;
      userVisitList[i].numVisit = numVisit;
    }

    this.userVisitListAll = userVisitList.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    for (
      let i = 0;
      i < Math.min(this.visitsLimit, this.userVisitListAll.length);
      i++
    ) {
      this.userVisitList.push(this.userVisitListAll[i]);
    }

    this.fetchingUserVisits = false;
  }
};
</script>

<style scoped></style>
