<template>
    <div class="grid-container">
        <div class="grid-item left">
            <Selector @data-fetched="dataFetched" @image-fetched="imageFetched" />
            <Share :message="fetchedMessage" :imageUrl="fetchedImage" />
        </div>
        <div class="grid-item right">
            <Preview :message="fetchedMessage" :imageUrl="fetchedImage" />
        </div>
        <div class="grid-item">
        </div>
    </div>
    <Footer />
</template>

<script>
import Selector from '../components/dropdown.vue';
import Share from '../components/share.vue';
import Preview from '../components/preview.vue';
import Footer from '../components/footer.vue';


export default {
    name: "HomeView",
    data() {
        return {
            fetchedMessage: "",
            fetchedImage: ""
        };
    },
    components: { Selector, Share, Preview, Footer },
    methods: {
        dataFetched(text) {
            this.fetchedMessage = text;
        },
        imageFetched(image) {
            this.fetchedImage = image;
        }
    }
}

</script>

<style>
* {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}

body {
    display: flex;
    flex-direction: column;
}

select {
    width: 50%;
    padding: 9px 14px;
    border: none;
    border-radius: 4px;
    background-color: #f1f1f1;
}

hr {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
    color: crimson;
    width: 100%;
}

.grid-container {
    display: grid;
    grid-template-columns: 50% 50%;
}

.grid-item {
    padding: 10px;
    margin: 1%;
    text-align: center;
    height: 100%;
}

.left,
.right {
    text-align: center;
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}


@media screen and (max-width: 1000px) {
    .grid-container {
        display: inline-block;
        width: 100%;
    }
}
</style>
