<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item
        v-for="(user, i) in users"
        to="/chat"
        :key="i"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name[0]}}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'cyan-9' : 'red-4'">
            {{ user.online ? "Online" : "Offline" }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("store", ["users"])
  }
};
</script>
