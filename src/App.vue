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

<style lang="scss"></style>
