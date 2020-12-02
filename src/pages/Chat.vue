<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      User is Offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(msg, index) in messages"
        :key="index"
        :name="msg.from"
        :text="[msg.text]"
        :sent="msg.from === 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-input
          bg-color="white"
          rounded
          outlined
          v-model="newMessage"
          class="full-width"
          label="Message"
          dense
        >
          <template v-slot:after>
            <q-btn
              type="submit"
              @click="sendMessage"
              round
              dense
              flat
              color="white"
              icon="send"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      newMessage: "",
    };
  },
  computed: {
    ...mapState('store', [
      'messages'
    ])
},
  methods: {
    ...mapActions("store", ["firebaseGetMessage", "firebaseStopGettingMessages"]),
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: "me"
      });
      this.newMessage = "";
      console.log(this.$route.params.otherUserID);
    }
  },
  mounted() {
    this.firebaseGetMessage(this.$route.params.otherUserID);
  },
  destroyed(){
    this.firebaseStopGettingMessages()
  }
};
</script>
