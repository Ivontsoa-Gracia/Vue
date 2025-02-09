<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Ajouter un ingrédient</h2>
      <form @submit.prevent="saveIngredient">
        <div class="form-group">
          <input
            type="text"
            id="nomIngredient"
            v-model="ingredient.nomIngredient"
            required
          />
          <label for="nomIngredient" class="floating-label" :class="{'has-value': ingredient.nomIngredient !== ''}">
            Nom ingrédient
          </label>
        </div>

        <div class="form-group">
          <input
            type="file"
            id="image"
            @change="handleFileChange"
            required
          />
        </div>

        <div class="btns">
          <button type="submit">Enregistrer</button>
          <div class="parent-div">
            <button @click="close" type="button" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ingredient: {
        nomIngredient: '',
        image: null,  // L'image sera stockée ici temporairement
      },
      selectedFile: null, // Pour stocker le fichier sélectionné
    };
  },
  methods: {
    handleFileChange(event) {
      // Récupérer le fichier sélectionné
      this.selectedFile = event.target.files[0];
    },
    async saveIngredient() {
      try {
        const formData = new FormData();
        formData.append('nomIngredient', this.ingredient.nomIngredient);
        if (this.selectedFile) {
          formData.append('image', this.selectedFile);
        }

        const response = await axios.post(`${process.env.VUE_APP_API_URL}api/ingredients`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Ingredient saved:', response.data);
        this.$emit('save', response.data);
        this.close();
      } catch (error) {
        console.error('Error saving ingredient:', error.response?.data);
        alert('Erreur lors de l\'enregistrement: ' + (error.response?.data?.detail || 'Erreur inconnue.'));
      }
    },
    close() {
      this.$emit('close');
    },
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
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    left: 50%;
    transform: translateX(20%);
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
  