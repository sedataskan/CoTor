<template>
    <div>
        <h5><i>Selector</i></h5>
        <br>
        <Dropdown />
    </div>
</template>

<script>
import Dropdown from '../components/dropdown.vue';

export default {
    name: "Selector",
    data() {
        return {
        };
    },
    components: { Dropdown }
}
</script>