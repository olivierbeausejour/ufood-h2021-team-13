<template>
  <b-menu-item icon="currency-usd" :expanded="true">
    <template #label="props">
      Price range
      <b-icon
        class="is-pulled-right"
        :icon="props.expanded ? 'menu-up' : 'menu-down'"
      ></b-icon>
    </template>
    <b-slider
      v-model="sliderPriceRange"
      @input="onPriceRangeSliderChange"
      :min="1"
      :max="4"
      :tooltip="false"
    >
      <b-slider-tick class="mt-2" :value="1">$</b-slider-tick>
      <b-slider-tick class="mt-2" :value="2">$$</b-slider-tick>
      <b-slider-tick class="mt-2" :value="3">$$$</b-slider-tick>
      <b-slider-tick class="mt-2" :value="4">$$$$</b-slider-tick>
    </b-slider>
  </b-menu-item>
</template>

<script>
export default {
  name: "price-range-filter",
  data() {
    return {
      sliderPriceRange: [1, 4]
    };
  },
  props: ["onPriceRangeChange"],
  methods: {
    onPriceRangeSliderChange() {
      const newPriceRanges = [];
      for (let k = this.sliderPriceRange[0]; k <= this.sliderPriceRange[1]; k++)
        newPriceRanges.push(k);
      this.onPriceRangeChange(newPriceRanges);
    }
  }
};
</script>
