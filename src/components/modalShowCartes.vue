<template>
    <show :deck="getPreparacio"></show>
</template>

<script>
import { mapGetters } from 'vuex'
import Show from './show.vue'
import * as types from './../store/mutation-types'

export default {
    name: 'modalShowCartes',
    components:{
        'show' : Show
    },
    // props: [],
    data: function(){
        return {
            [types.AREA_PREPARACIO]: types.AREA_PREPARACIO,
        }
    },
    // mounted: function(){},
    // watch: {},
    computed: {
        ...mapGetters({
            getNumCartes: 'numCartes',
            getPreparacio: 'preparacio'
        }),

    },
    // methods: {},
    // filters: {}
}
</script>

<style lang="scss">

</style>