<template>
  <div class="login-page">
    <div class="form-container">
      <h1 class="form-title">Inscription</h1>
      <p class="form-subtitle">Créez un compte pour accéder à nos services.</p>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input
            type="email"
            id="email"
            v-model.trim="form.email"
            placeholder=" "
            required
          />
          <label for="email" class="floating-label">Email</label>

        </div>
        <div class="form-group">
          <input
            type="password"
            id="password"
            v-model.trim="form.mot_de_passe"
            placeholder=" "
            required
          />
          <label for="email" class="floating-label">Mot de passe</label>
        </div>
        <button type="submit" class="submit-button" :disabled="loading">
          <span v-if="loading">Connexion...</span>
          <span v-else>S'inscrire</span>
        </button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p class="footer-text">
        Vous avez deja de compte ?
        <router-link to="/admin-login">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../../../../firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        mot_de_passe: "",
      },
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async submitForm(){
      this.loading = true;
      this.errorMessage = "";
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.form.email, this.form.mot_de_passe);
        const token = await getIdToken(userCredential.user);
        localStorage.setItem('tokenAdminResto', token);
        this.$router.push('/gestion-ingredient');
      } catch (error) {
        this.errorMessage = error.message;
      }
      finally {
        this.loading = false;
      }
    }
    // async submitForm() {
    //   if (!this.form.email || !this.form.mot_de_passe) {
    //     alert("Veuillez remplir tous les champs.");
    //     return;
    //   }

    //   this.loading = true;
    //   this.errorMessage = "";
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:3002/api/utilisateur/login",
    //       this.form,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     localStorage.setItem("id_utilisateur", response.data.id_utilisateur);
    //     this.$router.push({ name: "PagePropriete" });
    //   } catch (error) {
    //     console.error("Erreur lors de la connexion :", error);
    //     this.errorMessage = error.response?.status === 401
    //       ? "Email ou mot de passe incorrect."
    //       : "Une erreur est survenue. Veuillez réessayer plus tard.";
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  },
};
</script>

<style scoped>

* {
  font-family: sans-serif;
}

.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
  /* background: linear-gradient(135deg, #A7C5EB, #FFF4E1); */
}

.form-container {
  background: white;
  padding: 2rem;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

.form-title {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: #A167A5;
}

.form-subtitle {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #333;
  opacity: 0.7;
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

input {
  width: 90%;
  padding: 0.75rem 12px;
  font-size: 1rem;
  border: 1px solid #A167A5;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #878787;
  background: white;
}

input:focus,
input:not(:placeholder-shown) {
  border-color: #A167A5;
  outline: none;
  box-shadow: 0 0 5px #A167A5;
}

input:focus ~ .floating-label,
input:not(:placeholder-shown) ~ .floating-label {
  top: 3px;
  left: 18px;
  font-size: 0.9rem;
  color: #A167A5;
}


.submit-button {
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

.submit-button:hover {
  background: #7e5181;
}

.submit-button:disabled {
  background: #d8b7db;
  cursor: not-allowed;
}

.footer-text {
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.footer-text {
  color: #333;

}

.footer-text a {
  color: #A167A5;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}

.error-message {
  color: #FF6B81;
  margin-top: 1rem;
}

@media (max-width: 600px) {
  .form-container {
    padding: 1.5rem;
  }
}
</style>
