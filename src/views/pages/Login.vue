<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-alert show variant="danger" v-if="errorResponse.estado" v-html="errorResponse.mensaje">
                </b-alert>
                <b-form @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted">REGISTRE SU USUARIO Y CONTRASEÑA</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" :class="{'is-invalid':errors.has('username')}" placeholder="Username" name="username"
                                  v-model="formlogin.username" v-validate="'required'"  />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Contraseña" :class="{'is-invalid':errors.has('password')}"
                                   v-model="formlogin.password" name="password" v-validate="'required'" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" type="submit">Acceder</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      formlogin:{
        username:null,
        password:null,
      },
      errorResponse:{
        estado:false,
        mensaje:''
      }
    }
  },
  methods:{
    login:function(){
      let username=this.formlogin.username
      let password=this.formlogin.password
      this.$validator.validate().then(result=>{
        if(result){
         this.$store.dispatch('login',{username:username,password:password})
            .then(()=>this.$router.push('/'))
            .catch(err=>{
              this.errorResponse.estado=true
              let response=err.response
              if(response.status==401){
                this.errorResponse.mensaje='<strong>Error de Credenciales.</strong><br> El Usuario o la contraseña son incorrectas '
              }else{
                this.errorResponse.mensaje='Upss. Ha surgido un problema de conexion'
              }
            })
        }

      })

    }
  }
}
</script>
