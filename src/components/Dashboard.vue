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
    <div class="first-content">
      <div class="first-content-inf">
        <div class="first-content-text-div">
          <div class="content-text">
            <p>STWÓRZ SWÓJ PLAN</p>
          </div>
          <div class="content-button">
            <a v-on:click="changeRoute('/myTraining')"><button class="reg-button"><p>STWÓRZ PLAN</p></button></a>
          </div>
        </div>

      </div>
    </div>
    <div class="second-content">
      <div class="second-content-inf">
        <div class="second-content-text-div">
          <p>DODAJ LUB EDYTUJ POMAIRY SWOJEGO CIAŁA</p>
        </div>
        <div class="second-content-button">
          <a v-on:click="changeRoute('/myProfile')"><button class="reg-button"><p>POMIARY CIAŁA</p></button></a>
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="cont-inf">
        <p>JEŚLI MASZ JAKIEŚ PYTANIA ODEZWIJ SIĘ</p>
      </div>
      <div class="e-mail">
        <p>example@example.com</p>
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
.flexbox-container {

  max-width: 1600px;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;

}
.header {
  background: #ffffff;
  min-height: 64px;
  border-bottom: 1px dotted black;
  border-top: 1px dotted black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;


}
.header ul{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style-type: none;
  align-items: center;

}
.header ul li{
  padding: 0 50px;
  font-family: lex;
  color: #C1A65F;
  font-size: 14px;
}

.header a{
  cursor: pointer;
}

.header_menu{
  max-width: 900px;

}

.first-content{
  min-height: 672px;
  background: #EBE8E8;
  display: flex;
  justify-content: center;
  text-align: center;

}
.first-content-inf{
  padding-top: 200px;
  max-width: 500px;
}

.first-content-text-div{
  font-family: lex;
  font-size: 24px;
  color: #C1A65F;
}



.second-content{
  min-height: 672px;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  text-align: center;
}
.second-content-inf{
  padding-top: 200px;
  max-width: 500px;
}
.second-content-text-div{
  font-family: lex;
  font-size: 24px;
  color: #C1A65F;
}


</style>
