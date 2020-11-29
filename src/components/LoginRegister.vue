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
export default {
  name: "LoginRegister",
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      if (this.tab === 'login'){
        console.log('login user')
      } else {
        console.log('register user')
      }
    }
  },
};
</script>

<style></style>
