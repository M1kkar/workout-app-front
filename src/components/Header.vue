<template>
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

        <a v-on:click="logout">
          <li ><img src="../images/logout1.png"/></li>
        </a>
      </ul>
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

</style>
