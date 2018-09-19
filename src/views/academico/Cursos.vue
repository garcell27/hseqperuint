<template>
    <div class="animated fadeIn">
      <b-card id="listaTabla" v-show="accion==0">
          <div slot="header" v-show="!loading">
            <strong><i class="fa fa-list"></i> LISTA DE CURSOS</strong>
            <div class="card-header-actions">
              <b-link href="#" class="btn btn-success btn-sm" @click="crear_curso">
                <i class="icon-plus"></i> Agregar
              </b-link>
            </div>
          </div>
        <element-loading :active="loading" spinner="spinner" color="#FF6700"></element-loading>
        <b-alert :show="viewalertlist" variant="primary" >Actualmente no tienes Ningun Curso registrado</b-alert>
      </b-card>
      <b-card id="FormularioCurso" v-show="accion==1||accion==2">
        <div slot="header" v-show="!loading">
          <strong><i class="fa fa-list"></i> REGISTRO DE CURSO</strong>
          <div class="card-header-actions">
            <b-link href="#" class="btn btn-danger btn-sm" @click="cancelar_accion">
              <i class="icon-close"></i> Cerrar
            </b-link>
          </div>
        </div>
        <b-form >
          <b-form-group
            label-for="des_curso"
            description="DESCRIPCION"
            :label-cols="3"
            :horizontal="true">
            <b-form-input v-model="formCurso.descripcion" type="text" placeholder="DESCRIPCION"></b-form-input>
          </b-form-group>
        </b-form>
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
              loading:false,
              accion:0,
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
              this.loading=true
              axios.defaults.headers.common['Api-Token'] = token
              axios({url:urlback+'cursos',method:'GET'})
                .then(response=>{
                  this.cursos=response.data
                  this.loading=false
                }).catch(error=>{
                  console.log(error)
                  this.loading=false
              })
            },
            crear_curso:function () {
              this.accion=1

            },
            cancelar_accion:function(){
              this.accion=0
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
