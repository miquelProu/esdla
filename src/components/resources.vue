<template>
    <div class="resources">
        <div v-if="resource > 0" class="level">
            <div class="level-left">
                <div class="level-item">
                    <figure class="image is-32x32">
                        <img class="" src="../assets/markers/62a2ba76-9872-481b-b8fc-ec35447ca640.png"/>
                    </figure>
                </div>
                <div class="level-item text">
                    <div>{{resource}}</div>
                </div>
            </div>
        </div>
        <div v-if="damage > 0" class="level">
            <div class="level-left">
                <div class="level-item">
                    <figure class="image is-32x32">
                        <img class="" src="../assets/markers/38d55f36-04d7-4cf9-a496-06cb84de567d.png"/>
                    </figure>
                </div>
                <div class="level-item text">
                    <div>{{damage}}</div>
                </div>
            </div>
        </div>
        <div v-if="viatge > 0" class="level">
            <div class="level-left">
                <div class="level-item">
                    <figure class="image is-32x32">
                        <img class="" src="../assets/markers/e9a419ff-5154-41cf-b84f-95149cc19a2a.png"/>
                    </figure>
                </div>
                <div class="level-item text">
                    <div>{{viatge}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'resource',
        components: {},
        props: ['damage', 'resource', 'viatge'],
        data: function(){
            return {
                isTop: false,
                isDos: false,
            }
        },
        mounted: function(){},
        watch: {
            damage: function(){this.evaluate()},
            viatge: function(){this.evaluate()},
            resource: function(){this.evaluate()},
        },
        computed: {

        },
        methods:{
            evaluate: function(){
                console.log("EVALUATE RESOURCE");
                if (this.damage > 0 && this.viatge > 0 ){
                    this.isTop = true;
                    this.isDos = false;
                } else if (this.damage > 0 || this.viatge > 0 ){
                    this.isDos = true;
                    this.isTop = false;
                } else {
                    this.isTop = false;
                    this.isDos = false;
                }
            }
        }
    }
</script>

<style lang="scss">
    .resources{
        position: absolute;

        .level {
            padding:5px 5px 5px 0;
            background-color: rgba(0,0,0,0.5);
            margin-bottom: 0;

            .level-item.text {
                color:white;
                font-weight: bold;
                font-size: 1.2em;
            }
        }
    }
</style>