<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/7.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
      <!--<b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item>-->
      <b-dropdown-item @click="logout"><i class="fa fa-lock"/> Salir del Sistema</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  methods:{
    logout(){
      if(confirm('¿Desea Salir del sistema?')){
        this.$store.dispatch('logout')
          .then(()=>this.$router.push('/login'))
          .catch(err=>console.log(err))
      }
    }
  }
}
</script>
