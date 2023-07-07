<template>
  <navbar />
  <RouterView />
</template>

<script>
import navbar from './components/navbar.vue'
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    navbar,
    RouterLink,
    RouterView
  }
}
</script>