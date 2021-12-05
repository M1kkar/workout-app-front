<template>
  <div class="flexbox-container">
    <div class="headerMain">
      <div class="logo">
        <a v-on:click="changeRoute('/')"><h2><span style="color: #C1A65F">BEST</span> WORKOUT</h2></a>
      </div>
      <div class="login-button-div">
        <a v-on:click="changeRoute('/login')"><button class="login-button">Zaloguj sie</button></a>
      </div>
    </div>

    <div class="basic-inf">
      <div class="basic-inf-inside">
        <div class="welcome-text">
          <p>Witaj w miejscu gdzie będziesz mógł śledzić swój każdy trening, i kontrolować dietę</p>
        </div>
        <div class="reg-inf">
          <p>Jeśli nie masz konta stwórz je tutaj</p>
          <a v-on:click="changeRoute('/register')"><button class="reg-button"><p>ZAREJESTRUJ SIE</p></button></a>
        </div>
      </div>
    </div>

    <div class="inf-header">
      <p>OFERUJEMY</p>
    </div>
    <div class="information">

      <div class="inf1">
        <div class="img1">
          <img src="../images/dumbell1.png"/>
        </div>
        <div class="text1">
          <p style="text-align: center ">WIELE ĆWICZEŃ</p>
          <p style="text-align: center ">Znajdziesz tu wiele ćwiczeń wraz z filmami instruktażowymi</p>
        </div>
      </div>
      <div class="inf2">
        <div class="img1">
          <img src="../images/file1.png"/>
        </div>
        <div class="text1">
          <p style="text-align: center ">ŚLEDŹ TRENINGI</p>
          <p style="text-align: center ">Zapisuj i śledź każdy swój trening </p>
        </div>
      </div>

      <div class="inf3">
        <div class="img1">
          <img src="../images/diet1.png"/>
        </div>
        <div class="text1">
          <p style="text-align: center ">KONTROLUJ DIETE</p>
          <p style="text-align: center ">Dodaj wszystko co jesz w ciągu</p>
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
  -webkit-box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);
  -moz-box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);
  box-shadow: 1px 3px 45px -22px rgba(66, 68, 90, 1);



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

.basic-inf {
  min-height: 672px;
  background: #EBE8E8;
  display: flex;
  justify-content: center;
  text-align: center;
}

.basic-inf-inside {
  padding-top: 200px;
  max-width: 500px;

}

.welcome-text {
  font-family: lex;
  font-size: 24px;
  color: #C1A65F;
}

.reg-inf {
  font-family: exa;
  font-size: 12px;
}

.reg-button {
  font-family: lex;
  background-color: black;
  border-radius: 8px;
  transition: all .1s ease-in-out;
  cursor: pointer;
  border: solid 3px black;
  color: white;
}

.reg-button:hover {
  background-color: #C1A65F;
  border-color: #000000;
  transition: all .1s ease-in-out;
}

.information {
  min-height: 372px;
  background: #FFFFFF;
  display: flex;
  justify-content: space-around;

}

.inf-header {
  font-family: lex;
  font-size: 24px;
  color: #C1A65F;
  align-self: center;
  padding-left: 45px;

}

.img1 {
  text-align: center;
  padding-top: 20px;
}

.inf1 {
  font-size: 14px;
  font-family: lex;
  max-height: 150px;
  max-width: 330px;
}

.inf2 {
  font-size: 14px;
  font-family: lex;
  max-height: 150px;
  max-width: 330px;
}

.inf3 {
  font-size: 14px;
  font-family: lex;
  max-height: 150px;
  max-width: 330px;

}

.contact {
  background: #EBE8E8;
  min-height: 672px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;



}

.cont-inf {
  font-family: lex;
  color: #C1A65F;
  font-size: 24px;
}

.e-mail {
  font-size: 20px;
  font-family: lex;

}
</style>
