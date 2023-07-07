<template>
    <div class="grid-container">
        <div class="grid-item left">
            <Selector />
            <Share />
        </div>
        <div class="grid-item right">
            <Preview />
        </div>
    </div>
    <Footer />
</template>

<script>
import Selector from '../components/selector.vue';
import Share from '../components/share.vue';
import Preview from '../components/preview.vue';
import Footer from '../components/footer.vue';


export default {
    name: "HomeView",
    data() {
        return {
        };
    },
    components: { Selector, Share, Preview, Footer }
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

.grid-container {
    display: grid;
    grid-template-columns: 50% 50%;
}

.grid-item {
    padding: 10px;
    margin: 1%;
    text-align: center;
}

.left {
    text-align: center;
    margin-top: 1%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.right {
    text-align: center;
    margin-top: 1%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
</style>
