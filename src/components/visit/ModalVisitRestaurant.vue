<template>
  <div id="app">
    <b-button
      :class="[
        this.isSmall ? 'tag' : '',
        this.isSmall ? 'ml-1' : '',
        !this.isSmall ? 'button' : '',
        !this.isSmall ? 'is-medium' : '',
        'is-primary'
      ]"
      @click="isComponentModalActive = true"
    >
      {{ this.isReadOnly ? "View visit" : "Add visit" }}
    </b-button>
    <section>
      <b-modal :active.sync="isComponentModalActive" has-modal-card>
        <div class="modal-card modal-form">
          <header class="modal-card-head">
            <p class="modal-card-title">
              {{ this.isReadOnly ? "View visit" : "Add visit" }}
            </p>
          </header>
          <section class="modal-card-body">
            <b-field label="Visit date">
              <b-datepicker
                v-model="selectedDate"
                :show-week-number="showWeekNumber"
                :locale="locale"
                :disabled="this.isReadOnly"
                :maxDate="this.maxDate"
                placeholder="Click to select..."
                icon="calendar-today"
                trap-focus
              >
              </b-datepicker>
            </b-field>
            <b-field label="Rate us">
              <section>
                <b-rate :disabled="this.isReadOnly" v-model="rating"> </b-rate>
              </section>
            </b-field>
            <b-field label="Comment">
              <b-input
                maxlength="250"
                type="textarea"
                placeholder="Comment about our restaurant"
                :disabled="this.isReadOnly"
                v-model="comment"
              >
              </b-input>
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
            <button
              v-if="!this.isReadOnly"
              class="button is-primary"
              @click="postVisit"
            >
              Send
            </button>
          </footer>
        </div>
      </b-modal>
    </section>
  </div>
</template>
<script>
import * as api from "../../api/ufoodApi";

export default {
  props: ["restaurantId", "userVisit", "isReadOnly", "isSmall"],
  name: "ModalVisitRestaurant",
  data() {
    return {
      isComponentModalActive: false,
      selectedDate: new Date(),
      maxDate: new Date(),
      rating: 5,
      comment: "",
      showWeekNumber: false,
      locale: undefined
    };
  },
  async created() {
    if (this.isReadOnly && this.userVisit) {
      this.comment = this.userVisit.comment;
      this.rating = this.userVisit.rating;
      this.selectedDate = new Date(this.userVisit.date);
    }
  },
  methods: {
    postVisit() {
      api.createUserVisitRestaurant(
        this.restaurantId,
        this.comment,
        this.rating,
        this.selectedDate
      );
      this.$buefy.toast.open({
        message: "Thanks for your visit!",
        type: "is-success"
      });
      this.isComponentModalActive = false;
    }
  }
};
</script>
<style scoped>
.modal-form {
  width: 500px;
}
@media only screen and (max-width: 500px) {
  .modal-form {
    width: 80%;
    margin: auto;
  }
}
</style>
