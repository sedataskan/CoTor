
<template>
    <div class="vl-parent">
        <Loading :active.sync="isLoading" :is-full-page="fullPage" :transition="true" :color="'#ff1d5e'" :loader="'spinner'"
            :height="64" :width="64" :opacity="0.5" :z-index="9999" :background="'#000000'" :container="'body'"
            :target="'body'" />
        <button @click="sendRequest" :disabled="selected == null" type="submit"
            class="btn btn-danger button">Generate</button>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios';

export default {
    name: 'loading',
    emits: ['data-fetched'],
    data() {
        return {
            isLoading: false,
            fullPage: true
        }
    },
    components: {
        Loading
    },
    props: ['selected'],
    props: {
        selected: String
    },
    methods: {
        sendRequest() {
            this.isLoading = true;
            axios.post('http://127.0.0.1:3000/generate', {
                selected: this.selected
            })
                .then((response) => {
                    this.$emit("data-fetched", response.data.message);
                })
                .catch((error) => {
                    this.$emit("data-fetched", error.message);
                })
                .finally(() => {
                    this.isLoading = false; // close loading screen
                });
        },

    }
}
</script>