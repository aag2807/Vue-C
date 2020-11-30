<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      outlined
      class="q-mb-md"
      v-model="formData.name"
      label="Name"
    />
    <q-input
      outlined
      class="q-mb-md"
      v-model="formData.email"
      label="Email"
      type="email"
    />
    <q-input
      outlined
      class="q-mb-md"
      v-model="formData.password"
      label="Password"
      type="password"
    />
  <div class="row">
    <q-space />
    <q-btn type="submit" color="primary" :label="tab" />
    <q-space />
  </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "LoginRegister",
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "aagn2807@gmail.com",
        password: "asdasd1"
      }
    };
  },
  methods: {
    ...mapActions('store', [
      'registerUser',
      'loginUser'
    ]),
    submitForm() {
      if (this.tab === 'login'){
        this.loginUser(this.formData)
      } else {
        this.registerUser(this.formData)
      }
    }
  },
};
</script>

<style></style>
