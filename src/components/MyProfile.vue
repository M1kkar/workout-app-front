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
            <li><img src="../images/logout1.png"/></li>
          </a>
        </ul>
      </div>
    </div>
    <div class="user-data-content-div">
      <div class="user-data-div">
        <h3>DANE <span style="color: #000000">OSOBOWE</span></h3>
        <div class="name-surname-input-div">
          <input type="text" class="name-input" placeholder="Imię"/>
          <input type="text" class="surname-input" placeholder="Nazwisko"/>
        </div>
        <div class="name-surname-input-div">
          <input type="password" class="password-input" placeholder="Hasło"/>
          <input type="password" class="password-confirm-input" placeholder="Hasło"/>
        </div>
        <div class="change-button-div">
          <button class="login-button">Aktualizuj</button>
        </div>
      </div>
    </div>

    <div class="body-measurement-content-div">
      <h3>POMIARY <span style="color: #000000">CIAŁA</span></h3>
      <div class="body-measurement-div">
        <div class="measurement-div-img">
          <img src="../images/bodyMeasurement.png"/>
        </div>
        <div class="body-measurement-form-div">
          1: <input type="text" class="name-input" placeholder="Wzrost"/>
          2: <input type="text" class="name-input" placeholder="Biceps"/>
          3: <input type="text" class="name-input" placeholder="Klatka"/>
          4: <input type="text" class="name-input" placeholder="Talia"/>
          5: <input type="text" class="name-input" placeholder="Biodra"/>
          6: <input type="text" class="name-input" placeholder="Udo"/>
        </div>

      </div>
      <div class="body-measurement-button-div">
        <button class="login-button">Aktualizuj</button>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from "./Footer";

export default {
  components: {
    'my-footer': Footer,
  },
  methods: {
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    },
  }

}
</script>


<style>
.user-data-content-div {
  min-height: 672px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #EBE8E8;
}

.user-data-div {
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-direction: column;
}

.user-data-div h3 {
  font-family: lex;
  color: #C1A65F;
}

.name-surname-input-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-data-div input {
  padding: 8px 30px;
  border: 1px solid #000000;
  border-radius: 8px;
  max-width: 48%;
  margin: 0 10px;
  text-align: center;
}

.body-measurement-content-div {
  min-height: 672px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  flex-direction: column;


}
.body-measurement-div{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: center;

}

.body-measurement-content-div h3 {
  font-family: lex;
  color: #C1A65F;
  margin-bottom: 70px;
}

.body-measurement-div img {
  height: 400px;
}

.body-measurement-form-div {
  max-width: 220px;
  font-family: lex;
  margin-left: 350px;

}

.body-measurement-form-div input {
  padding: 8px 30px;
  border: 1px solid #000000;
  border-radius: 8px;
  max-width: 48%;
  margin: 0 10px 30px;
  text-align: center;

}

.body-measurement-button-div{
  margin-top: 40px;
}

</style>
