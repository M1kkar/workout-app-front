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
    <div class="user-data-div">
      <div class="name-surname-input-div">
        <input type="text" class="name-input" placeholder="Name"/>
        <input type="text" class="surname-input" placeholder="Surname"/>
      </div>
      <div class="password-input-div">
        <input type="password" class="password-input" placeholder="Password"/>
        <input type="password" class="password-confirm-input" placeholder="Password"/>
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


<style>
.user-data-div{
  min-height: 672px;
  background: #EBE8E8;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;


}


.name-surname-input-div{

}

.user-data-div input{
  padding: 8px 10px;
  border: 1px solid #000000;
  border-radius: 8px;
}


</style>
