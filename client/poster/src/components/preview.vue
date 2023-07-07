<template>
    <div id="preview">
        <h5> <i>Preview</i> </h5>

        <h6 class="label"> Generated Message </h6>
        <input type="text" readonly class="form-control" value="Generated Message">

        <br>

        <h6 class="label"> Generated Image </h6>
        <div>
            <img class="img" src="https://via.placeholder.com/600" alt="Generated Image" width="400" height="400">
        </div>
    </div>
</template>

<script>
export default {
    name: "Preview",
    data() {
        return {
        };
    }
}
</script>

<style scoped>
.label {
    color: crimson;
    font-weight: bold;
    text-align: left;
}
</style>