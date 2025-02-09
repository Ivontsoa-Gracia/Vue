<template>
    <div class="plat-page">
        <div class="actions" :class="{ hidden: showPlatModal || showIngredientModal || showPlatDetailsModal }">
        <button @click="showAddPlat" class="action-button">
          <i class="fas fa-plus-circle"></i> Ajouter un plat
        </button>
        <button class="action-button">
          <router-link to="/gestion-ingredient">
            <i class="fas fa-carrot"></i> Ingrédients
          </router-link>
        </button>
      </div>
  
      <table class="plats-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prix Unitaire</th>
            <th>Temps de cuison</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plat in paginatedPlats" :key="plat.id">
            <td>{{ plat.id }}</td>
            <td>{{ plat.nomPlat }}</td>
            <td>{{ plat.prixUnitaire }}</td>
            <td>{{ plat.tempsCuisson }}</td>
            <td>
              <!-- <span>{{ plat.image }} </span> -->
              <img :src="`${urlImage}/uploads/${plat.image}`" alt="Image du plat" class="ingredient-image" />
              <!-- <span v-else >Aucune image disponible</span> -->
            </td>
            <td class="btns">
              <button @click="editPlat(plat)" class="btn">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deletePlat(plat.id)" class="btn btn-suppr">
                <i class="fas fa-trash"></i>
              </button>
              <button @click="showDetails(plat)" class="btn">
                <i class="fas fa-info-circle"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
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
      <add-plat v-if="showPlatModal" @close="closeModal" @save="savePlat" />
      <add-ingredient v-if="showIngredientModal" @close="closeModal" @save="saveIngredient" />
      <plat-details-modal v-if="showPlatDetailsModal" :plat="selectedPlat" @close="closeModal" />
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
 import AddPlat from "../plat/AddPlat.vue";
import PlatDetailsModal from "../plat/PlatDetailsModal.vue";  // Modal des détails du plat
import imageUrl from "../../../../../urlImage";
var urllist=`${process.env.VUE_APP_API_URL}api/plats`;

export default {
  components: {
    AddPlat,
    PlatDetailsModal,
  },
  data() {
    return {
      plats: [],
      currentPage: 1,
      itemsPerPage: 5,
      showPlatModal: false,
      showIngredientModal: false,
      showPlatDetailsModal: false,
      selectedPlat: null,
      urlImage: imageUrl,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.plats.length / this.itemsPerPage);
    },
    paginatedPlats() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.plats.slice(start, end);
    },
  },
  methods: {
    fetchPlats() {
      axios.get(urllist)
        .then(response=>{
          this.plats=response.data;
          console.log(response.data);
          return response;
        })
        .catch(error=>{
            return error
        });
      // Remplacer par l'appel API pour récupérer les plats
      // this.plats = [
      //   { id: 1, nomPlat: "Plat A", tempsCuisson: "360", ingredients: ["Ingrédient 1", "Ingrédient 2", "Ingrédient 3", "Ingrédient 4", "Ingrédient 5", "Ingrédient 6"] },
      //   { id: 2, nomPlat: "Plat B", tempsCuisson: "360", ingredients: ["Ingrédient 3", "Ingrédient 4"] },
      //   // Ajoutez plus de plats ici
      // ];
    },
    showAddPlat() {
      this.showPlatModal = true;
    },
    closeModal() {
      this.showPlatModal = false;
      this.showIngredientModal = false;
      this.showPlatDetailsModal = false;
    },
    savePlat(plat) {
      this.plats.push({ id: this.plats.length + 1, ...plat });
      this.closeModal();
    },
    editPlat(plat) {
      this.selectedPlat = plat;
      this.showAddPlat();
    },
    deletePlat(id) {
      this.plats = this.plats.filter((plat) => plat.id !== id);
    },
    showDetails(plat) {
      this.selectedPlat = plat;
      this.showPlatDetailsModal = true;
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchPlats();
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
      transition: 
      scale 0.25s ease-in,
      opacity 0.25s ease-in,
      filter 0.25s ease-in;
  
      &:hover {
        scale: 1.2;
      }
      padding: 0.75rem;
      font-size: 1rem;
      border: none;
      border-radius: 8px;
    }
  
    .btns:has(.btn:hover) .btn:not(:hover) {
      scale: 0.8;
      opacity: 0.8;
      filter: blur(4px);
    }
  
    .plats-list {
      width: 100%;
      border-collapse: collapse;
    }
  
    .plats-list th {
      padding: 12px;
      border: 1px solid #fff;
      text-align: left;
      background-color: #1A1423;
      color: #FFFFFF;
      text-transform: uppercase;
    }
    
    .plats-list th, .plats-list td {
      padding: 12px;
      border: 1px solid #ffffff;
      text-align: left;
    }
  
    .plats-list td {
      padding: 12px;
      border: 1px solid #fff;
      text-align: left;
      /* border-bottom: 1px solid #A167A5; */
      background-color: #ece5ed;
  
    }
  
  .actions {
    display: flex;
    column-gap: 2rem;
    background-color: #fff;
    align-items: center;
    
    /* Reste fixé en haut de la page */
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-30%);
    
    padding: 15px 20px;
    border-bottom: 1px solid #A167A5;
    z-index: 1000;
  }
  
  .plat-page {
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
  
  .actions:has(.action-button:hover) .action-button:not(:hover) {
    scale: 0.8;
    opacity: 0.8;
    filter: blur(4px);
  }

  .hidden {
    display: none;
  }

  
  /* Pagination fixée en bas avec numéros uniquement */
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
    transition: background 0.3s;
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
    transition: background 0.3s;
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
    /* border-bottom: 1px solid #ccc; */
  }
  
    
    </style>
    