<script>
  import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuidv4 } from 'uuid';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from "vue-router";
import SvgIcon from "vue3-icon";
import BaseContainer from "../components/layout/BaseContainer.vue";

  const myCustomIcon = "M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"

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



      return { SvgIcon, myCustomIcon, APP_ID, CHANNEL, onStateChange, sendMessage, users, messages, uid, yt, text }
    }
    
  }






  // export default {
  //   name: 'RoomItem',
  //   components: { BaseContainer},
  //   props:['id'],
  //   data() {
  //     const route = useRoute();
  //     return {
  //       uid: '',
  //       CHANNEL: route.params.id.split('v=')[1],
  //       users: '1',
  //       text: '',
  //       messages: [],
  //       video_id: route.params.id.split('v=')[1]
  //     }

  //   },
  //   watch: {
  //     uid(newName) {
  //       localStorage.uid = newName;
  //     }
  //   },
  //   async mounted() {
  //     // yt.value.forEach((video) => {
  //     //   console.log(video)
  //     // })
  //     if (localStorage.uid) {
  //       this.uid = localStorage.uid;
  //     } else {
  //       this.uid = uuidv4();
  //     }

  //     this.configure();
  //   },
  //   methods: {
  //     sendMessage() {
  //       if (this.text === '') return;
  //       channel.sendMessage({ text: this.text, type: 'text' });
  //       this.appendMessage({
  //         text: this.text,
  //         uid: this.uid,
  //       });
  //       this.text = '';
  //     },
  //     async appendMessage(message) {
  //       this.messages.push(message);
  //       await nextTick();
  //     },
  //     async configure() {      
  //       const con = await client.login({ uid: this.uid, token: null });      
  //       channel = await client.createChannel(this.CHANNEL);
        
  //       con.setChatRoomAttribute({chatRoomId: this.CHANNEL, attributeKey: "attributeKey1", attributeValue: "attributeValue1"})
        
  //       await channel.join();
        
  //       channel.getMembers().then((value) => {
  //         this.users = value.length;
  //       })
  //       channel.on('ChannelMessage', (message, peerId) => {
  //         this.appendMessage({
  //           text: message.text,
  //           uid: peerId,
  //         });
  //       }); 
  //       channel.on('MemberLeft', () => {
  //         channel.getMembers().then((value) => {
  //         this.users = value.length;
  //       })
  //       });
  //       channel.on('MemberJoined', () => {
  //         channel.getMembers().then((value) => {
  //         this.users = value.length;
  //       })
  //       });

  //     },
  //     onStateChange(event) {
      
  //       console.log(event.getVideoUrl());
  //     }

  //   }
  
  // }
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
          <svg-icon
            :path="myCustomIcon"
            size="24"
            viewbox="0 0 24 24"
          />

          <h5 class="text-center">
            {{ CHANNEL }}
          </h5>
          <p>Online Users: {{ users }}</p>
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
button {
  border: none;
  outline: none;
  background: none;
  position: absolute;
  right: 3px;
  top: 4px;
  font-size: 24px;
}

</style>