<template>
    <div>
        <hr>
        <h5> <i>Preview</i> </h5>

        <div class="post">
            <img :src="avatar" class="img">
            <p class="username"> CoTor </p>
            <p class="label"> 07.10.2023 </p>
        </div>

        <p id="content" class="box" ref="baseMessage" contenteditable="true"
            @input="updateParagraph(baseMessage), editMessage(baseMessage)">
            {{ baseMessage }}
        </p>
        <div>
            <img v-bind:src=baseImage style="max-width: 600px; max-height: 700px">
        </div>
    </div>
</template>

<script>

export default {
    name: "Preview",
    emits: ['edit-message'],
    props: {
        message: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            baseMessage: "This is a preview of your post.",
            baseImage: "https://user-images.githubusercontent.com/47315479/81145216-7fbd8700-8f7e-11ea-9d49-bd5fb4a888f1.png",
            avatar: "https://cdn-icons-png.flaticon.com/512/44/44948.png?w=740&t=st=1689073293~exp=1689073893~hmac=e5fa93103e45bc05deda27d257b470cdaecf7aba1f75880621d7fba63e608ac2",
            content: {
                baseMessage: "This is a preview of your post.",
            },
            editedMessage: ""

        };
    },
    computed: {
        shownText() {
            return this.message ?? "Something went wrong...";
        },
        shownImage() {
            return this.imageUrl;
        }
    },
    watch: {
        imageUrl(newImageUrl) {
            this.updateImageUrl(newImageUrl);
        },
        message(newMessage) {
            this.updateMessage(newMessage);
            this.$refs.baseMessage.innerHTML = newMessage;
        }
    },
    methods: {
        updateImageUrl(imageUrl) {
            this.baseImage = imageUrl;
        },
        updateMessage(message) {
            this.baseMessage = message;
        },
        updateParagraph(event) {
            this.baseMessage = this.$refs.baseMessage.innerHTML;
        },
        editMessage(text) {
            this.$emit("edit-message", text);
        }
    }
}
</script>

<style scoped>
hr {
    visibility: hidden;
    color: crimson;
}

.ok-button {

    border: none;
    background: none;
    font-size: 25px;
    color: crimson;
    cursor: pointer;
    outline: none;
}

.box {
    width: 100%;
    height: auto;
    border: none;
    border-radius: 5px;
    padding: 1%;
    font-size: 16px;
    outline: none;
    resize: none;
    overflow: hidden;
    text-align: left;
    margin-bottom: 1%;

}

.username {
    color: crimson;
    font-weight: bold;
    text-align: left;
}

.img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 0 auto;
    display: block;
}

.label {
    color: #808080;
    font-size: 12px;
    text-align: right;
}

.img,
.username,
.label {
    display: inline;
    margin-left: 1%;
    margin-bottom: 1%;
}

.post {
    flex-direction: row;
    text-align: left;
}

.text {
    text-align: left;
    margin: 1%;
}

@media screen and (max-width: 1000px) {
    hr {
        visibility: visible;
    }

    .img {
        height: 30px;
        width: 30px;
    }

    .username,
    .label {
        font-size: 10px;
    }

    .text {
        font-size: 14px;
    }

    .image {
        max-width: 100%;
        max-height: 300px;
    }
}
</style>