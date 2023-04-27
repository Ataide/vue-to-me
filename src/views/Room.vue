<script>
import { faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";
import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuidv4 } from 'uuid';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from "vue-router";
import SvgIcon from "vue3-icon";
import BaseContainer from "../components/layout/BaseContainer.vue";


  const myCustomIcon = "M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
  const HeartIcon = "M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"
 
  export default {
    name: 'MainRoom',
    components: { BaseContainer },
    props:['id'],
    
    setup() {
      const APP_ID = '31161fd2a90f4fed83de6532f70d9763';
      let client = AgoraRTM.createInstance(APP_ID);
      let channel;

      const yt = ref(null);
      const users = ref(0);
      const likes = ref(4);
      const text = ref('');
      const messages = ref([]);
      const uid = ref('');

      const route = useRoute();
      const CHANNEL = route.params.id.split('v=')[1];

      // let messagesRef = ref(null);  
      // defineExpose({ messagesRef });

      const onStateChange = (event) => {
        // alert('asd')
        // if (event.getPlayerState() === 1) {
        //   // control the frames using the template reference
        //   yt.value.forEach((video) => {
        //     if (video.getVideoUrl() !== event.getVideoUrl()) {
        //       video.pauseVideo()
        //     }
        //   })
        // }
      }

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

      const initalizeAgora = async () => {
        await client.login({ uid: uid.value, token: null });
        channel = await client.createChannel(CHANNEL);
        await channel.join();

        channel.getMembers().then((value) => {
          users.value = value.length;
        });

        const attr =  await channel.getChannelMetadata();
        console.log(attr);
        

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

      onMounted(() => {
        if (localStorage.uid) {
          uid.value = localStorage.uid;
        } else {
          uid.value = uuidv4();
          localStorage.uid = uid.value;
        }

        initalizeAgora();
        

      })
      onUnmounted( async () => {
        await channel.leave();
        await client.logout();

      });



      return { SvgIcon,faUsers, likes, faHeart, myCustomIcon, APP_ID, CHANNEL, onStateChange, sendMessage, users, messages, uid, yt, text }
    }
    
  }
</script>

<template>
  <div>
    <base-container class="h-screen">
      <div class="col-span-2 border border-cyan-800">
        <VueYtframe
          ref="yt"
          :video-id="CHANNEL"
          :player-vars="{ autoplay: 1, listType: 'user_uploads', controls: 0 }"
          @state-change="onStateChange"
        />
      </div>
      <div class="">
        <div class="panel">
          <h5 class="h-10 text-center text-orange-600">
            {{ CHANNEL }}
          </h5>
          <p class="text-sm text-gray-500 m-1">
            12 visualizações
          </p>
          <button>Testes</button>
          <div class="flex gap-10 bg-slate-500 text-white p-1">
            <!-- Icone da quantidades de usuarios na Sala -->
            <div class="flex items-center">
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
            <button class="flex items-center">
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

<style>

.panel {
  display: flex;
  flex-direction: column;
  height: 100%;
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