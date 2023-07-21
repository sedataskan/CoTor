<template>
    <div>
        <h5><i>Special Day</i></h5>
        <div class="dropdown">
            <select v-model="selected">
                <option v-for="option in options" v-bind:value="option.value">
                    {{ option.text }}
                </option>
            </select>

            <button @click="selected = null" :disabled="selected == null" type="button"
                class="btn btn-outline-danger clear"><i class="fa fa-trash"></i>
            </button>
            <loading :selected="selected" @data-fetched="dataFetched" @image-fetched="imageFetched" />
        </div>
        <br>
    </div>
</template>

<script>

import Loading from './loading.vue';

export default {
    name: 'dropdown',
    emits: ['data-fetched', 'image-fetched'],
    data() {
        return {
            selected: null,
            options: [
                { text: "Eid al-Adha", value: "Eid al-Adha" },
                { text: "Eid al-Fitr", value: "Eid al-Fitr" },
                { text: "Mother's Day", value: "Mother's Day" },
                { text: "Father's Day", value: "Father's Day" },
                { text: "January 1 | New Year's Day", value: "New Year's Day" },
                { text: "March 4 | Engineers' Day", value: "Engineers' Day" },
                { text: "March 8 | International Women's Day", value: "Women's Day" },
                { text: "March 18 | Gallipoli Victory Day", value: "Çanakkale Zaferi" },
                { text: "April 23 | National Sovereignty and Children's Day", value: "Children's Day" },
                { text: "May 1 | Labor and Solidarity Day", value: "Solidarity Day" },
                { text: "May 19 | Commemoration of Atatürk, Youth and Sports Day", value: "Atatürk nineteen May" },
                { text: "August 30 | Victory Day", value: "Victory Day Turkey" },
                { text: "October 29 | Republic Day", value: "Republic Turkey" },
                { text: "November 10 | Commemoration of Atatürk's Death", value: "Atatürk" },
                { text: "November 24 | Teachers' Day", value: "Teachers' Day" }
            ]

        }
    },
    components: {
        Loading
    },
    methods: {
        dataFetched(text) {
            this.$emit("data-fetched", text);
        },
        imageFetched(image) {
            this.$emit("image-fetched", image);
        }
    }
}
</script>

<style scoped>
.dropdown {
    font-size: 15px;
    margin-top: 1%;
}

.clear {
    text-align: center;
    font-size: 18px;
    margin: 1%;
}

.button {
    margin-left: 10px;
}
</style>