<template>
  <div class="commandes-wrapper">
    <div class="commandes-container">
    <h2>Commandes en cours</h2>
    <ul v-if="commandesEnCours.length > 0" class="commande-list">
      <li v-for="commande in commandesEnCours" :key="commande.idCommande.id" class="commande-item">
        <div class="commande-info">
          <div class="commande-header">
            <strong class="client">Email: {{ commande.idCommande.idclient.email.split('@')[0] }}</strong>
          </div>
          <p><span>Produit:</span> {{ commande.idPlat.nomPlat }}</p>
          <p><span>Prix:</span> {{ commande.idPlat.prixUnitaire }} €</p>
          <p><span>Statut:</span> {{ commande.status }}</p>
        </div>
      </li>
    </ul>
    <p v-else>Aucune commande en cours.</p>
    </div>

     <div class="commandes-container-fini">
    <h2>Commandes Livrées</h2>
    <ul v-if="commandesLivrees.length > 0" class="commande-list">
      <li v-for="commande in commandesLivrees" :key="commande.idCommande.id" class="commande-item">
        <div class="commande-info">
          <div class="commande-header">
            <strong class="client">Client ID: {{ commande.idCommande.idClient }}</strong>
          </div>
          <p><span>Produit:</span> {{ commande.idPlat.nomPlat }}</p>
          <p><span>Prix:</span> {{ commande.idPlat.prixUnitaire }} Ar</p>
          <p><span>Statut:</span> {{ commande.status }}</p>
        </div>
      </li>


    </ul>
    <p v-else>Aucune commande livrée.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      commandesLocal: []
    };
  },
  computed: {
    commandesEnCours() {
      return this.commandesLocal.filter(commande => commande.statut !== "Livré");
    },
    commandesLivrees() {
      return this.commandesLocal.filter(commande => commande.statut === "recuperer");
    }
  },
  methods: {
    async fetchDetailCommande() {
      const url = 'http://172.90.28.128:8000/api/detailsCommandeList';
      console.log("Fetching data from:", url);

      try {
        const response = await axios.get(url);
        console.log("Response received:", response.data);

        if (Array.isArray(response.data)) {
          this.commandesLocal = response.data;
          console.log("Données traitées :", this.commandesLocal);
        } else {
          console.error("Données reçues incorrectes", response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
      }
    }
  },
  mounted() {
    this.fetchDetailCommande();
  }
};
</script>

<style scoped>
.commandes-wrapper {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.commandes-container-fini {
  flex: 1;
  padding: 20px;
  background: #1A1423;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  font-family: 'Arial', sans-serif;
  height: 90vh;
}

.commandes-container-fini h2 {
  text-align: center;
  color: #f7edf8;
  margin-bottom: 20px;
}

.commandes-container-fini .commande-item {
  margin: 10px 0;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  border-bottom: 2px solid #f8f8f8;
}

.commandes-container-fini .client {
  font-size: 16px;
  font-weight: bold;
  color: #f8f8f8;
}

.commandes-container-fini .commande-info p {
  margin: 5px 0;
  color: #f8f8f8;

}

.commandes-container-fini .commande-info span {
  font-weight: bold;
}

.commandes-container {
  flex: 1;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.commande-item {
  margin: 10px 0;
  padding: 15px;
  transition: transform 0.2s ease-in-out;
  border-bottom: 2px solid #1A1423;
}

.commandes-container h2 {
  text-align: center;
  color: #222;
  margin-bottom: 20px;

}

.commandes-container .commande-info p {
  margin: 5px 0;
}

.commandes-container .commande-info span {
  font-weight: bold;
}

.commande-list {
  list-style: none;
  padding: 0;
}

.commande-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.no-commandes {
  text-align: center;
  font-style: italic;
  color: #666;
}
</style>
