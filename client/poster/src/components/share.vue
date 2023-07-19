<template>
    <div>
        <Loading :active.sync="isLoading" :is-full-page="fullPage" :transition="true" :color="'#ff1d5e'" :loader="'spinner'"
            :height="64" :width="64" :opacity="0.5" :z-index="9999" :background="'#000000'" :container="'body'"
            :target="'body'" />
        <hr>
        <h5><i>Share</i></h5>
        <br>
        <div>
            <center>
                <button @click="redirectToLinkedIn" class="btn btn-secondary" style="font-size: 20px" type="submit">
                    LinkedIn <i class="fa fa-linkedin-square"></i>
                </button>
                <div v-if="successMessage" class="message"><i> {{ successMessage }} </i></div>
            </center>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Loading from 'vue-loading-overlay';

export default {
    name: "Share",
    data() {
        return {
            successMessage: "",
            isLoading: false,
            fullPage: true,
        };

    },
    components: {
        Loading
    },
    props: {
        message: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
    },
    computed: {
        shownText() {
            return this.message ?? "Generated Message...";
        },
        shownImage() {
            return this.imageUrl ?? "Generated Image...";
        }
    },
    methods: {
        //redict to linkedin
        redirectToLinkedIn() {
            this.isLoading = true;
            axios.post("http://127.0.0.1:3000/post", {
                accessToken: this.token,
                body: this.shownText,
                title: "this.shownText",
                imageUrl: this.shownImage
            })
                .then((response) => {
                    this.successMessage = "Posted Successfully!";
                    console.log("Post başarıyla gönderildi:", response.data);
                })
                .catch((error) => {
                    this.successMessage = "Something went wrong...";
                    console.error("Post gönderme hatasi:", error);
                })
                .finally(() => {
                    console.log("Post gönderme isteği tamamlandı.");
                    this.isLoading = false;
                });
        },
    }
}
</script>

<style scoped>
.message {
    color: green;
    font-weight: bold;
    text-align: center;
    margin: 2%;
}
</style>