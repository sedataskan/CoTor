<template>
    <header>
        <div id="nav">
            <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light">
                <RouterLink to="/" class="navbar-brand brand" href="/HomeView.vue">CoTor</RouterLink>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <div class="navbar-nav mr-auto">
                        <i> Create Your Content Easily </i>
                    </div>

                </div>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {}
    }
}
</script>

<style scoped>
.brand {
    font-size: 20px;
    font-weight: bold;
    padding: 1%;
    color: crimson;
}
</style>