<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
           {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'



export default {
  name: 'MainLayout',
  components: { EssentialLink },
  computed:{
    title(){
      console.log()
      let currentPath = this.$route.fullPath;
      if (currentPath == '/') return 'Vue-c'
      else if (currentPath == '/chat') return 'Chat'
      else if (currentPath == '/auth') return 'Login'
    }
  }
}
</script>
