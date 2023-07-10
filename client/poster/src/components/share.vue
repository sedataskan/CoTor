<template>
    <div>
        <hr>
        <h5><i>Share</i></h5>
        <br>
        <div>
            <center>
                <button @click="getPost()" class="btn btn-secondary" style="font-size: 20px;" type="submit"> LinkedIn <i
                        class="fa fa-linkedin-square"></i></button>
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
    methods: {
        async getPost() {
            axios.post('http://127.0.0.1:3000/post')
                .then(response => {
                    console.log('Post başarıyla gönderildi:', response.data);
                })
                .catch(error => {
                    console.error('Post gönderme hatası:', error);
                });
        }
    }
}
</script>