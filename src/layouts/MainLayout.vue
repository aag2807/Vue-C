<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          flat
          dense
          v-go-back.single
          icon="arrow_back"
          label="back"
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userId"
          to="/auth"
          flat
          dense
          icon="account_circle"
          no-caps
          class="absolute-right q-pr-sm"
          label="Login"
        />

        <q-btn
          v-else
          flat
          dense
          @click="logoutUser"
          icon="account_circle"
          no-caps
          class="absolute-right q-pr-sm"
          >Log Out <br />
          {{ userDetails.name }}</q-btn
        >
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapState, mapActions } from "vuex";
import MixinUser from "../mixin/Mixin-user";

export default {
  name: "MainLayout",
  mixins: [MixinUser],
  components: { EssentialLink },
  computed: {
    ...mapState("store", ["userDetails"]),
    created() {
      console.log(this.$route.params);
    },
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "Vue-c";
      else if (currentPath.includes("/chat")) return this.otherUserDetaills.name;
      else if (currentPath == "/auth") return "Login";
    }
  },
  methods: {
    ...mapActions("store", ["logoutUser"])
  }
};
</script>

<style lang="stylus">
.q-toolbar
  .q-btn
    line-height: 1.2
</style>
