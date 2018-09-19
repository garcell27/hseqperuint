<template>
    <div class="animated fadeIn">
      <b-card id="listaTabla">
          <div slot="header">
            <strong><i class="fa fa-list"></i> LISTA DE CURSOS</strong>
            <div class="card-header-actions">
              <b-link href="#" class="btn btn-success btn-sm" @click="myModal = true">
                <i class="icon-plus"></i> Agregar
              </b-link>
            </div>
          </div>
        <element-loading active="true" spinner="spinner" color="#FF6700"></element-loading>
        <b-alert :show="viewalertlist" variant="primary" >Actualmente no tienes Ningun Curso registrado</b-alert>

      </b-card>
      <b-card id="FormularioCurso">

        hola mis estimados
      </b-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import ElementLoading from 'vue-element-loading'
    export default {
        name: "Cursos",
        components:{
          ElementLoading
        },
        data:function(){
            return {
              cursos:[],
              formCurso:{
                idcurso:null,
                descripcion:null,
                duracion:null,
                detalle:null,
                certificacion:null,
                vigencia:null,
                moneda_id:null,
                costo:null,
                formato_id:null,
              },
              cursoView:null,
              items: [
                {username: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Active'},
                {username: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
                {username: 'Chetan Mohamed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
                {username: 'Derick Maximinus', registered: '2012/03/01', role: 'Member', status: 'Pending'},
                {username: 'Friderik Dávid', registered: '2012/01/21', role: 'Staff', status: 'Active'},
                {username: 'Yiorgos Avraamu', registered: '2012/01/01', role: 'Member', status: 'Active'},
                {username: 'Avram Tarasios', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
                {username: 'Quintin Ed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
                {username: 'Enéas Kwadwo', registered: '2012/03/01', role: 'Member', status: 'Pending'},
                {username: 'Agapetus Tadeáš', registered: '2012/01/21', role: 'Staff', status: 'Active'},
                {username: 'Carwyn Fachtna', registered: '2012/01/01', role: 'Member', status: 'Active'},
                {username: 'Nehemiah Tatius', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
                {username: 'Ebbe Gemariah', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
                {username: 'Eustorgios Amulius', registered: '2012/03/01', role: 'Member', status: 'Pending'},
                {username: 'Leopold Gáspár', registered: '2012/01/21', role: 'Staff', status: 'Active'},
                {username: 'Pompeius René', registered: '2012/01/01', role: 'Member', status: 'Active'},
                {username: 'Paĉjo Jadon', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
                {username: 'Micheal Mercurius', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
                {username: 'Ganesha Dubhghall', registered: '2012/03/01', role: 'Member', status: 'Pending'}
              ],
              campos: [
                {key: 'username'},
                {key: 'registered'},
                {key: 'role'},
                {key: 'status'}
              ],
            }
          },
          created:function(){
            this.listar();
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
          },
          computed:{
            viewalertlist:function () {
              if(this.cursos.length==0){
                return true;
              }else{
                return false;
              }
            }
          }
    }
</script>

<style scoped>

</style>
