<template>
  <q-page ref="pageChat" class="flex column pageChat">
    <q-banner v-if="!otherUserDetaills.online" class="bg-grey-4 text-center fixed-top">
      {{ otherUserDetaills.name }} is Offline
    </q-banner>
    <div
      :class="{ invisible: !showMessages }"
      class="q-pa-md column col justify-end"
    >
      <q-chat-message
        v-for="(msg, index) in messages"
        :key="index"
        :name="msg.from == 'me' ? userDetails.name : otherUserDetaills.name"
        :text="[msg.text]"
        :sent="msg.from === 'me' ? true : false"
        :bg-color="msg.from == 'me' ? 'white' : 'light-green-2'"
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
import MixinUser from "../mixin/Mixin-user";

export default {
  data() {
    return {
      newMessage: "",
      showMessages: false
    };
  },
  mixins: [MixinUser],
  computed: {
    ...mapState("store", ["messages", "userDetails"])
  },
  methods: {
    ...mapActions("store", [
      "firebaseGetMessage",
      "firebaseStopGettingMessages",
      "firebaseSendMessage"
    ]),
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: "me"
        },
        otherUserID: this.$route.params.otherUserID
      });
      this.newMessage = "";
    },
    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
      }, 20);
    }
  },
  watch: {
    messages(val) {
      if (Object.keys(val).length) {
        this.scrollToBottom();
        setTimeout(() => {
          this.showMessages = true;
        }, 200);
      }
    }
  },
  mounted() {
    this.firebaseGetMessage(this.$route.params.otherUserID);
  },
  destroyed() {
    this.firebaseStopGettingMessages();
  }
};
</script>

<style lang="stylus" scoped>
.pageChat
   background-color: #e2dfd5;
   &:after
      content: ''
      display block
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      opacity 0.1
      z-index 0
      background-image radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
        radial-gradient(circle at 0    150%, silver 24%, white 24%, white 28%, silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
        radial-gradient(circle at 50%  100%, white 10%, silver 10%, silver 23%, white 23%, white 30%, silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%, white 71%, transparent 71%, transparent),
        radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),
        radial-gradient(circle at 0    50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent)
      background-size 100px 50px

.q-banner
  top 50px
  z-index 2
  opacity 0.8

.q-message
  z-index 1
</style>
