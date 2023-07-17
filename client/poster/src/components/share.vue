<template>
    <div>
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
export default {
    name: "Share",
    data() {
        return {
            successMessage: "",
        };

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