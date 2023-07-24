<template>
    <transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">

                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        <h5>
                            How to Use CoTor?
                        </h5>
                        <dl>
                            <dd>
                                <i> 1 </i>
                                Choose a special date from the dropdown menu.
                            </dd>
                            <dd>
                                <i> 2 </i>
                                Click "Generate Text" and "Generate Image" button.
                            </dd>
                            <dd>
                                <i> 3 </i>
                                You can see your post's preview on right side.
                            </dd>
                            <dd>
                                <i class="inner"> - </i>
                                Also you can edit your post's contents.
                            </dd>
                            <dd>
                                <i> 4 </i>
                                Click "Share" button to share your post on LinkedIn.
                            </dd>
                        </dl>

                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button class="modal-default-button" @click="$emit('close')"><i class="fa fa-window-close"
                                aria-hidden="true"></i></button>
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        show: Boolean
    }
}
</script>

<style scoped>
i {
    font-size: 18px;
    color: crimson;
    margin-right: 5px;
    font-weight: bold;
}

.inner {
    margin-left: 20px;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: auto;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
    border: none;
    background: none;
    font-size: 25px;
    color: crimson;
    cursor: pointer;
    outline: none;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>

  