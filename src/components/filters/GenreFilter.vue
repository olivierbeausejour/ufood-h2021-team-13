<template>
  <b-menu-item class="genre-filter" icon="food" :expanded="true">
    <template #label="props">
      Genre
      <b-icon
        class="is-pulled-right"
        :icon="props.expanded ? 'menu-up' : 'menu-down'"
      ></b-icon>
    </template>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="ambiance"
        @input="onGenreChecked"
        >Ambience</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="asiatique"
        @input="onGenreChecked"
        >Asian</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="bistro"
        @input="onGenreChecked"
        >Bistro</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="charcuterie"
        @input="onGenreChecked"
        >Delicatessen</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="desserts"
        @input="onGenreChecked"
        >Desserts</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="européen"
        @input="onGenreChecked"
        >European</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="fast-food"
        @input="onGenreChecked"
        >Fast food</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="grec"
        @input="onGenreChecked"
        >Greek</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="hamburgers"
        @input="onGenreChecked"
        >Hamburgers</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="happy hour"
        @input="onGenreChecked"
        >Happy hour</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="santé"
        @input="onGenreChecked"
        >Healthy</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="indien"
        @input="onGenreChecked"
        >Indian</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="italien"
        @input="onGenreChecked"
        >Italian</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="japonais"
        @input="onGenreChecked"
        >Japanese</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="libanais"
        @input="onGenreChecked"
        >Libanese</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="mexicain"
        @input="onGenreChecked"
        >Mexican</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="cuisine moléculaire"
        @input="onGenreChecked"
        >Molecular gastronomy</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="pizzeria"
        @input="onGenreChecked"
        >Pizzeria</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="steakhouse"
        @input="onGenreChecked"
        >Steakhouse</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="fruits de mer"
        @input="onGenreChecked"
        >Seafood</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="végétarien"
        @input="onGenreChecked"
        >Vegetarian</b-checkbox
      >
    </b-field>
    <b-field>
      <b-checkbox
        v-model="checkedGenres"
        native-value="vietnamien"
        @input="onGenreChecked"
        >Vietnamese</b-checkbox
      >
    </b-field>
  </b-menu-item>
</template>

<script>
export default {
  name: "genre-filter",
  data() {
    return {
      checkedGenres: []
    };
  },
  props: ["onGenresChange"],
  methods: {
    onGenreChecked() {
      this.onGenresChange(this.checkedGenres);
    }
  }
};
</script>

<style scoped>
.genre-filter {
  max-height: 580px;
  overflow-y: scroll;
}
</style>
