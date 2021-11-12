<template>
<div class="container">
  <div class="header">
    <a v-on:click="changeRoute('/')"><h2 class="logo"><span style="color: #C1A65F">BEST</span> WORKOUT</h2></a>

    <a v-on:click="changeRoute('/login')"><button class="loginButton"> <p>LOGIN</p> </button></a>
  </div>
  <div class="log-cont">
    <div class="login-form">
      <form>
        <input v-model="loginForm.email" type="text" placeholder="E-Mail">
        <input v-model="loginForm.password" type="password" placeholder="Password">

        <input type="submit" value="Zaloguj Się!" v-on:click="login">
      </form>
    </div>

  </div>

  <my-footer/>
</div>
</template>

<script>
import axios from "axios";
import endpoint from "../endpoint.json";

export default {
  name: "Login",

  data(){
    return{
      loginForm:{
        email:'',
        password:'',
      },
    }
  },

  methods:{
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if(error.name !== "NavigationDuplicated"){
          throw error;
        }
      });
    },
    login(){
      axios.post(`${endpoint.url}/login`, this.loginForm)
           .then((response)=>{
             if(response.status===200){
               console.log(this.loginForm);
               this.$router.push('/dashboard');

             }
           })
    }

  }
}

</script>

<style>
.log-cont{
  background-color: #EBE8E8;
  height: 800px;
  text-align: center;
}

.login-form{
  position:absolute;

  width: 300px;
  height: 140px;
  top:300px;
  left:770px;
  padding:30px;
  background-color: #d9d9d9;
  border-radius: 5px;
  -webkit-box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);
  -moz-box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);
  box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);
}

input[type="text"],
input[type="password"]{
  width: 300px;
  height: 30px;
  border: 2px solid #ddd;
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;
  padding:10px;
  margin-top: 15px;

}
input[type="text"]:focus,
input[type="password"]:focus{
    background-color: #efefef;
}

input[type="submit"]{
  width: 150px;
  height: 30px;
  border: 2px solid #ddd;
  background-color: black;
  font-family: lex;
  color: #FFFFFF;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all .1s ease-in-out;
  margin-top: 15px;
}
input[type="submit"]:hover{
  background-color: #C1A65F;
  border-color: #000000;
  transition: all .1s ease-in-out;
}


</style>
