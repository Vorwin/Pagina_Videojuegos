const usuario = document.getElementById("login-email");
const contraseña = document.getElementById("login-pass");
let rol;
let loginExitoso = false;
btn_Login.addEventListener("click", function () {
  const api = "http://localhost:3000/usuarios";
  fetch(api)
    .then((respuesta) =>
      respuesta.ok ? respuesta.json() : Promise.reject(respuesta)
    )
    .then((data) => {
      //----------------------------------------------------
      data.forEach((element) => {
        if (
          element.user == usuario.value &&
          element.password == contraseña.value 
        ){
         rol = element.rol;
         localStorage.setItem('rolUsuario',rol)
         loginExitoso = true;
         window.open("../HomePage/index.html", "_self");
        }
      });
      if (!loginExitoso) { // Si el inicio de sesión no fue exitoso, mostramos una alerta
         alert("¡Inicio de sesión fallido! Por favor, verifica tu usuario y contraseña.");
      }
    })
    .catch((error) => {
      console.error("Error al cargar los datos JSON", error);
    });
});

/*=============== Esconder la contraseña  ===============*/
const showHiddenPass = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye);

  iconEye.addEventListener("click", () => {
    // Change password to text
    if (input.type === "password") {
      // Switch to text
      input.type = "text";

      // Icon change
      iconEye.classList.add("ri-eye-line");
      iconEye.classList.remove("ri-eye-off-line");
    } else {
      // Change to password
      input.type = "password";

      // Icon change
      iconEye.classList.remove("ri-eye-line");
      iconEye.classList.add("ri-eye-off-line");
    }
  });
};

showHiddenPass("login-pass", "login-eye");
