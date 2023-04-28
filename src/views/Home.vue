<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main-hero />
  <item-rooms />
</template>

<script>
import { onMounted } from "vue";
import MainHero from "../components/MainHero.vue";
import ItemRooms from "../components/RoomItem.vue";

export default {
  components: { MainHero, ItemRooms },
  setup() {
    onMounted(() => {
      console.log('Poderia ser uma aplicação de leilão virtual!?')
    })
  }
}


</script>

<style></style>