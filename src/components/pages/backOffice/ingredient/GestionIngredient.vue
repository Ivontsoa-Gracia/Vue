<template>
  <div class="ingredient-page">
    <div class="actions">
      <button @click="showAddIngredient" class="action-button">
        <i class="fas fa-plus-circle"></i> Ajouter un ingrédient
      </button>
      <button @click="showAddStock" class="action-button">
        <i class="fas fa-box"></i> Ajouter du stock
      </button>
    </div>

    <table class="ingredients-list">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Image</th>
          <th>Stock restant</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in paginatedIngredients" :key="ingredient.id">
          <td>{{ ingredient.id }}</td>
          <td>{{ ingredient.nomIngredient }}</td>
          <td>
            <img v-if="ingredient.image" :src="`${urlImage}/uploads/${ingredient.image}`" alt="Image du plat" class="ingredient-image" />
            <span v-else>Aucune image disponible</span>
          </td>
          <td>{{ ingredient.remainingStock }}</td>
          <td class="btns">
            <button @click="editIngredient(ingredient)" class="btn">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteIngredient(ingredient.id)" class="btn btn-suppr">
              <i class="fas fa-trash"></i>
            </button>
            <button @click="add(ingredient.id)" class="btn">
              <i class="fas fa-box"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination avec icônes précédent et suivant -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1" class="nav-button">
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
        class="page-number"
      >
        {{ page }}
      </button>

      <button @click="nextPage" :disabled="currentPage === totalPages" class="nav-button">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Modals -->
    <add-ingredient v-if="showIngredientModal" @close="closeModal" @save="saveIngredient" />
    <add-stock v-if="showStockModal" :ingredients="ingredients" @close="closeModal" @save="saveStock" />
  </div>
</template>

<script>
import AddIngredient from "./AddIngredient.vue";
import AddStock from "./AddStock.vue";
import imageUrl from "../../../../../urlImage";
import axios from 'axios';

var url = `${process.env.VUE_APP_API_URL}api/ingredients`;
var urlDelete = `${process.env.VUE_APP_API_URL}api/ingredient/`;
console.log('API URL:', url);

export default {
  components: {
    AddIngredient,
    AddStock,
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      ingredients: [],
      currentPage: 1,
      itemsPerPage: 5,
      showIngredientModal: false,
      showStockModal: false,
      selectedIngredient: null,
      urlImage: imageUrl,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.ingredients.length / this.itemsPerPage);
    },
    paginatedIngredients() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.ingredients.slice(start, end);
    },
  },
  methods: {
    fetchIngredients() {
      try {
        axios.get(url)
          .then(response => {
            this.ingredients = response.data;
            console.log("Ingrédient chargé :", this.ingredients);
            return response;
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des ingrédients:", error);
          });
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients:", error);
      }
    },
    showAddIngredient() {
      this.showIngredientModal = true;
    },
    showAddStock() {
      this.showStockModal = true;
    },
    closeModal() {
      this.showIngredientModal = false;
      this.showStockModal = false;
    },
    saveIngredient(ingredient) {
      try {
        const newIngredient = {
          id: this.ingredients.length + 1,
          ...ingredient,
        };
        this.ingredients.push(newIngredient);
        this.closeModal();
      } catch (error) {
        console.error("Erreur lors de l'ajout d'un ingrédient:", error);
      }
    },
    saveStock(stock) {
      try {
        const ingredientToUpdate = this.ingredients.find(
          (ing) => ing.id === stock.id
        );
        if (ingredientToUpdate) {
          ingredientToUpdate.stockRestant += stock.stockRestant;
        }
        this.closeModal();
      } catch (error) {
        console.error("Erreur lors de l'ajout du stock:", error);
      }
    },
    editIngredient(ingredient) {
      this.selectedIngredient = ingredient;
      this.showAddIngredient();
    },
    deleteIngredient(id) {
      try {
        axios.delete(`${urlDelete}${id}`)
          .then(response => {
            console.log("Suppression réussie");
            this.ingredients = this.ingredients.filter(
              ingredient => ingredient.id !== id
            );
            return response.data;
          })
          .catch(error => {
            console.error("Échec de la suppression:", error);
          });
      } catch (error) {
        console.error("Erreur lors de la suppression de l'ingrédient:", error);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.fetchIngredients();
  },
};
</script>

<style scoped>
.btns {
  display: flex;
  column-gap: 2rem;
  background-color: #fff;
}

.btn {
  background-color: #7e5181;
  color: #ddd;
  cursor: pointer;
  transition: scale 0.25s ease-in, opacity 0.25s ease-in, filter 0.25s ease-in;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
}

.btn:hover {
  scale: 1.2;
}

.ingredients-list {
  width: 100%;
  border-collapse: collapse;
}

.ingredients-list th {
  padding: 12px;
  border: 1px solid #fff;
  text-align: left;
  background-color: #1A1423;
  color: #FFFFFF;
  text-transform: uppercase;
}

.ingredients-list td {
  padding: 12px;
  border: 1px solid #fff;
  text-align: left;
  background-color: #ece5ed;
}

.actions {
  display: flex;
  column-gap: 2rem;
  background-color: #fff;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-30%);
  padding: 15px 20px;
  border-bottom: 1px solid #A167A5;
  z-index: 1000;
}

.ingredient-page {
  padding-top: 80px;
}

.action-button {
  background-color: #FFFFFF;
  border: 1px solid #1A1423;
  color: #1A1423;
  cursor: pointer;
  transition: scale 0.25s ease-in, opacity 0.25s ease-in, filter 0.25s ease-in;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
}

.action-button:hover {
  scale: 1.2;
}

.pagination {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(15%);
  display: flex;
  gap: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 12px;
  border-radius: 12px;
}

.page-number {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.page-number:hover {
  background: rgba(255, 255, 255, 0.3);
}

.page-number.active {
  background: white;
  color: black;
  font-weight: bold;
}

.nav-button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ingredient-image {
  width: 50px;
  height: 40px;
  object-fit: cover;
}
</style>
