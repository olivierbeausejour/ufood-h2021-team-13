<template>
  <b-menu-item icon="chart-box" :expanded="true">
    <template #label="props">
      Restaurants shown
      <b-icon
        class="is-pulled-right"
        :icon="props.expanded ? 'menu-up' : 'menu-down'"
      ></b-icon>
    </template>
    <b-numberinput
      v-model="limit"
      :min="1"
      @input="onPriceRangeSliderChange"
    ></b-numberinput>
  </b-menu-item>
</template>

<script>
export default {
  name: "price-range-filter",
  data() {
    return {
      limit: this.itemsLimit
    };
  },
  props: ["onItemsLimitChange", "itemsLimit"],
  created() {
    this.$root.$on("onViewMoreRestaurants", newItemsLimit => {
      this.limit = newItemsLimit;
    });
  },
  methods: {
    onPriceRangeSliderChange() {
      this.onItemsLimitChange(this.limit);
    }
  }
};
</script>
