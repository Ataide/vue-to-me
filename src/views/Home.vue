<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main-hero />
  <item-rooms />
</template>

<script>
import MainHero from "../components/MainHero.vue";
import ItemRooms from "../components/RoomItem.vue";

export default {
  components: { MainHero, ItemRooms },
  setup() {
  }
}


</script>

<style></style>