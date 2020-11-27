<template>
  <q-page class="flex column">
    <h5>Chat page</h5>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>
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
                round
                dense
                flat
                color="white"
                icon="send" />
            </template>
          </q-input>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  data(){
    return {
      newMessage: ''
    }
  }
};
</script>
