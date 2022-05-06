<template>
  <div class="box">
    <div class="empty-resto-container">
      <p>
        You haven't visited a restaurant yet<br />
        <a href="#/">Click to return to the homepage</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-visit-empty",

  props: ["userVisitEmpty"]
};
</script>

<style>
.empty-resto-container {
  line-height: 2;
}
</style>
