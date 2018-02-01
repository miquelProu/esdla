<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Quantes cartes vols veure?</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Nº de cartes">
                    <b-input
                            type="text"
                            v-model="nCartes"
                            placeholder="1"
                            required>
                    </b-input>
                </b-field>

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary">Login</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    name: 'modalNCartes',
    // components:{},
    // props: [],
    // data: function(){
    //     return{}
    // },
    // mounted: function(){},
    // watch: {},
    // computed: {},
    // methods: {},
    // filters: {}
}
</script>

<style lang="scss">

</style>