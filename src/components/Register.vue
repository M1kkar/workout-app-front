<template>
  <div class="flexbox-container">
    <div class="headerMain">
      <a v-on:click="changeRoute('/')">
      <div class="logo">
        <a ><h2><span style="color: #C1A65F">BEST</span> WORKOUT</h2></a>
      </div>
      </a>
      <div class="login-button-div">
        <a v-on:click="changeRoute('/login')"><button class="login-button">Zaloguj sie</button></a>
      </div>
    </div>

    <div class="reg-cont">
      <div class="reg-form">
        <form>
          <input v-model="registerForm.email" class="inputs" type="text" placeholder="E-Mail">
          <input v-model="registerForm.password" class="inputs" type="password" placeholder="Hasło">
          <input v-model="registerForm.retype" class="inputs" type="password" placeholder="Powtórz hasło">
          <input v-model="registerForm.name" class="inputs" type="text" placeholder="Imię">
          <input v-model="registerForm.surname" class="inputs" type="text" placeholder="Nazwisko">
        </form>
        <button v-on:click="register" class="register-button" type="button">Stwórz konto</button>
      </div>

    </div>
    <my-footer/>
  </div>
</template>

<script>
import axios from "axios";
import endpoint from "../endpoint.json";
import {required ,sameAs, minLength, email} from "vuelidate/lib/validators"

export default {
  name: "Register",

  data() {
    return {
      registerForm: {
        name: '',
        surname:'',
        email: '',
        password: null,
      }
    }
  },
  validations: {
    registerForm: {
      name: {required},
      surname: {required},
      email: {required, email},
      password: {required, min: minLength(5)},
      retype: {sameAsPassword: sameAs('password')}
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
    register() {
      this.$v.registerForm.$touch();
      if (this.$v.registerForm.$error) {
        this.$swal('Coś poszło nie tak !', 'Upewnij się, że dobrze uzupełniłeś wszystkie pola', 'error');
      } else {
        axios.post(`${endpoint.url}/register`, this.registerForm, {
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
              if (response.status === 200) {
                this.$swal({
                  title:'Konto zostało utworzone',
                  icon: 'success',
                })

                this.$router.push("/");
              }
            }).catch(()=>{
            this.$swal('Coś poszło nie tak !', 'Użytkownik o taki E-mailu istenieje', 'error');
          })
        }
    }
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

.headerMain {
  background: #ffffff;
  min-height: 64px;
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

.reg-cont{
  min-height: 672px ;
  display: flex;
  justify-content: center;
  background-color: #EBE8E8;
}

.reg-form {
  padding: 20px;
  max-width: 350px;
  min-height: 250px;
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
.reg-form form{
  padding: 10px;
}

.inputs {
  padding: 10px 60px;
  border: 2px solid #ddd;
  border-radius: 8px;
  text-align: center;
  box-sizing: border-box;

}

.register-button{
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

.register-button:hover{
  background-color: #C1A65F;
  border-color: #000000;
  transition: all .1s ease-in-out;
}

</style>
