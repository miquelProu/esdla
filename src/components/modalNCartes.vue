<template>
    <!--<form action="">-->
        <div class="modal-card" style="width:100%;">
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
            <footer class="modal-card-foot" style="justify-content: flex-end;">
                <button class="button" type="button" @click="sendClose();">Tancar</button>
                <button class="button is-primary" @click="sendNumber()">Enviar</button>
            </footer>
        </div>
    <!--</form>-->
</template>

<script>
export default {
    name: 'modalNCartes',
    // components:{},
    // props: [],
    data: function(){
        return{
            nCartes: null
        }
    },
    // mounted: function(){},
    // watch: {},
    // computed: {},
    methods: {
        sendNumber: function(){
            console.log(this.nCartes);
        },
        sendClose: function(){
            this.$emit('close', true);
            this.$parent.close();
        }
    },
    // filters: {}
}
</script>

<style lang="scss">

</style>