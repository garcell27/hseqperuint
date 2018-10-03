<template>
  <div class="animated fade-in">
    <b-card id="listaTabla" v-show="accion==0">

    </b-card>
  </div>
</template>

<script>
    export default {
        name: "Galerias",
      data:function(){
          return {
            loading: false,
            galerias:[],
            myModal: false,
            formbanner:{
              file:null,
              titulo:null,
              detalle:null
            },
            imageData: null,
            submitStatus:'info'
          }
      }
    }
</script>

<style scoped>

</style>
