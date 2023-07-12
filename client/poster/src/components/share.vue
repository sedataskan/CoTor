<template>
    <div>
        <hr>
        <h5><i>Share</i></h5>
        <br>
        <div>
            <center>
                <button @click="redirectToLinkedIn" class="btn btn-secondary" style="font-size: 20px;" type="submit">
                    LinkedIn <i class="fa fa-linkedin-square"></i></button>
            </center>
        </div>
    </div>
</template>

<script>
export default {
    name: "Share",
    data() {
        return {};
    },
    methods: {
        redirectToLinkedIn() {
            window.location.href = "http://127.0.0.1:3000/login";
        },
    }
}
</script>