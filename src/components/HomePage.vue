<template>
  <div class="container">
      <div class="header">
        <a v-on:click="changeRoute('/')"><h2 class="logo"><span style="color: #C1A65F">BEST</span> WORKOUT</h2></a>

        <a v-on:click="changeRoute('/login')"><button class="loginButton"> <p>LOGIN</p> </button></a>
      </div>
      <div class="basic-inf">
         <div class="inf">
           <p class="welcome-text">Witaj w miejscu gdzie będziesz mógł ułożyć swój własny plan, i kontrolować dietę</p>
           <p class="reg-inf">Jeśli nie masz konta stwórz je tutaj</p>
           <a v-on:click="changeRoute('/register')"><button class="reg-button"><p>ZAREJESTRUJ SIE</p></button></a>
         </div>
         <div class="graph">

         </div>
      </div>
      <div class="information">
        <div class="of-text">OFERUJEMY</div>
          <div class="options">
            <div class="off-option1">
          <div class="img-opt1">
            <img src="../images/dumbell1.png"/>
          </div>
          <h3>WIELE ĆWICZEŃ</h3>
            <p>Znajdziesz tu wiele ćwiczeń wraz z filamami instruktażowymi</p>
        </div>
            <div class="off-option2">
          <div class="img-opt1">
            <img src="../images/file1.png"/>
          </div>
          <h3>WŁASNY PLAN</h3>
          <p>Stworzysz tu własny plan, oraz będziesz mógł dodawać postępy w każdym ćwiczeniu</p>
        </div>
            <div class="off-option3">
          <div class="img-opt1">
            <img src="../images/diet1.png"/>
          </div>
          <h3>KONTROLUJ DIETE</h3>
          <p>Dodaj wszystko co jesz w ciągu</p>
        </div>
          </div>
          <div style="clear: both"></div>
      </div>
      <div class="contact">
          <div class="cont-inf">JEŚLI MASZ JAKIEŚ PYTANIA ODEZWIJ SIĘ</div>
          <div class="e-mail">example@example.com</div>
      </div>
      <my-footer/>



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

.container{
  width: 1600px;
  margin-right: auto;
  margin-left: auto;
}

.header{
  width: 100%;
  height: 88px;
  background-color: #ffffff;
  border-bottom: 1px dotted black;
  border-top: 1px dotted black;
}
.logo{
  font-family: lex ;
  width: 260px;
  height: 30px;
  float: left;
  padding-left: 40px;
  padding-top: 10px;
  cursor: pointer;
}

.loginButton{
  font-family: lex;
  margin-left: 1100px;
  margin-top: 20px;
  width: 118px;
  height: 45px;
  left: 1600px;
  top: 29px;
  background-color: black;
  border-radius: 8px;
  transition: all .1s ease-in-out;
  cursor: pointer;
  border: solid 3px black;

}
.loginButton:hover{
  background-color: #C1A65F;
  border-color: #000000;
  transition: all .1s ease-in-out;
}


.loginButton p{
  color: #FFFFFF;

}

.basic-inf{
  width: 100% ;
  height: 672px;
  background: #EBE8E8;
  clear: both;


}
.graph{
  float:left;
  width: 35%;
  height: 60%;
  background-color: gray;
  margin-left: 340px;
  margin-top: 110px;
  border-radius: 8px;
}
.inf{
  float:left;
  width: 30%;
  margin-top: 160px;
  margin-left: 160px;
  text-align: center;

}
.welcome-text{
  font-family: lex;
  font-size: 24px;
  color: #C1A65F;
}
.reg-inf{
  font-family: exa;
  font-size: 12px;

}
.reg-button{
  font-family: lex;
  background-color: black;
  border-radius: 8px;
  transition: all .1s ease-in-out;
  cursor: pointer;
  border: solid 3px black;
}
.reg-button p{
  color: #FFFFFF;
}
.reg-button:hover{
  background-color: #C1A65F;
  border-color: #000000;
  transition: all .1s ease-in-out;
}


.information{
  width: 100%;
  height: 492px;
  background-color: #FFFFFF;
  text-align: center;

}

.of-text{
  padding: 30px 0;

  font-family: lex;
  color: #C1A65F;
  font-size: 24px;

}
.options{
  width: 1600px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;



}
.off-option1{
  font-size: 14px;
  font-family: lex;
  float: left;

  width: 533px;

}
.off-option2{
  font-size: 14px;
  font-family: lex;
  float: left;

  width: 533px;

}
.off-option3{
  font-size: 14px;
  font-family: lex;
  float: left;

  width: 533px;

}
.options h3{
  color: #C1A65F
}
.img-opt1{
  padding: 30px;
}

.contact{
  width: 100%;
  height: 672px;
  background-color: #EBE8E8;
  clear: both;
  text-align: center;

}
.cont-inf{
  font-family: lex;
  color: #C1A65F;
  padding-top: 250px;
  font-size: 24px;
}
.e-mail{
  padding-top: 30px;
  font-size: 20px;
  font-family: lex;
}


</style>
