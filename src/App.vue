<template>
  <GoodsList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GoodsList from './components/GoodsList.vue';

export default defineComponent({
  name: 'App',
  components: { GoodsList },
});
</script>

<style lang="scss">
@import 'the-new-css-reset/css/reset.css';
body {
  max-width: 1140px;
  margin: auto;
  padding: 15px;
}
</style>
