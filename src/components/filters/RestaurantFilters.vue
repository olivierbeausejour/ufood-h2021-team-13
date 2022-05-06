<template>
  <div class="sticky">
    <div class="block">
      <button
        id="filters-toggle-button"
        class="button is-primary is-hidden-desktop"
        @click="filtersToggleButtonOnClick"
      >
        <span class="icon">
          <i class="fas fa-sliders-h"></i>
        </span>
      </button>
    </div>
    <b-menu
      id="filters-container"
      v-bind:class="{ 'is-hidden-touch': !filtersContainerActive }"
      :accordion="false"
      :activable="false"
    >
      <b-menu-list label="Filter options">
        <price-range-filter v-bind:onPriceRangeChange="onPriceRangeChange" />
        <items-limit-filter
          v-bind:onItemsLimitChange="onItemsLimitChange"
          v-bind:itemsLimit="itemsLimit"
        />
        <genre-filter v-bind:onGenresChange="onGenresChange" />
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
import PriceRangeFilter from "./PriceRangeFilter";
import ItemsLimitFilter from "./ItemsLimitFilter";
import GenreFilter from "./GenreFilter";

export default {
  name: "restaurant-filters",
  data() {
    return {
      priceRanges: [],
      genres: [],
      filtersContainerActive: false
    };
  },
  props: ["setPriceRange", "setItemsLimit", "itemsLimit", "setGenres"],
  methods: {
    filtersToggleButtonOnClick() {
      this.filtersContainerActive = !this.filtersContainerActive;
    },
    onPriceRangeChange(newPriceRanges) {
      this.priceRanges = newPriceRanges;
      this.setPriceRange(this.priceRanges);
    },
    onItemsLimitChange(newItemsLimit) {
      this.setItemsLimit(newItemsLimit);
    },
    onGenresChange(newGenres) {
      this.genres = newGenres;
      this.setGenres(this.genres);
    }
  },
  components: {
    PriceRangeFilter,
    ItemsLimitFilter,
    GenreFilter
  }
};
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 32px;
}
</style>
