<template>
    <div>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'downAliats',
        components: {},
        props: [],
        data: function(){
            return {}
        },
        mounted: function(){

        },
        watch: {},
        computed: {},
        methods:{
            ...mapActions({
                toMa: 'toMa',
                remenar: 'remenar'
            }),
        },
    }
</script>

<style lang="scss">

</style>