<template>
    <div class="animated fadeIn">
      <b-card id="listaTabla">
          <div slot="header">
            <strong><i class="fa fa-list"></i> LISTA DE CURSOS</strong>
            <div class="card-header-actions">
              <b-link href="#" class="btn btn-success btn-sm" @click="listar">
                <i class="icon-plus"></i> Agregar
              </b-link>
            </div>
          </div>

      </b-card>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Cursos",
        data:function(){
          return {
            cursos:[]
          }
        },

        methods:{
          agregar:function(){
            let urlback=this.$store.getters.urlbackend

          },
          listar:function(){
            let urlback=this.$store.getters.urlbackend
            let token=localStorage.getItem('token')
            axios.defaults.headers.common['Api-Token'] = token
            axios({url:urlback+'cursos',method:'GET'})
              .then(response=>{
                this.cursos=response.data
              })
          }
        }
    }
</script>

<style scoped>

</style>
