<template>
  <div class="headerMain">
    <div class="logo">
      <a v-on:click="changeRoute('/dashboard')"><h2><span style="color: #C1A65F">BEST</span> WORKOUT</h2></a>
    </div>
    <div class="navbar">
      <a v-on:click="changeRoute('/myProfile')">Mój profil</a>
<!--      <a v-on:click="changeRoute('/myDiet')" >Dieta</a>-->
      <div class="dropdown">
        <button class="dropbtn">Dieta
        <i class="fa fa-caret-down"></i></button>
        <div class="dropdown-content">
          <a v-on:click="changeRoute('/myDiet')">Moja Dieta</a>
          <a v-on:click="changeRoute('/addProduct')">Dodaj Produkt do Bazy</a>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">Trening
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a v-on:click="changeRoute('/myTraining')" >Moje Treningi</a>
          <a v-on:click="changeRoute('/allExercises')">Ćwiczenia</a>
          <a v-on:click="changeRoute('/aboutTraining')">O Treningu</a>
        </div>
      </div>
      <a v-on:click="logout">
        <img src="../images/logout1.png"/>
      </a>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {

  },
  methods: {
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });

    },
    logout() {
      sessionStorage.removeItem('loggedIn');
      axios.get('/')
          .then((response) => {
            if (response.status === 200) {
              sessionStorage.removeItem('loggedIn');
              this.$router.push('/');
            }
          }).catch(() => {
      });
    },
  }
}
</script>

<style>
.headerMain {
  background: #ffffff;
  min-height: 64px;
  border-bottom: 1px dotted black;
  border-top: 1px dotted black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;


}
/*.headerMain ul{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style-type: none;
  align-items: center;

}
.headerMain ul li{
  padding: 0 50px;
  font-family: lex;
  color: #C1A65F;
  font-size: 14px;
}

.headerMain a{
  cursor: pointer;
}

.header_menu{
  max-width: 900px;

}*/

.navbar {
  overflow: hidden;
  background-color: #FFFFFF;
  margin-top: 10px;
}

.navbar a {
  float: left;
  font-size: 14px;
  font-family: lex;
  color: #C1A65F;
  text-align: center;
  padding: 14px 26px;
  text-decoration: none;
  cursor: pointer;

}
.navbar a:hover{
  border-bottom: dotted 1px black;
}

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 14px;
  border: none;
  outline: none;
  color: #C1A65F;
  padding: 14px 46px;
  background-color: inherit;
  margin: 0;
  font-family: lex;
}


.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
  cursor: pointer;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
