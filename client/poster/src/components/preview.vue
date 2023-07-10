<template>
    <div id="preview">
        <h5> <i>Preview</i> </h5>

        <h6 class="label"> Generated Message </h6>
        <textarea readonly class="form-control" v-model="message" id="generated"
            placeholder="Generated Message will appear here..." @input="adjustTextarea" />
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
        return {};
    },
    methods: {
        adjustTextarea() {
            const textarea = this.$refs.textarea;
            textarea.style.height = auto;
            textarea.style.overflow = hidden;
        }
    }
}
</script>

<style scoped>
.label {
    color: crimson;
    font-weight: bold;
    text-align: left;
}

.textarea-container {
    height: fit-content;
    height: auto;
    overflow-y: auto;
}

textarea {
    width: 100%;
    height: auto;
    resize: none;
    overflow-y: auto;
}
</style>