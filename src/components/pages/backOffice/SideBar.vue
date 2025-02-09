<template>
  <div class="container">
    <nav class="sidebar">
      <div class="profile">
        <div class="profile-pic">
          U <!-- Valeur par défaut -->
        </div>
        <span class="utilisateurname">Nom non défini</span> <!-- Valeur par défaut -->
      </div>
      <ul>
        <li>
          <router-link to="/gestion-ingredient">
            <i class="fas fa-carrot"></i> Ingrédients
          </router-link>
        </li>
        <li>
          <router-link to="/gestion-plat">
            <i class="fas fa-utensils"></i> Plats
          </router-link>
        </li>
        <li>
          <router-link to="/gestion-recette">
            <i class="fas fa-book-open"></i> Recettes
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard">
            <i class="fas fa-chart-line"></i> 
            <span>Dashboard</span>
          </router-link>
        </li>


      </ul>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "GestionIngredient",
  data() {
    return {
      dropdownStates: {
        propriete: false,
        echeance: false,
      }
    };
  },
  methods: {
    toggleDropdown(menu) {
      this.dropdownStates[menu] = !this.dropdownStates[menu];
    }
  }
};
</script>

<style scoped>
/* Ajout des styles */
* {
  font-family: sans-serif;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #1A1423;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(180, 180, 180, 0.1);
}

.profile {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #281f36;
  border-bottom: 1px solid #A167A5;
}

.profile-pic {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: linear-gradient(135deg, #A7C5EB, #A167A5);
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.utilisateurname {
  font-size: 14px;
  font-weight: thin;
  color: #FFFFFF;
}

.sidebar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 60px;
  margin-left: 15px;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  display: block;
  color: #FFF4E1;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 5px;
  text-transform: uppercase;
  width: 80%;
  transition: all 0.3s ease-in-out;
}

.sidebar ul li a:hover {
  font-size: 0.9rem;
  transform: scale(1.05);
  filter: brightness(1.1);
}

.fas {
  font-size: 18px;
  margin-right: 8px;
}

.dropdown-toggle {
  display: block;
  color: #222831;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-toggle:hover {
  background-color: #f5f5f5;
  color: #222831;
}

.content {
  margin-left: 200px;
  padding: 10px;
}
</style>
