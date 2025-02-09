<template>
    <div class="container">
      <h1>Gestion des Recettes</h1>
      
      <div class="form-group">
        <select id="plat" v-model="selectedDish" @focus="setFocus('plat')" @blur="removeFocus('plat')" required>
          <option v-for="dish in dishes" :key="dish.id" :value="dish.id">
            {{ dish.nomPlat }}
          </option>
        </select>
        <label for="plat" class="floating-label" :class="{'has-value': selectedDish}">Choisir un plat</label>
      </div>
      
      <div class="container-card">
        <div v-for="ingredient in ingredients" :key="ingredient.id" @click="addIngredient(ingredient)" class="ingredient-card p-4 border rounded cursor-pointer hover:bg-gray-100">
            <img :src="`${urlImage}/uploads/${ingredient.image}`" alt="Image" class="ingredient-image">
            <br>
            <p>{{ ingredient.nomIngredient }}</p>
        </div>
      </div>

      <div class="btns">
          <button type="submit" @click="saveRecipe">Sauvegarder la recette</button>
      </div>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import imageUrl from "../../../../../urlImage";
  var urllistePlat=`${process.env.VUE_APP_API_URL}api/plats`;
  var urllisteIngredient=`${process.env.VUE_APP_API_URL}api/ingredients`;
  var urlinsertIngredientPlat=`${process.env.VUE_APP_API_URL}api/ingredientplat`;
  export default {
    data() {
      return {
        urlImage: imageUrl,
        selectedDish: null,
        focusedFields: {}, // Ajout de focusedFields
        // dishes: [
        //   { id: 1, name: 'Spaghetti Bolognese' },
        //   { id: 2, name: 'Poulet Curry' }
        // ],
        dishes:[],
        // ingredients: [
        //     { id: 1, image: require('@/assets/image/p1.jpg'), name: 'Tomates' },
        //     { id: 2, image: require('@/assets/image/p3.jpg'), name: 'Oignons' },
        //     { id: 3, image: require('@/assets/image/p4.jpg'), name: 'Ail' }
        // ],
        ingredients:[],

        recipe: {},
        
      };
    },
    methods: {
      fetchPlats() {
        axios.get(urllistePlat)
          .then(response=>{
            this.dishes=response.data;
            return response;
          })
          .catch(error=>{
              return error
            });
      },
      fetchIngredients() {
        axios.get(urllisteIngredient)
          .then(response=>{
            this.ingredients=response.data;
            return response;
          })
          .catch(error=>{
              return error
            });
      },
      addIngredient(ingredient) {
        if (!this.recipe[ingredient.id]) {
          this.recipe[ingredient.id] = 1;
        } else {
          this.recipe[ingredient.id]++;
        }
      },
      saveRecipe() {
        for (const idIngredient in this.recipe) {
          console.log("ingredient id= " + idIngredient);
          console.log("data= " + this.selectedDish + " " + idIngredient);
          axios.post(urlinsertIngredientPlat, {
            plat: this.selectedDish,
            ingredient: idIngredient
          })
          .then(response => {
            console.log('Recette sauvegardée pour l\'ingrédient ' + idIngredient, response.data);
          })
          .catch(error => {
            console.error('Erreur lors de la sauvegarde de la recette pour l\'ingrédient ' + idIngredient, error);
          });
        }
      },

      setFocus(field) {
        this.focusedFields[field] = true;
      },
      removeFocus(field) {
        this.focusedFields[field] = false;
      }
    },
    mounted() {
      this.fetchPlats();
      this.fetchIngredients();
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    left: 50%;
    transform: translateX(20%);
  }
  
  .close-btn {
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    color: white;
    transition: transform 0.2s ease, background-color 0.3s ease;
    margin-top: 50px;
  }
  
  /* Effet au survol */
  .close-btn:hover {
    background-color: #7e5181;
    transform: scale(1.1);
  }
  
  /* Centrer le bouton dans le div parent */
  .parent-div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Adapter à la hauteur du parent */
    width: 100%;
    position: relative;
  }
  
  
  button[type="submit"] {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: white;
    background: #A167A5;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button:hover {
    background-color: #7e5181;
  }
  
  .btns:has(button:hover) button:not(:hover) {
    scale: 0.8;
    opacity: 0.8;
    filter: blur(4px);
  }
  
  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }
  
  .floating-label {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    background: white;
    padding: 0 5px;
    color: #999;
    font-size: 1rem;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem 12px;
    font-size: 1rem;
    border: 1px solid #A167A5;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: #878787;
    background: white;
    box-sizing: border-box;
  }
  
  input[type="date"],
  input[type="number"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }
  
  input:focus, select:focus {
    border-color: #A167A5;
    outline: none;
    box-shadow: 0 0 5px #A167A5;
  }
  
  /* Déplacement du label si le champ est en focus ou contient une valeur */
  input:focus ~ .floating-label,
  select:focus ~ .floating-label,
  .floating-label.has-value {
    top: 3px;
    left: 18px;
    font-size: 0.9rem;
    color: #A167A5;
  }

  .container-card {
    display: flex;
    column-gap: 2rem;
    background-color: #fff;
    align-items: center;
    margin-bottom: 50px;
  }

.ingredient-card {
  position: relative;
  width: 80px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

}

.ingredient-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.ingredient-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  /* border-bottom: 1px solid #ccc; */
}

.container-card p {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 10px;
  color: #333;
}

  </style>
  