<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          flat
          dense
          v-go-back.single
          icon='arrow_back'
          label='back'/>

        <q-toolbar-title class="absolute-center">
           {{ title }}
        </q-toolbar-title>

        <q-btn
          to='/auth'
          flat
          dense
          icon='account_circle'
          no-caps
          class="absolute-right q-pr-sm"
          label='Login'/>

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
      let currentPath = this.$route.fullPath;
      if (currentPath == '/') return 'Vue-c'
      else if (currentPath == '/chat') return 'Chat'
      else if (currentPath == '/auth') return 'Login'
    }
  }
}
</script>
