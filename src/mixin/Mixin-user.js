export default {
  computed: {
    otherUserDetaills() {
      if (this.$store.state.store.users[this.$route.params.otherUserID]) {
        return this.$store.state.store.users[this.$route.params.otherUserID];
      } else {
        return {};
      }
    },
  },
};
