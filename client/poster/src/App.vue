<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div id="nav">
      <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light">
        <RouterLink to="/" class="navbar-brand" href="/HomeView.vue">CoTor</RouterLink>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <div class="navbar-nav mr-auto">
            <i> Create Your Content Easily </i>
          </div>

        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
#nav {
  padding: 0px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: crimson;
  padding: 0.5rem 1rem;
}

@media (max-width: 768px) {
  #nav {
    padding: 0px;
    text-align: center;
  }

  #nav a {
    font-weight: bold;
    color: crimson;
  }

  #nav a.router-link-exact-active {
    border-radius: .5rem;
  }
}
</style>