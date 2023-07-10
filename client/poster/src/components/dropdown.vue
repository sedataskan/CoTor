<template>
    <div id="app" class="dropdown">
        <select v-model="selected">
            <option v-for="option in options" v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>

        <button @click="selected = ''" type="button" class="btn btn-outline-danger clear"><i class="fa fa-trash"></i>
        </button>

        <button @click="getPost(selected)" type="submit" class="btn btn-danger button" value={{selected}}>Generate</button>
    </div>
    <br>
    <i> Selected: {{ selected }} </i>
</template>

<script>
import axios from 'axios';

export default {
    name: 'dropdown',
    data() {
        return {
            selected: "",
            options: [
                { text: "Kurban Bayramı", value: "Kurban Bayramı" },
                { text: "Ramazan Bayramı", value: "Ramazan Bayramı" },
                { text: "Anneler Günü", value: "Anneler Günü" },
                { text: "Babalar Günü", value: "Babalar Günü" },
                { text: "1 Ocak | Yılbaşı", value: "1 Ocak | Yılbaşı" },
                { text: "4 Mart | Mühendisler Günü", value: "4 Mart | Mühendisler Günü" },
                { text: "8 Mart | Dünya Kadınlar Günü", value: "8 Mart | Dünya Kadınlar Günü" },
                { text: "18 Mart | Çanakkale Zaferi", value: "18 Mart | Çanakkale Zaferi" },
                { text: "23 Nisan | Ulusal Egemenlik ve Çocuk Bayramı", value: "23 Nisan | Ulusal Egemenlik ve Çocuk Bayramı" },
                { text: "1 Mayıs | Emek ve Dayanışma Günü", value: "1 Mayıs | Emek ve Dayanışma Günü" },
                { text: "19 Mayıs | Atatürk'ü Anma, Gençlik ve Spor Bayramı", value: "19 Mayıs | Atatürk'ü Anma, Gençlik ve Spor Bayramı" },
                { text: "15 Temmuz | Demokrasi ve Milli Birlik Günü", value: "15 Temmuz | Demokrasi ve Milli Birlik Günü" },
                { text: "30 Ağustos | Zafer Bayramı", value: "30 Ağustos | Zafer Bayramı" },
                { text: "29 Ekim | Cumhuriyet Bayramı", value: "29 Ekim | Cumhuriyet Bayramı" },
                { text: "10 Kasım | Atatürk'ün Ölüm Günü", value: "10 Kasım | Atatürk'ün Ölüm Günü" },
                { text: "24 Kasım | Öğretmenler Günü", value: "24 Kasım | Öğretmenler Günü" }
            ]
        }
    },
    methods: {
        async getPost() {
            axios.post('http://127.0.0.1:3000/generate', {
                selected: this.selected
            })
                .then(function (response) {
                    console.log(response);
                    document.getElementById('generated').value = response.data.message;
                })
                .catch(function (error) {
                    document.getElementById('generated').value = error.text;
                    console.log(error);
                });


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