<template>
  <div>
    <base-container class="h-screen">
      <div class="col-span-2 border border-cyan-800">
        <VueYtframe
          ref="yt"
          :video-id="CHANNEL"
          :player-vars="{ autoplay: 1, listType: 'user_uploads', controls: 0 }"
        />
      </div>
      <div class="col-span-2 sm:col-span-2 md:col-span-1  w-full">
        <div class="panel">
          <h5 class="h-10 text-center text-orange-600">
            {{ CHANNEL }}
          </h5>
          <p class="text-sm text-gray-500 m-1">
            {{ views }} visualizações
          </p>
          <button
            class="m-3"
            @click="leaveRoom"
          >
            Sair da sala
          </button>
          <div class="flex gap-10 bg-slate-500 text-white p-2">
            <!-- Icone da quantidades de usuarios na Sala -->
            <div class="flex items-center ml-2">
              <svg-icon
                :fa-icon="faUsers"
                size="24"
                viewbox="0 0 24 24"
              />
              <p class="ml-2">
                {{ users }}
              </p>
            </div>
            <!-- Icone do Like -->
            <button
              class="flex items-center"
              @click="likeVideo"
            >
              <svg-icon 
                class="hover:text-orange-500"
                :fa-icon="faHeart"
                size="24"
                viewbox="0 0 24 24"
              />
              <p class="ml-2">
                {{ likes }}
              </p>
            </button>
          </div>
          <div
            ref="messagesRef"
            class="messages"
          >
            <div class="inner">
              <div
                v-for="(message, index) in messages"
                :key="index"
                class="message"
              >
                <div
                  v-if="message.uid === uid"
                  class="user-self"
                >
                  You:&nbsp;
                </div>
                
                <div
                  v-else
                  class="user-them text-right"
                >
                  Anonimo-{{ message.uid.split('-')[0] }}:&nbsp;
                </div>
                <div class="text">
                  {{ message.text }}
                </div>
              </div>
            </div>
          </div>
  
          <form @submit.prevent="sendMessage(text)">
            <input v-model="text">
            <button>+</button>
          </form>
        </div>
      </div>
    </base-container>
  </div>
</template>
<script>
import { faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";
import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuidv4 } from 'uuid';
import { nextTick, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import SvgIcon from "vue3-icon";
import BaseContainer from "../components/layout/BaseContainer.vue";
import RoomService from "../services/RoomService";
 
  export default {
    name: 'MainRoom',
    components: { BaseContainer },
    props:['id'],
    setup() {
      const APP_ID = '31161fd2a90f4fed83de6532f70d9763';
      let client = AgoraRTM.createInstance(APP_ID);
      let channel;

      const yt = ref(null);
      const firestore_id = ref(null);
      const users = ref(0);
      const likes = ref(0);
      const isLiked = ref(false);
      const views = ref('');
      const text = ref('');
      const messages = ref([]);
      const uid = ref('');
      const unsubscribe = ref(null);

      const route = useRoute();
      const router = useRouter();
      const CHANNEL = route.params.id;
      
      const sendMessage = () => {
        if (text.value === '') return;
        channel.sendMessage({ text: text.value, type: 'text' });
        appendMessage({
          text: text.value,
          uid: uid.value,
        });
        text.value = '';
      }

      const appendMessage = async (message) => {
        messages.value.push(message);
        await nextTick();
      }

      const likeVideo = async () => {
        RoomService.update(firestore_id.value, { likes: likes.value + 1})
          .then(() => {
           console.log("Adicionado Like na Sala");
          })
          .catch((e) => {
            console.log(e);
          });
      }

      const incrementViews = async () => {
        RoomService.update(firestore_id.value, { views: views.value + 1})
          .then(() => {
           console.log("Adicionado nova Visualização");
          })
          .catch((e) => {
            console.log(e);
          });
      }

      const initalizeAgora = async () => {
        incrementViews();
        await client.login({ uid: uid.value, token: null });
        channel = await client.createChannel(CHANNEL);
        await channel.join();

        channel.getMembers().then((value) => {
          users.value = value.length;
        });      

        channel.on('ChannelMessage', (message, peerId) => {
          appendMessage({
            text: message.text,
            uid: peerId,
          });
        }); 
        channel.on('MemberLeft', () => {
          channel.getMembers().then((value) => {
            users.value = value.length;
          })
        });
        channel.on('MemberJoined', () => {
          channel.getMembers().then((value) => {
            users.value = value.length;
          })
        });

      }

      const leaveRoom = () => {
        router.push('/')
      }

      const onDataChange = (item) => {   
        const snapshot = item.docs[0]  
        likes.value = snapshot.data().likes;
        views.value = snapshot.data().views;
        firestore_id.value = snapshot.id;
      }

      onMounted(() => {
        if (localStorage.uid) {
          uid.value = localStorage.uid;
        } else {
          uid.value = uuidv4();
          localStorage.uid = uid.value;
        }
        unsubscribe.value = RoomService.getByVideoId(CHANNEL).onSnapshot(onDataChange);
        initalizeAgora();
        
        setTimeout(() => {
          incrementViews();
        }, 1000)

      })

      onUnmounted( async () => {
        await channel.leave();
        await client.logout();
      });
      
      onBeforeUnmount(() => {
        unsubscribe.value();
      })

      return { SvgIcon ,faUsers, leaveRoom, likeVideo ,views, likes, faHeart, APP_ID, CHANNEL, sendMessage, users, messages, uid, yt, text }
    }
  }
</script>



<style>

.panel {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.messages {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: white;
}
.inner {
  padding: 10px;
}
.message {
  text-align: left;
  display: flex;
  margin-bottom: 6px;
}
.user-self {
  color: green;
}
.user-them {
  color: red;
}
form {
  position: relative;
  display: flex;
}
input {
  width: 100%;
  border: none;
  height: 40px;
  padding: 8px;
  border-top: 1px solid #999;
  border-radius: 0px;
  outline: none;
}

</style>