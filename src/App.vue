<template>
  <ProfitCalculator />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfitCalculator from "./components/ProfitCalculator.vue";

export default defineComponent({
  name: "App",
  components: {
    ProfitCalculator,
  },
});
</script>

<style>
body{
  background: #EFEFEF;
}
</style>
