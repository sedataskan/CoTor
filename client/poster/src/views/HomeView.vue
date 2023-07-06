<template>
    <div id="content" class="grid-container">
        <div class="grid-item left">
            <h5><i> Select a Special Date </i></h5>

            <select v-model="selected">
                <option disabled value="">Dates</option>
                <option>Kurban Bayramı</option>
                <option>Ramazan Bayramı</option>
                <option>Anneler Günü</option>
                <option>Babalar Günü</option>
                <option>1 Ocak | Yılbaşı</option>
                <option>4 Mart | Mühendisler Günü</option>
                <option>8 Mart | Dünya Kadınlar Günü</option>
                <option>18 Mart | Çanakkale Zaferi</option>
                <option>23 Nisan | Ulusal Egemenlik ve Çocuk Bayramı</option>
                <option>1 Mayıs | Emek ve Dayanışma Günü</option>
                <option>19 Mayıs | Atatürk'ü Anma, Gençlik ve Spor Bayramı</option>
                <option>15 Temmuz | Demokrasi ve Milli Birlik Günü</option>
                <option>30 Ağustos | Zafer Bayramı</option>
                <option>29 Ekim | Cumhuriyet Bayramı</option>
                <option>10 Kasım | Atatürk'ün Ölüm Yıldönümü</option>
                <option>24 Kasım | Öğretmenler Günü</option>
            </select>
            <button @click="selected = ''" type="button" class="btn button"> Clear </button>
            <div>
                <button type="submit" class="btn btn-outline-danger button" value={{selected}}>Generate</button>
                <i style="padding: 1%;"> {{ selected }} </i>
            </div>

            <hr>

            <h5><i> Share</i></h5>
            <div>
                <center>
                    <button class="btn btn-outline-info button"><i class="fa fa-linkedin-square"></i></button>
                </center>

            </div>
        </div>

        <!-- <div class="d-flex" style="height: 200px;">
            <div class="vr"></div>
        </div> -->

        <div class="grid-item right">
            <div id="preview">
                <h5> <i> Preview </i> </h5>

                <h6 class="label"> Generated Message </h6>
                <input type="text" readonly class="form-control" value="Generated Message">

                <br>

                <h6 class="label"> Generated Image </h6>
                <div style="margin: 1%">
                    <img src="https://via.placeholder.com/600" alt="Generated Image" width="600" height="600">
                </div>

            </div>
        </div>
    </div>

    <footer>
        <div class="container-fluid footer">
            <div class="row">
                <div class="col-md-12">
                    <center>
                        <a class="btn fot" href="https://github.com/imtribute12" role="button" target="_blank"><i
                                class="fa fa-github"></i></a>
                        <a class="btn fot" href="https://www.linkedin.com/in/seda-n-taskan/" role="button"
                            target="_blank"><i class="fa fa-linkedin"></i></a>
                        <a class="btn fot" href="https://www.raquun.com/" target="_blank"><i>raquun.com</i></a>
                        <br>
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
            selected: ''
        }
    }
}

</script>

<style>
.grid-container {
    display: grid;
    grid-template-columns: 50% 50%;
}

.grid-item {
    padding: 10px;
    margin: 1%;
    text-align: center;
}

.label {
    color: rgba(220, 20, 60, 0.755);
    font-weight: bold;
    text-align: left;
}

.footer {
    background-color: crimson;
    color: white;
    padding: 1%;
    margin: 1%;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 7rem;
}

.fot {
    font-size: 16px !important;
}

#content {
    text-align: center;
}

select {
    width: 50%;
    padding: 16px 20px;
    border: none;
    border-radius: 4px;
    background-color: #f1f1f1;
}

button {
    background-color: crimson;
    border: none;
    color: white;
    padding: 25px;
    margin: 1%;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
}

.button {
    padding: 30px;
    text-align: center;
    margin: 1%;
    border-radius: 50%;
}
</style>
