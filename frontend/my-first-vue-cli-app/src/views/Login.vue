<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col-10 mx-auto mt-3 rounded-3 bg-white">
        <img class="w-50 mt-5" alt="groupomania logo" src="../assets/logo-above.png" />
        <h1 class="h2 mt-3">Connexion</h1>
        <form method="post" class=" w-75 needs-validation mx-auto text-start" novalidate id="form" onsubmit="connexionExposant()">
                    <div class="form-group my-3">
                        <label for="email">adresse e-mail</label>
                        <input id="email" class="form-control" type="email" name="email" required>
                        <div class="invalid-feedback text-white">Veuillez renseigner votre adresse email</div>
                    </div>
                    <div class="form-group my-3">
                        <label for="password">Mot de passe</label>
                        <input class="form-control" type="password" name="password" id="password" required>
                        <div class="invalid-feedback text-white">Veuillez renseigner votre mot de passe</div>
                    </div>
                    <div class="row my-3">
                        <button type="button" class="btn btn-primary w-25" style="min-width: 130px;">Connexion</button>
                    </div>

                </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  
};
</script>