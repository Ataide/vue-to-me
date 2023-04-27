<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main-hero />
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import { onMounted } from "vue";
import MainHero from "../components/MainHero.vue";
import { db } from '../firebase/index';



export default {
  components: { MainHero },
  setup() {
    
   onMounted( async () => {
    const querySnapshot = await getDocs(collection(db, 'movies'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
    })

   
    // RoomsService.create({ name: "New Room"})
    //     .then(() => {
    //       console.log("Created new item successfully!");
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // axios.post('api/rooms', { name: "Nome da Sala"}).then(res => console.log(res.data))


    //  axios.get('api/rooms').then(res => console.log(res.data))
    
    // fetch("api/rooms")
    //   .then(res => console.log(res))
    //   .then(({ users }) => {
    //     console.log(users)
    //   });
   })
   
  }
}


</script>

<style></style>