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
          <b-form-group
            label="DESCRIPCION :"
            label-class="text-md-right"
            :label-cols="2"
            breakpoint="md"
            :horizontal="true">
            <b-form-input v-model="formCurso.descripcion" type="text" ></b-form-input>
          </b-form-group>

          <b-row>
            <b-col md="6">
            <b-form-group
              label="MONEDA :"
              :label-cols="4"
              label-class="text-md-right"
              :horizontal="true">
              <b-form-select v-model="formCurso.moneda_id" >
                <option v-for="moneda in monedas"  :value="moneda.id" >{{ moneda.descripcion }}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
            <b-col md="6">
            <b-form-group
              label="PRECIO SUG. :"
              label-class="text-sm-right"
              :horizontal="true">
              <b-input-group :prepend="moneda_default" >
                <b-form-input v-model="formCurso.costo" type="number"></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                label="DURACION :"
                label-class="text-sm-right"
                :horizontal="true">
                <b-input-group append="Horas" >
                  <b-form-input v-model="formCurso.duracion" type="number" min="1" ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="CERTIFICADO :"
                label-class="text-sm-right"
                :horizontal="true">
                <b-form-radio-group v-model="formCurso.certificacion" >
                  <b-form-radio  value="1" >Si</b-form-radio>
                  <b-form-radio  value="0" >No</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group
            label="VIGENCIA :"
            :label-cols="2"
            :horizontal="true">
            <b-form-select v-model="formCurso.vigencia" >
              <option  value="0" >Ninguna</option>
              <option  value="6" >6 Meses</option>
              <option  value="12" >1 Año</option>
              <option  value="24" >2 Años</option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label="DETALLE :"
            :label-cols="2"
            :horizontal="true">
            <b-form-textarea  v-model="formCurso.detalle" :rows="3" ></b-form-textarea>
          </b-form-group>
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
              monedas:[],
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
            this.listarMonedas();
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
            listarMonedas:function(){
              let urlback=this.$store.getters.urlbackend
              let token=localStorage.getItem('token')
              this.loading=true
              axios.defaults.headers.common['Api-Token'] = token
              axios({url:urlback+'monedas',method:'GET'})
                .then(response=>{
                  this.monedas=response.data
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
            },
            moneda_default:function(){
              let monedasel=null
              for(let i=0 ;i<this.monedas.length;i++){
                if(this.monedas[i].id==this.formCurso.moneda_id){
                  monedasel=this.monedas[i].simbolo
                }
              }
              return monedasel
            }
          }
    }
</script>

<style scoped>

</style>
