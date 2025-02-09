<template>
    <div class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <h2>{{ plat.nomPlat }}</h2>
        
        <div class="plat-details">
          <!-- Temps de cuisson -->
          <div class="temps-cuisson">
            <h5>Temps de cuisson : {{ plat.tempsCuisson }} secondes</h5>
          </div>
          
          <!-- Liste des ingrédients -->
          <div class="ingredients-list">
            <h5>Ingrédients :</h5>
            <div class="container-card">
                <div class="ingredient-card" v-for="ingredient in plat.ingredients" :key="ingredient">
                <p>{{ ingredient }}</p>
                </div>
            </div>
          </div>
        </div>
        
        <div class="btns">
          <button type="submit">Ajouter</button>
          <div class="parent-div">
            <button @click="close" type="button" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      plat: Object,
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
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
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    left: 50%;
    transform: translateX(20%);
  }
  
  h2 {
    font-size: 1.6rem;
    margin-bottom: 5px;
    color: #333;
  }
  
  h5 {
    font-size: 0.9rem;
    margin-bottom: 10px;
    color: #7e5181;
  }
  
  .temps-cuisson,
  .container-card {
    display: flex;
    flex-wrap: wrap; /* Permet aux éléments de passer à la ligne */
    justify-content: space-between; /* Répartit uniformément les éléments */
    gap: 0.4rem; /* Espacement entre les éléments */
    background-color: #fff;
    padding: 10px 0;
    border-bottom: 1px solid #A167A5;
    margin-bottom: 30px;
  }

  .ingredient-card {
    flex: 1 1 calc(33.33% - 0.4rem); /* 3 éléments par ligne avec l'espacement */
    background-color: #f8f8f8;
    padding: 0px 0px;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

    /* Assure une meilleure disposition sur les petits écrans */
    @media (max-width: 768px) {
        .ingredient-card {
            flex: 1 1 calc(50% - 0.4rem); /* Passe à 2 éléments par ligne sur mobile */
        }
    }

    @media (max-width: 480px) {
        .ingredient-card {
            flex: 1 1 100%; /* Un seul élément par ligne sur les très petits écrans */
        }
    }

  
  .ingredient-card p {
    font-size: 0.8rem;
    color: #333;
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
  </style>
  