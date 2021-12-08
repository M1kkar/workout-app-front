<template>
  <div class="flexbox-container">
    <my-header/>
    <div class="exercise-content-div">
      <div class="category-menu">
        <nav class="left-side-menu">
          <a v-on:click="getExercises('Klatka')">
            <div class="option">Klatka Piersiowa</div>
          </a>
          <a v-on:click="getExercises('Plecy')">
            <div class="option">Plecy</div>
          </a>
          <a v-on:click="getExercises('Nogi')">
            <div class="option">Nogi</div>
          </a>
          <a v-on:click="getExercises('Barki')">
            <div class="option">Barki</div>
          </a>
          <a v-on:click="getExercises('Biceps')">
            <div class="option">Biceps</div>
          </a>
          <a v-on:click="getExercises('Triceps')">
            <div class="option">Triceps</div>
          </a>
          <a v-on:click="getExercises('Brzuch')">
            <div class="optionL">Brzuch</div>
          </a>
        </nav>
      </div>
      <div class="exercises-div">
        <div class="exercises">
          <table class="table">
            <thead>
            <tr>
              <th>Pozycja</th>
              <th>Nazwa Ćwiczenia</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(exercise,i) in allExercises" v-bind:key="i" class="active-row">
              <td>{{ i + 1 }}</td>
              <td>{{ exercise }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>


<script>
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import endpoint from "../endpoint.json";

export default {
  components: {
    'my-footer': Footer,
    'my-header': Header,
  },
  data() {
    return {
      allExercises: [],
    }
  },


  mounted() {
    this.getExercises("Klatka");
  },

  methods: {
    changeRoute(route) {
      this.$router.push(route).catch(error => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
      });
    },
    getExercises(name) {
      axios.post(`${endpoint.url}/exercises/all?name=${name}`)
          .then((response) => {
            if (response.status === 200) {
              this.allExercises = response.data;
            }

          })
    }
  }
}
</script>
<style scoped>

.exercise-content-div {
  min-height: 672px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  background: #EBE8E8;

}

.category-menu {
  min-height: 500px;
  min-width: 250px;
  background: #d3d3d3;
  border-radius: 9px;
  margin-left: 70px;
  flex-direction: column;
  text-align: center;
}

.category-menu .option {
  padding: 28px;
  font-family: lex;
  font-size: 12px;
  border-bottom: 1px dotted black;
}

.category-menu .optionL {
  padding: 28px;
  font-family: lex;
  font-size: 12px;
}

.option:hover {
  cursor: pointer;
  color: #C1A65F;
  background: #dddddd;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

.optionL:hover {
  cursor: pointer;
  color: #C1A65F;
  background: #dddddd;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
}

.exercises-div {
  min-height: 500px;
  min-width: 900px;
  background: #d3d3d3;
  border-radius: 9px;
  align-self: center;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-family: lex;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.table thead tr {
  background-color: #ababab;
  color: #000000;
  text-align: left;
}

.table th,
.table td {
  padding: 35px 25px;
}

.table tbody tr {
  border-bottom: 1px solid #C1A65F;
}

.table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.table tbody tr:last-of-type {
  border-bottom: 2px solid black;
}

.table tbody tr.active-row {
  font-weight: bold;
  color: black;
}

</style>


