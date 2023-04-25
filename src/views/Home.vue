<template>
 
  <div class="flex h-screen items-center justify-center bg-[#fbfbfb]">
    <div class="grid w-80 grid-rows-4 gap-1">
      <p class="font-semibold text-gray-700">💌 Get the best of Product Hunt, directly in your inbox.</p>
      <input v-model="id_video" type="text" class="h-10 w-full rounded border p-2 text-sm" placeholder="URL do Vídeo (YT)" />
      
      <button
        @click="$router.push({ name: 'room',  params: { id: id_video } })"
         >Agora e nesse</button>
       <pre>id: {{ id_video }}</pre>
        
    </div>
  </div>


</template>

<script>
import BaseContainer from "../components/layout/BaseContainer.vue";
import DefaultBox from "../components/layout/DefaultBox.vue";

export default {
  components: { BaseContainer, DefaultBox },
  data() {
    return {
      id_video: ''
    }
  },
  setup() {
    const list = [
      { id: 9, title: "Tailwind CSS" },
    ];
    return { list };
  },
};
</script>

<style></style>