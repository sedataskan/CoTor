<template>
    <footer id="footer">
        <div class="container-fluid footer">
            <div class="col-md-12">
                <center>
                    <a class="btn" href="https://github.com/imtribute12" role="button" target="_blank"><i
                            class="fa fa-github"></i></a>
                    <a class="btn" href="https://www.linkedin.com/in/seda-n-taskan/" role="button" target="_blank"><i
                            class="fa fa-linkedin"></i></a>
                    <a class="btn" href="https://www.raquun.com/" target="_blank"><i>raquun.com</i></a>
                    <a class="btn" href="https://github.com/imtribute12/Raquun" target="_blank">CoTor © 2023</a>
                </center>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {}
    }
}
</script>

<style scoped>
.footer {
    background-color: crimson;
    color: white !important;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}
</style>