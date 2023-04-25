<template>
  <base-container class="h-screen">
    <div class="col-span-2 border border-cyan-800"  >
    
      <VueYtframe
        :video-id="video_id"
        :player-vars="{ autoplay: 1, listType: 'user_uploads' }"

      />
    

    
    </div>
    <div class="border border-cyan-800">02</div>
     <pre>id: {{ video_id }}</pre>
  </base-container>
 
</template>

<script>
import BaseContainer from "../components/layout/BaseContainer.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  props:['id'],
  components: { BaseContainer},
  data() {
    const route = useRoute();
    return {
      video_id: route.params.id.split('v=')[1]
    }

  },
  mounted() {
    const route = useRoute();
    const video_id = route.params.id;
  },
  methods: {
    getId(url) {
      const id_ = url.split('v=');
      console.log(id)

    }
  },
}


</script>