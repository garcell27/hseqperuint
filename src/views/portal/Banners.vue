<template>
   <div class="animated fadeIn">
     <b-card>
       <div slot="header" v-show="!loading">
         <strong><i class="fa fa-list"></i> LISTA DE BANNERS</strong>
         <div class="card-header-actions">
           <b-link href="#" class="btn btn-success btn-sm" @click="crea_banner">
             <i class="icon-plus"></i> Agregar
           </b-link>
         </div>
       </div>
       <b-row>
         
       </b-row>
     </b-card>
   </div>
</template>

<script>
    import axios from 'axios'
    import ElementLoading from 'vue-element-loading'
    export default {
        name: "Banners",
        components:{
            ElementLoading
        },
        data:function () {
            return {
              loading: false,
            }
        },
        methods:{
            crea_banner:function () {
              
            }
        }
    }
</script>

<style scoped>

</style>
