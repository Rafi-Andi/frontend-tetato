<script setup></script>

<template>

    <div class="login-container">
       
        <div class="login-image">
            <img src="https://ik.imagekit.io/misxxns4p/banner/loginfoto.png" alt="Login image">
        </div>

        <div class="login-form">
            <h2>Login Admin</h2>
            <p>Untuk mengakses dashboard silahkan login</p>
            <form>
                <label for="email" class="semibold">Email</label>
                <input type="email" id="email" name="email" required>
                <label for="password" class="semibold">Password</label>
                <input type="password" id="password" name="password" required>
                <button type="submit">Sign Up</button>
            </form>
    </div>
    </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}


.login-container {
  display: flex;
  width: 80%;
  max-width: 1000px;
  
  overflow: hidden;
  
}


.login-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}


.login-form {
  flex: 1;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-form h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}

.login-form p {
  font-size: 14px;
  color: #777;
  margin-bottom: 30px;
}


form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
}

input {
  padding: 12px;
  border: none;
  border-radius: 10px;
  background-color: #fff8dc;
  margin-bottom: 20px;
  font-size: 14px;
}

button {
  background-color: #f1c40f;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #e2b607;
}


@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .login-image {
    height: 250px;
  }

  .login-form {
    padding: 30px;
  }
}

 </style>