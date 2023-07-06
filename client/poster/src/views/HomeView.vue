<template>
    <div class="grid-container">
        <div class="grid-item left">
            <div>

                <h5><i> Selector </i></h5>

                <br>

                <div id="app" class="dropdown">
                    <select v-model="selected">
                        <option v-for="option in options" v-bind:value="option.value">
                            {{ option.text }}
                        </option>
                    </select>

                    <button @click="selected = ''" type="button" class="btn btn-outline-danger clear"><i
                            class="fa fa-trash"></i>
                    </button>

                    <button type="submit" class="btn btn-danger button" value={{selected}}>Generate</button>
                </div>
                <br>
                <i> Selected: {{ selected }} </i>
            </div>

            <hr>

            <div>
                <h5><i> Share </i></h5>
                <br>
                <div>
                    <center>
                        <button class="btn btn-secondary" style="font-size: 20px;"> LinkedIn <i
                                class="fa fa-linkedin-square"></i></button>
                    </center>
                </div>
            </div>
        </div>

        <div class="grid-item right">
            <div id="preview">
                <h5> <i> Preview </i> </h5>

                <h6 class="label"> Generated Message </h6>
                <input type="text" readonly class="form-control" value="Generated Message">

                <br>

                <h6 class="label"> Generated Image </h6>
                <div>
                    <img class="img" src="https://via.placeholder.com/600" alt="Generated Image" width="400" height="400">
                </div>
            </div>
        </div>
    </div>

    <footer id="footer">
        <div class="container-fluid footer">
            <div class="row">
                <div class="col-md-12">
                    <center>
                        <a class="btn fot" href="https://github.com/imtribute12" role="button" target="_blank"><i
                                class="fa fa-github"></i></a>
                        <a class="btn fot" href="https://www.linkedin.com/in/seda-n-taskan/" role="button"
                            target="_blank"><i class="fa fa-linkedin"></i></a>
                        <a class="btn fot" href="https://www.raquun.com/" target="_blank"><i>raquun.com</i></a>
                        <a class="btn fot" href="https://github.com/imtribute12/Raquun" target="_blank">CoTor © 2023</a>

                    </center>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'HomeView',
    data() {
        return {
            selected: '',
            options: [
                { text: 'Kurban Bayramı', value: 'Kurban Bayramı' },
                { text: 'Ramazan Bayramı', value: 'Ramazan Bayramı' },
                { text: 'Anneler Günü', value: 'Anneler Günü' },
                { text: 'Babalar Günü', value: 'Babalar Günü' },
                { text: '1 Ocak | Yılbaşı', value: '1 Ocak | Yılbaşı' },
                { text: '4 Mart | Mühendisler Günü', value: '4 Mart | Mühendisler Günü' },
                { text: '8 Mart | Dünya Kadınlar Günü', value: '8 Mart | Dünya Kadınlar Günü' },
                { text: '18 Mart | Çanakkale Zaferi', value: '18 Mart | Çanakkale Zaferi' },
                { text: '23 Nisan | Ulusal Egemenlik ve Çocuk Bayramı', value: '23 Nisan | Ulusal Egemenlik ve Çocuk Bayramı' },
                { text: '1 Mayıs | Emek ve Dayanışma Günü', value: '1 Mayıs | Emek ve Dayanışma Günü' },
                { text: '19 Mayıs | Atatürk\'ü Anma, Gençlik ve Spor Bayramı', value: '19 Mayıs | Atatürk\'ü Anma, Gençlik ve Spor Bayramı' },
                { text: '15 Temmuz | Demokrasi ve Milli Birlik Günü', value: '15 Temmuz | Demokrasi ve Milli Birlik Günü' },
                { text: '30 Ağustos | Zafer Bayramı', value: '30 Ağustos | Zafer Bayramı' },
                { text: '29 Ekim | Cumhuriyet Bayramı', value: '29 Ekim | Cumhuriyet Bayramı' },
                { text: '10 Kasım | Atatürk\'ün Ölüm Günü', value: '10 Kasım | Atatürk\'ün Ölüm Günü' },
                { text: '24 Kasım | Öğretmenler Günü', value: '24 Kasım | Öğretmenler Günü' }
            ]
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

#footer {
    background-color: crimson;
    color: white;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 8%;
}

.dropdown {
    font-size: 15px;
    margin-top: 1%;
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

.clear {
    text-align: center;
    font-size: 18px;
    margin: 1%;
}

.label {
    color: crimson;
    font-weight: bold;
    text-align: left;
}

.left {
    text-align: center;
    margin-top: 1%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.fot {
    font-size: 15px !important;
    margin-top: 0.5%;
}

.btn-secondary :hover {
    background-color: #0072b1 !important;
}
</style>
