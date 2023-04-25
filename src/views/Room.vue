<template>
  <base-container class="h-screen">
    <div class="col-span-2 border border-cyan-800"  >
    
      <VueYtframe
        :video-id="video_id"
        :player-vars="{ autoplay: 1, listType: 'user_uploads' }"

      />
    

    
    </div>
    <div class="">
      <div class="panel">
      <h5 class="text-center">{{ this.CHANNEL }}</h5>
      <p>Online Users: {{users}}</p>
        <div class="messages" ref="messagesRef">
          <div class="inner">
            <div
              :key="index"
              v-for="(message, index) in messages"
              class="message"
            >
              <div v-if="message.uid === uid" class="user-self">
                You:&nbsp;
              </div>
              <div v-else class="user-them text-right">Anonimo-{{ message.uid.split('-')[0] }}:&nbsp;</div>
              <div class="text">{{ message.text }}</div>
            </div>
          </div>
        </div>

        <form @submit.prevent="sendMessage(text)">
          <input v-model="text" />
          <button>+</button>
        </form>
        
      </div>
    
    </div>
    
  </base-container>
 
</template>

<script>
import BaseContainer from "../components/layout/BaseContainer.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted, nextTick, defineExpose } from 'vue';

  const APP_ID = '31161fd2a90f4fed83de6532f70d9763';
  let client = AgoraRTM.createInstance(APP_ID); 
  let messagesRef = ref(null);  
  let channel;

  defineExpose({ messagesRef });

export default {
  props:['id'],
  components: { BaseContainer},
  data() {
    const route = useRoute();
    return {
      uid: '',
      CHANNEL: route.params.id.split('v=')[1],
      users: '1',
      text: '',
      messages: [],
      video_id: route.params.id.split('v=')[1]
    }

  },
  async mounted() {
    if (localStorage.uid) {
      this.uid = localStorage.uid;
    } else {
      this.uid = uuidv4();
    }

    this.configure();
  },
  watch: {
    uid(newName) {
      localStorage.uid = newName;
    }
  },
  methods: {
    sendMessage() {
      if (this.text === '') return;
      channel.sendMessage({ text: this.text, type: 'text' });
      this.appendMessage({
        text: this.text,
        uid: this.uid,
      });
      this.text = '';
    },
    async appendMessage(message) {
      this.messages.push(message);
      await nextTick();
    },
    async configure() {
      await client.login({ uid: this.uid, token: null });
      channel = await client.createChannel(this.CHANNEL);
      await channel.join();
      channel.getMembers().then((value) => {
        this.users = value.length;
      })
      channel.on('ChannelMessage', (message, peerId) => {
        this.appendMessage({
          text: message.text,
          uid: peerId,
        });
      }); 
      channel.on('MemberLeft', () => {
        channel.getMembers().then((value) => {
        this.users = value.length;
      })
      });
      channel.on('MemberJoined', () => {
        channel.getMembers().then((value) => {
        this.users = value.length;
      })
      });

    }
  }
 
}


</script>

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