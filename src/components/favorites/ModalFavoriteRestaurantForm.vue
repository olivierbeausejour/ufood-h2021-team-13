<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ actionType }} list</p>
        <button type="button" class="delete" v-on:click="onClose" />
      </header>
      <section class="modal-card-body">
        <b-field
          label="Name"
          v-if="actionType === 'Create' || actionType === 'Rename'"
        >
          <b-input type="text" v-model="inputValue" required></b-input>
        </b-field>
        <p v-if="actionType === 'Delete'">
          Are you sure you want to delete "{{
            this.favoriteRestaurantList.name
          }}" ?
        </p>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Cancel" v-on:click="onClose" />
        <b-button
          :label="actionType"
          type="is-primary"
          v-on:click="onActionButtonClick()"
        />
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: "modal-favorite-restaurant-form",
  data() {
    return {
      inputValue: ""
    };
  },
  props: ["favoriteRestaurantList", "actionType", "onAction", "onClose"],
  created() {
    if (this.actionType === "Create") {
      this.inputValue = "New favorite list";
    } else if (this.actionType === "Rename") {
      this.inputValue = this.favoriteRestaurantList.name;
    }
  },
  methods: {
    onActionButtonClick() {
      if (this.actionType === "Create") {
        if (this.inputValue.length === 0) return;
        this.onAction(this.inputValue);
      } else if (this.actionType === "Rename") {
        if (this.inputValue.length === 0) return;
        this.onAction(this.favoriteRestaurantList.id, this.inputValue);
      } else if (this.actionType === "Delete") {
        this.onAction(this.favoriteRestaurantList.id);
      }
      this.onClose();
    }
  }
};
</script>
