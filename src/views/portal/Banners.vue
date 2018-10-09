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
          <b-col sm="6" md="3" lg="4" v-for="(banner,index) in banners">
            <b-card :title="banner.titulo" :img-src="banner.nombreurl">
              <p class="card-text">{{ banner.detalle }}</p>
              <div slot="footer">
                <b-button-toolbar>
                  <b-button-group class="mx-auto">
                    <b-button v-if="banner.orden>1" @click="atras(index)"><i class="fa fa-angle-double-left"></i> </b-button>
                    <b-button variant="primary"> <i class="fa fa-pencil"></i> </b-button>
                    <b-button variant="danger" @click="eliminar_banner(index)"> <i class="fa fa-close"></i> </b-button>
                    <b-button v-if="banner.orden<banners.length" @click="adelante(index)"><i class="fa fa-angle-double-right"></i> </b-button>
                  </b-button-group>
                </b-button-toolbar>
              </div>
            </b-card>
          </b-col>
       </b-row>
     </b-card>
     <b-modal title="CARGAR BANNER" size="lg" v-model="loadImagenModal"
        :no-close-on-backdrop="true" :header-bg-variant="submitStatus" @ok="registrar_banner">
          <b-alert>

          </b-alert>
          <b-form @submit="registrar_banner" @reset="reset_upload" >
              <b-form-group
                label="BANNER :"
                :label-cols="2"
                :horizontal="true">
                <b-form-file v-model="imageData" name="imagen" :state="!$v.imageData.$invalid"
                             ref="fileinput" accept="image/*" @change="previewImagen">
                </b-form-file>
                <b-form-invalid-feedback>Seleccione una imagen</b-form-invalid-feedback>
              </b-form-group>
              <b-row>
                <b-col>
                  <b-img rounded class="preview-imagen" :src="previewData" fluid/>
                </b-col>
              </b-row>


          </b-form>
     </b-modal>
     <b-modal>
       <b-form-group
         label="TITULO :"
         :label-cols="2"
         :horizontal="true">
         <b-form-input v-model="formbanner.titulo"
                       name="titulo"></b-form-input>
       </b-form-group>


       <b-form-group
         label="DESCRIPCION"
         :label-cols="2"
         :horizontal="true">
         <b-form-textarea v-model="formbanner.detalle" :rows="3" name="descripcion"></b-form-textarea>
       </b-form-group>
     </b-modal>
   </div>
</template>

<script>
    import axios from 'axios'
    import ElementLoading from 'vue-element-loading'
    import { required } from 'vuelidate/lib/validators'
    export default {
        name: "Banners",
        components:{
            ElementLoading
        },
        data:function () {
            return {
                loading: false,
                banners:[],
                loadImagenModal: false,
                formbanner:{
                    file:null,
                    titulo:null,
                    detalle:null
                },
                imageData: null,
                previewData:null,
                submitStatus:'info'
            }
        },
        created:function(){
            this.listar_banner()
        },
        validations:{
          imageData: required
        },
        methods:{
            crea_banner:function () {
                this.reset_upload()
                this.loadImagenModal=true
            },
            eliminar_banner:function(index){
                if(confirm('¿Desea eliminar el banner seleccionado?')){
                  let urlback=this.$store.getters.urlbackend
                  let token=localStorage.getItem('token')
                  this.loading=true
                  let banner= this.banners[index]
                  axios.defaults.headers.common['Api-Token'] = token
                  axios({url:urlback+'banner/'+banner.id,method:'delete'})
                  .then(response=>{
                    this.listar_banner()
                  }).catch(error=>{
                    console.log(error)
                    this.loading=false
                  })
                }
            },
            listar_banner:function(){
              let urlback=this.$store.getters.urlbackend
              let token=localStorage.getItem('token')
              this.loading=true
              axios.defaults.headers.common['Api-Token'] = token
              axios({url:urlback+'banners',method:'GET'})
              .then(response=>{
                  this.banners=response.data
                  this.loading=false
              }).catch(error=>{
                  console.log(error)
                  this.loading=false
              })
            },
            previewImagen:function(event){
                let files = event.target.files
                if(files[0]){
                    var reader = new FileReader()
                    reader.onload = (e)=>{
                        this.previewData=e.target.result
                    }
                    reader.readAsDataURL(files[0])
                }else{
                    this.previewData=null
                }
            },
            clearFiles () {
                this.$refs.fileinput.reset();
            },
            reset_upload:function(){
                this.$v.$reset()
                this.submitStatus='info'
                this.imageData=null
                this.clearFiles()
            },
            registrar_banner(evt){
                evt.preventDefault()
                this.$v.$touch()
                if (this.$v.$invalid) {
                  this.submitStatus = 'danger'
                } else {
                  this.submitStatus = 'success'
                  let urlback=this.$store.getters.urlbackend
                  let token=localStorage.getItem('token')
                  this.loading=true
                  axios.defaults.headers.common['Api-Token'] = token
                  let postdata= new FormData()
                  postdata.append('banner',this.imageData)
                  axios({
                    url:urlback+'banner',
                    method:'POST',
                    data:postdata,
                    onUploadProgress:uploadEvent=>{
                      console.log('Progreso : '+Math.round(uploadEvent.loaded*100/uploadEvent.total)+'% ')
                    }
                  })
                    .then(response=>{
                      this.loadImagenModal=false
                      let banner=response.data;
                      //this.listar_banner()
                    }).catch(error=>{

                  })
                }
            },
            optimizar:function(){

            },
            adelante:function(index){
              let urlback=this.$store.getters.urlbackend
              let token=localStorage.getItem('token')
              this.loading=true
              let bannerini=this.banners[index]
              let bannerfin=this.banners[(index+1)]
              let postdata={
                idini:bannerini.id,
                idfin:bannerfin.id
              }
              axios.defaults.headers.common['Api-Token'] = token
              axios({url:urlback+'banner/orden',method:'POST',data:postdata})
                .then(response=>{
                  this.banners=response.data
                  this.loading=false
                }).catch(error=>{
                console.log(error)
                this.loading=false
              })
            },
            atras:function(index){
              let urlback=this.$store.getters.urlbackend
              let token=localStorage.getItem('token')
              this.loading=true
              let bannerini=this.banners[(index-1)]
              let bannerfin=this.banners[index]
              let postdata={
                idini:bannerini.id,
                idfin:bannerfin.id
              }
              axios.defaults.headers.common['Api-Token'] = token
              axios({url:urlback+'banner/orden',method:'POST',data:postdata})
                .then(response=>{
                  this.banners=response.data
                  this.loading=false
                }).catch(error=>{
                console.log(error)
                this.loading=false
              })
            }
        }
    }
</script>

<style scoped>
 .preview-imagen{
    width: 100%;
    height: 250px;
    background: rgba(14, 12, 10, 0.17);
    border: 1px #b0b0b0 solid;
    margin-bottom: 20px;
 }
</style>
