<template>
  <ul class="breadcrumbs">
    <li v-for="(item, index) in breadcrumbs" :key="item">
      <button @click="handleBreadcrumbs(breadcrumbs, index)">{{ item }}</button>
    </li>
  </ul>
  <div v-if="!isLoading">
    <ul v-if="current !== 'params'">
      <li v-for="item in data" :key="item.name">
        <button @click="setCurrentData(item.id, item.name)">{{ item.name }}</button>
      </li>
    </ul>
    <ul v-else>
      {{
        params
      }}
    </ul>
  </div>
  <div v-else>Loading...</div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { key, CURRENT } from '../store';

const store = useStore(key);
const current = computed(() => store.state.current);
const params = computed(() => store.state.params);
const breadcrumbs = computed(() => store.state.breadcrumbs);
const isLoading = computed(() => store.state.loading);

const data = computed(() => store.getters.getCurrentData);
const handleBreadcrumbs = (array: string[], index: number) => {
  const filtered = array.filter((item, i) => index > i || index === i);
  store.dispatch('setBreadcrumbs', filtered);
  store.dispatch('setCurrent', CURRENT[index]);
};
const setCurrentData = (id?: number, name?: string) => {
  switch (current.value) {
    case 'autos':
      store.dispatch('fetchModels', id);
      store.dispatch('setCurrent', 'models');
      store.dispatch('setBreadcrumbs', [...breadcrumbs.value, name]);
      break;
    case 'models':
      store.dispatch('fetchModifications', id);
      store.dispatch('setCurrent', 'modifications');
      store.dispatch('setBreadcrumbs', [...breadcrumbs.value, name]);
      break;
    case 'modifications':
      store.dispatch('fetchParams', id);
      store.dispatch('setCurrent', 'params');
      store.dispatch('setBreadcrumbs', [...breadcrumbs.value, name]);
      break;
    default:
      break;
  }
};
onMounted(() => {
  store.dispatch('fetchAutos');
});
</script>
<style scoped lang="scss">
ul {
  column-count: 5;
  @media screen and (max-width: 768px) {
    column-count: 3;
  }
  @media screen and (max-width: 480px) {
    column-count: 2;
  }
  li {
    list-style: none;
    button {
      cursor: pointer;
    }
  }
  &.breadcrumbs {
    display: flex;
  }
}
</style>
