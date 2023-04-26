<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex h-screen items-center justify-center bg-[#fbfbfb]">
    <div class="grid w-80 grid-rows-4 gap-1">
      <p class="font-semibold text-gray-700">
        GeTTin é uma plataforma de compatilhamento de video com chat.
      </p>
      <input
        v-model="id_video"        
        type="text"
        class="h-10 w-full rounded border p-2 text-sm"
        placeholder="URL do Vídeo (YT)"
      >
      <button
        @click="$router.push({ name: 'room', params: { id: id_video } })"
      >
        Agora e nesse
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const id_video = ref('');
    return { id_video };
  },
};
</script>

<style></style>