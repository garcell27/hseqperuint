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
     <b-modal title="REGISTRO DE BANNER" size="lg" v-model="myModal"
        :no-close-on-backdrop="true" header-bg-variant="success">
          <b-form>
              <b-form-group
                  label="TITULO :"
                  :label-cols="2"
                  :horizontal="true">
                  <b-form-input v-model="formbanner.titulo" ></b-form-input>
              </b-form-group>
              <b-row>
                  <b-col>
                      <b-img rounded class="preview-imagen" :src="imageData" fluid/>
                  </b-col>
              </b-row>
              <b-form-group
                  label="BANNER :"
                  :label-cols="2"
                  :horizontal="true">
                   <b-form-file v-model="formbanner.file" accept="image/*" @change="previewImagen"></b-form-file>
              </b-form-group>
              <b-form-group
                  label="DESCRIPCION"
                  :label-cols="2"
                  :horizontal="true">
                  <b-form-textarea v-model="formbanner.detalle" :rows="3"></b-form-textarea>
              </b-form-group>

          </b-form>
     </b-modal>
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
                banners:[],
                myModal: false,
                formbanner:{
                    file:null,
                    titulo:null,
                    detalle:null
                },
                imageData: null
            }
        },
        created:function(){
            this.listar_banner()
        },
        methods:{
            crea_banner:function () {
                this.reset_form()
                this.myModal=true
            },
            listar_banner:function(){
              let urlback=this.$store.getters.urlbackend
              let token=localStorage.getItem('token')
              this.loading=true
              axios.defaults.headers.common['Api-Token'] = token
              axios({url:urlback+'banners',method:'GET'})
              .then(response=>{
                  this.monedas=response.data
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
                        this.imageData=e.target.result
                    }
                    reader.readAsDataURL(files[0])
                }else{
                    this.imageData=null
                }
            },
            reset_form:function(){
                this.formbanner.titulo=null
                this.formbanner.file=null
                this.formbanner.detalle=null
                this.imageData=null
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
