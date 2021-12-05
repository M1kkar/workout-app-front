<template>
  <div class="flexbox-container">
    <div class="headerMain">
      <a v-on:click="changeRoute('/')">
        <div class="logo">
          <a><h2><span style="color: #C1A65F">BEST</span> WORKOUT</h2></a>
        </div>
      </a>
      <div class="login-button-div">
        <a v-on:click="changeRoute('/login')">
          <button class="login-button">Zaloguj sie</button>
        </a>
      </div>
    </div>

    <div class="log-cont">
      <div class="login-form">
        <form>
          <div class="input1">
            <input v-model="loginForm.email" type="text" class="login-input" placeholder="E-mail"/>
          </div>
          <div class="input2">
            <input v-model="loginForm.password" type="password" class="login-input" placeholder="Password"/>
          </div>

          <button v-on:click="login" class="log-button" type="button"> Log in</button>

        </form>

      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import axios from "axios";
import endpoint from "../endpoint.json";
import {email, required} from "vuelidate/lib/validators";

export default {
  name: "Login",

  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },


    }
  },
  validations: {
    loginForm: {
      email: {required, email},
      password: {required},
    }
  },


  methods: {
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    },
    login() {
      this.$v.loginForm.$touch();
      if (this.$v.loginForm.$error) {
        this.$swal('Ops..', 'Złe dane', 'error');
      } else {
        axios.post(`${endpoint.url}/login`, this.loginForm)
            .then((response) => {
              if (response.status === 200) {
                sessionStorage.setItem('loggedIn', JSON.stringify(response.data))
                this.$router.push('/dashboard');
              }
            }).catch(() => {
          this.$swal('Ops..', 'Złe dane', 'error');
        })
      }
    }

  }
}

</script>


<style>

.swal2-title{
  font-family: 'lex' !important;
}
.swal2-html-container{
  font-family: 'lex' !important;
  font-size: 12px !important;
}
.flexbox-container {

  max-width: 1600px;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  -webkit-box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);
  -moz-box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);
  box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);


}

.headerMain {
  background: #ffffff;
  min-height: 64px;
/*  border-bottom: 1px dotted black;
  border-top: 1px dotted black;*/
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.logo {
  padding-left: 30px;
  max-width: 250px;
  font-family: lex;
  cursor: pointer;
}

.login-button-div {
  padding-right: 60px;
  padding-top: 20px;
}

.login-button {
  font-family: lex;
  background-color: black;
  border-radius: 8px;
  transition: all .1s ease-in-out;
  cursor: pointer;
  border: solid 3px black;
  color: white;
  min-height: 30px;
}

.login-button:hover {
  background-color: #C1A65F;
  border-color: #000000;
  transition: all .1s ease-in-out;
}

.log-cont {
  background-color: #EBE8E8;
  min-height: 672px;
  display: flex;
  justify-content: center;
}

.login-form {
  max-width: 350px;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: auto;
  background-color: #d9d9d9;
  border-radius: 5px;
  -webkit-box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);
  -moz-box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);
  box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);

}

.login-input {
  padding: 10px 60px;
  border: 2px solid #ddd;
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;
}

.log-button {
  width: 150px;
  height: 30px;
  background-color: black;
  font-family: lex;
  color: #FFFFFF;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all .1s ease-in-out;

}

.log-button:hover {
  background-color: #C1A65F;
  border-color: #000000;
  transition: all .1s ease-in-out;
}

.input1, .input2 {

  padding: 10px;
}

</style>
