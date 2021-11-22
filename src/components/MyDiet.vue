<template>
  <div class="flexbox-container">
    <div class="header">
      <div class="logo">
        <a v-on:click="changeRoute('/dashboard')"><h2><span style="color: #C1A65F">BEST</span> WORKOUT</h2></a>
      </div>
      <div class="header_menu">
        <ul>

          <a v-on:click="changeRoute('/myTraining')">
            <li>Trening</li>
          </a>

          <a v-on:click="changeRoute('/myDiet')">
            <li>Dieta</li>
          </a>

          <a v-on:click="changeRoute('/myProfile')">
            <li>Mój Profil</li>
          </a>

          <a v-on:click="changeRoute('/')">
            <li ><img src="../images/logout1.png"/></li>
          </a>
        </ul>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from "./Footer";
export default {
  components:{
    'my-footer': Footer,
  },
  methods:{
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if(error.name !== "NavigationDuplicated"){
          throw error;
        }
      });
    },
  }

}
</script>

<style scoped>

</style>
