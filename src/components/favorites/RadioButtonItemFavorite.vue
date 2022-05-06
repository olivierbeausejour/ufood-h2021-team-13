<script>
export default {
  props: ["favoriteList"],
  name: "RadioButtonItemFavorite",
  data() {
    return {
      radio: "default"
    };
  },
  methods: {
    selectedRadio() {
      this.$emit("selectedList", this.favoriteList.id);
    }
  }
};
</script>

<template>
  <section>
    <b-radio
      v-model="radio"
      name="name"
      size="is-medium"
      :native-value="this.favoriteList.name"
      @click.native="selectedRadio"
      type="is-success"
    >
      {{ this.favoriteList.name }}
    </b-radio>
  </section>
</template>

<style></style>
