<template>
  <div class="box">
    <div class="resto-item-container">
      <img
        v-bind:src="userVisit.restaurant.pictures[0]"
        class="image-resto"
        alt="image-restaurant"
      />
      <div class="resto-text">
        <h2 class="title is-4">{{ userVisit.restaurant.name }}</h2>
        <p>
          <span v-bind:formatedDate="formatedDate">
            Visited on : {{ formatedDate }} </span
          ><br />
          Times visited : {{ userVisit.numVisit.total }}
        </p>
      </div>
      <modal-visit-restaurant
        class="section"
        v-bind:isReadOnly="true"
        v-bind:userVisit="userVisit"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import ModalVisitRestaurant from "./ModalVisitRestaurant.vue";

export default {
  components: { ModalVisitRestaurant },
  name: "user-visit",
  props: ["userVisit"],
  computed: {
    formatedDate: function() {
      return moment(this.userVisit.date).format("YYYY-MM-DD, h:mm a");
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 18px;
}
.resto-item-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: normal;
}
.resto-text {
  padding-top: 20px;
  line-height: 2;
}

.image-resto {
  width: 100%;
  height: 100%;
  max-height: 250px;
  max-width: 250px;
  position: relative;
  align-content: center;
  padding: 18px;
}
</style>
