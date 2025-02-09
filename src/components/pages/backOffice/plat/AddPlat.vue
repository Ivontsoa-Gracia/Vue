<template>
    <div class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <h2>Ajouter un plat</h2>
        <form @submit.prevent="savePlat">
          <div class="form-group">
            <input
                type="text"
                id="nomPlat"
                v-model="plat.nomPlat"
                @focus="setFocus('nomPlat')"
                @blur="removeFocus('nomPlat')"
                required
            />
            <label for="nomPlat" class="floating-label">Nom du plat</label>
          </div>
  
          <div class="form-group">
            <input
                type="time"
                id="tempsCuisson"
                v-model="plat.tempsCuisson"
                @focus="setFocus('tempsCuisson')"
                @blur="removeFocus('tempsCuisson')"
                required
            />
            <label for="tempsCuisson" class="floating-label">Temps de cuisson</label>
          </div>
  
          <div class="form-group">
            <input
                type="text"
                id="prixUnitaire"
                v-model="plat.prixUnitaire"
                @focus="setFocus('prixUnitaire')"
                @blur="removeFocus('prixUnitaire')"
                required
            />
            <label for="prixUnitaire" class="floating-label">Prix Unitaire</label>
          </div>

          <div class="form-group">
            <input
                type="file"
                id="image"
                @change="handleFileChange"
            />
          </div>
  
          <div class="btns">
            <button type="submit">Ajouter</button>
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
  var urlcreate=`${process.env.VUE_APP_API_URL}api/plats`;
  export default {
    props: {
      platToEdit: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        plat: {
          id: this.platToEdit ? this.platToEdit.id : null,
          nomPlat: this.platToEdit ? this.platToEdit.nomPlat : '',
          tempsCuisson: this.platToEdit ? this.platToEdit.tempsCuisson : '',
          prixUnitaire: this.platToEdit ? this.platToEdit.prixUnitaire : 0,
          image:''
        },
        selectedFile: null, 
      };
    },
    methods: {
      handleFileChange(event) {
      // Récupérer le fichier sélectionné
      this.selectedFile = event.target.files[0];
    },
      close() {
        this.$emit('close');
      },
      async savePlat(){
        try {
          const formData=new FormData();
          formData.append('nomPlat',this.plat.nomPlat)
          formData.append('tempsCuisson',this.plat.tempsCuisson)
          formData.append('prixUnitaire',this.plat.prixUnitaire)

          if (this.selectedFile) {
            formData.append('image',this.selectedFile);
          }

          console.log("data= "+formData);
          

          const respone=await axios.post(urlcreate,formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log("Plat sauvegarder: ",respone.data);
          this.$emit('save', respone.data);
          this.close();
          
        } catch (error) {
          console.error('Error saving:', error.response?.data);
          alert('Erreur lors de l\'enregistrement: ' + (error.response?.data?.detail || 'Erreur inconnue.'));
        }
      },
      // savePlat() {
      //   console.log("data= "+this.plat);
        
      //   // Emit the plat object to parent for saving
      //   axios.post(urlcreate,this.plat)
      //     .then(response=>{
      //       // console.log(response.data);
      //       this.$emit('save', this.plat);
      //       this.close();
      //       return response;
      //     })
      //     .catch(error=>{
      //       return error;
      //     })
      // },
      setFocus(field) {
        // Custom logic to handle focus
        const input = document.getElementById(field);
        if (input) {
          input.classList.add('focused');
        }
      },
      removeFocus(field) {
        // Custom logic to remove focus
        const input = document.getElementById(field);
        if (input) {
          input.classList.remove('focused');
        }
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
  
  h3 {
    margin-bottom: 20px;
    text-align: center;
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
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  </style>
  