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
            </center>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Share",
    data() {
        return {};

    },
    props: {
        message: {
            type: String,
            required: true
        }
    },
    computed: {
        shownText() {
            return this.message ?? "Generated Message...";
        }
    },
    methods: {
        //redict to linkedin
        redirectToLinkedIn() {
            axios.post("http://127.0.0.1:3000/post", {
                accessToken: this.token,
                body: this.shownText,
            })
                .then((response) => {
                    console.log("Post başarıyla gönderildi:", response.data);
                })
                .catch((error) => {
                    console.error("Post gönderme hatasi:", error);
                })
                .finally(() => {
                    console.log("Post gönderme isteği tamamlandı.");
                });
        }

    }
}
</script>