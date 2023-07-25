<template>
    <header>
        <div id="nav">
            <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light">
                <a to="/" class="navbar-brand brand" href="/">CoTor
                </a>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <div class="navbar-nav mr-auto">
                        <i> Create Your Content Easily </i>
                    </div>

                </div>
                <div>
                    <button class="show-modal" @click="showModal = true"><i class="fa fa-info-circle"
                            aria-hidden="true"></i></button>

                </div>
            </nav>
        </div>
    </header>
    <teleport to="body">
        <modal :show="showModal" @close="showModal = false">
            <template #header>
                <h3 class="brand">CoTor</h3>
            </template>
        </modal>
    </teleport>
</template>

<script>
import Modal from './modal.vue'

export default {
    name: 'Navbar',
    data() {
        return {
            showModal: false
        }
    },
    components: {
        Modal
    },
}
</script>

<style scoped>
.show-modal {
    border: none;
    background: none;
    font-size: 25px;
    color: crimson;
    cursor: pointer;
    outline: none;
}

.brand {
    font-weight: bold;
    padding: 1%;
    color: crimson;
}
</style>