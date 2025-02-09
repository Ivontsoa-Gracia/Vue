<template>
    <div class="dashboard">
      <h1 class="title">Tableau de Bord</h1>
  
      <!-- Statistiques -->
      <div class="stats-container">
        <div class="stat-card">
          <h2>Montant total des ventes</h2>
          <p class="stat-value">{{ formatMontant(totalVentes) }}</p>
        </div>
        <div class="stat-card">
          <h2>Nombre de plats servis</h2>
          <p class="stat-value">{{ totalPlatsServis }}</p>
        </div>
      </div>
  
      <!-- Graphique -->
      <div class="chart-container">
        <BarChart :chart-data="chartData" :chart-options="chartOptions" />
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import { BarChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";
  import axios from "axios";
  var urlvente=`${process.env.VUE_APP_API_URL}api/vente`;

  
  Chart.register(...registerables); 
  
  export default defineComponent({
    components: {
      BarChart: BarChart
    },
    data() {
      return {
        ventes: [
          // { date: "01 Jan", montant: 25, plats: 5 },
          // { date: "02 Jan", montant: 18, plats: 3 },
          // { date: "03 Jan", montant: 3, plats: 7 },
          // { date: "04 Jan", montant: 2, plats: 6 },
          // { date: "05 Jan", montant: 3, plats: 8 }
        ]
      };
    },
    computed: {
  totalVentes() {
    return this.ventes.reduce((sum, vente) => {
      // Assurer que vente.totalAmount est un nombre valide
      const montant = parseFloat(vente.totalAmount);
      return !isNaN(montant) ? sum + montant : sum;
    }, 0);
  },
  totalPlatsServis() {
    return this.ventes.reduce((sum, vente) => {
      // Assurer que vente.totalQuantity est un nombre valide
      const quantity = parseInt(vente.totalQuantity, 10);
      return !isNaN(quantity) ? sum + quantity : sum;
    }, 0);
  },
  chartData() {
    return {
      labels: this.ventes.map(v => v.saleDate),
      datasets: [
        {
          label: "Montant des ventes (MGA)",
          data: this.ventes.map(v => parseFloat(v.totalAmount) || 0),  // S'assurer que chaque montant est valide
          backgroundColor: "rgba(167, 197, 235, 0.6)",
          borderColor: "rgba(167, 197, 235, 1)",
          borderWidth: 1
        },
        {
          label: "Plats servis",
          data: this.ventes.map(v => parseInt(v.totalQuantity, 10) || 0),  // S'assurer que chaque quantité est valide
          backgroundColor: "rgba(255, 107, 129, 0.6)",
          borderColor: "rgba(255, 107, 129, 1)",
          borderWidth: 1
        }
      ]
    };
  }
},

    methods: {
      formatMontant(montant) {
        return new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "MGA"
        }).format(montant);
      },
      fetchVente() {
  axios.get(urlvente)
    .then(response => {
      console.log(response.data);  // Vérifie la structure de la réponse
      this.ventes = response.data;
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données", error);
    });
}

    },
    mounted(){
      this.fetchVente();
    }
    
  });
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    padding: 20px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .stats-container {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  .stat-card {
    background: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 250px;
    text-align: center;
  }
  .stat-value {
    font-size: 22px;
    font-weight: bold;
    color: #2c3e50;
  }
  .chart-container {
    margin-top: 40px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  </style>
  