<template>
  <div class="max-w-[75rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(room, index) in rooms"
        :key="index" 
        class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl "
      >
        <div class="flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
          <img
            class="object-contains h-52 rounded-xl w-full"
            :src="`${room.thumbnail_url}`"
            alt=""
          >
        </div>
      
        <div class="p-4 md:p-6">
          <span class="block mb-1 text-xs font-semibold uppercase text-blue-600 ">
            {{ room.author_name }}
            
          </span>
          <h3 class="text-xl font-semibold text-gray-800">
            {{ room.title }}
          </h3>
          <br>
          <span class="text-sm text-green-800">{{ room.likes }} Like</span>
          <span class="ml-5 text-sm text-gray-600">{{ room.views }} Vizualizações</span>
        </div>
        <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
          <button
            class="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4"
            @click="joinRoom(room.id_video)"
          >
            Entrar na Sala
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import RoomService from "../services/RoomService";

  export default {
    name: 'ItemRooms',

    setup() {
      const rooms = ref([]);
      const unsubscribe = ref(null);
      const router = useRouter();

      const joinRoom = (id_video) => {
        router.push({ name: 'room', params: { id: id_video } })
      }

      const onDataChange = (items) => {
      
        let _rooms = [];

        items.forEach((item) => {
          let id = item.id;
          let data = item.data();
          _rooms.push(data);
        });

        rooms.value = _rooms;
      }
      
      onMounted( async () => {
        unsubscribe.value = RoomService.getAll().onSnapshot(onDataChange);
      })
   
      onBeforeUnmount(() => {
        unsubscribe.value();
      })

      return { rooms, joinRoom }
    }
  }


</script>

<style>
</style>