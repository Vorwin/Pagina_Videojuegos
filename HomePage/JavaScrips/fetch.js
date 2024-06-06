const img_prod = document.getElementById("img_prod"); 
const label_name = document.getElementById("label_name");
const precio_label = document.getElementById("precio");

const img_prod2 = document.getElementById("img_prod2");
const label_name2 = document.getElementById("label_name2");
const precio_label2 = document.getElementById("precio2");

const img_prod3 = document.getElementById("img_prod3");
const label_name3 = document.getElementById("label_name3");
const precio_label3 = document.getElementById("precio3");

//Constantes para el inventario
const divCards = document.getElementById("divCards");
const name_card = document.getElementById("name_card");
const precio_card = document.getElementById("precio_card");
const almacen_card = document.getElementById("almacen_card");
const cantidad_card = document.getElementById("cantidad_card");
const lista = document.getElementById("lista");
var rolUsuario = localStorage.getItem('rolUsuario');
const offcanvasRightLabel = document.getElementById("offcanvasRightLabel");

window.onload = (event) => {
    productos_de_inicio(); 
    productos_inventarios();
    
    switch (rolUsuario) {
      case "vendedor": 
      if (location.pathname.includes("inventario.html")) {
        offcanvasRightLabel.innerText ="Vendedor"
        lista.innerHTML = `
        <ul>
        <li>
        <a href="./index.html">HomePage</a>
        </li>
        <li>
        <a href="./historial_trans.html">Historial de transacciones</a>
        </li>
        </ul>`
      }
      else if(location.pathname.includes("historial_trans.html")){
        offcanvasRightLabel.innerText ="Vendedor"
        lista.innerHTML = `
        <ul>
        <li>
        <a href="./index.html">HomePage</a>
        </li>
        <li>
        <a href="./inventario.html">Inventario</a>
        </li>
        </ul>`
      }
      else {
      offcanvasRightLabel.innerText ="Vendedor"
        lista.innerHTML = `
        <ul>
            <li>
                <a href="./inventario.html">Inventario</a>
            </li>
            <li>
                <a href="./historial_trans.html">Historial de transacciones</a>
            </li>
        </ul>`
    }
    break;
    case "cliente": 
    if (location.pathname.includes("compras.html")) {
      offcanvasRightLabel.innerText ="Cliente"
      lista.innerHTML = `
      <ul>
        <li>
          <a href="./index.html">Home Page</a>
        </li>
      </ul>`
    }else{
      offcanvasRightLabel.innerText ="Cliente"
        lista.innerHTML = `
        <ul>
            <li>
                <a href="./compras.html">Compras</a>
            </li>
        </ul>`
    }
    break; 
  }
    
};


//Funcion que pone los productos de los almacenes seleccionados 
const select = document.getElementById('select_almacen');
select.addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    mostrar_almacen(selectedOption.value);
});

function mostrar_almacen(almacen) {
    const api_almacen = `http://localhost:3000/productos/buscar/ubicacion/${almacen}`

    fetch(api_almacen)
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        .then(data => {
            divCards.innerHTML = "";
            data.forEach(element => {
                divCards.innerHTML += ` 
                <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="card text-center shadow">
                  <div class="card-body">
                    <img src="${element.imagen}" alt="" class="card-img-top img-fluid bonito" id="img_card" style="width: 20rem; height: 23rem;">
                    <h2 class="mt-4 " id="name_card">${element.nombre}</h2>
                    <h4 class="" id="precio_card">$${element.precioVenta}</h4>
                    <h4 class="" id="almacen_card">${element.ubicacion}</h4>
                    <h4 class="" id="cantidad_card">Stock: ${element.cantidadDisponible}</h4>
                  </div>
                </div>
              </div>`
            });
           

        })
        .catch(error => {
            console.error('Error al cargar los datos JSON', error);
        });
}

//Funcion para los productos del menu principal
function productos_de_inicio() {
    const api = "http://localhost:3000/productos"; 
    
    fetch(api)
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        .then(data => {
            const img = data[1].imagen;
            const precio = data[1].precioVenta;
            const nombre = data[1].nombre;

            img_prod.src = img;  
            label_name.innerHTML = `<h1 class="sliderTitle"id="label_name">${nombre}</h1>`;
            precio_label.innerHTML = `<h2 class="sliderPrice" id="precio">$${precio.toString()}</h2>`;

            const img2 = data[0].imagen;
            const precio2 = data[0].precioVenta;
            const nombre2 = data[0].nombre;

            img_prod2.src = img2;  
            label_name2.innerHTML = `<h1 class="sliderTitle"id="label_name">${nombre2}</h1>`;
            precio_label2.innerHTML = `<h2 class="sliderPrice" id="precio2">$${precio2.toString()}</h2>`;

            const img3 = data[2].imagen;
            const precio3 = data[2].precioVenta;
            const nombre3 = data[2].nombre;

            img_prod3.src = img3;  
            label_name3.innerHTML = `<h1 class="sliderTitle"id="label_name">${nombre3}</h1>`;
            precio_label3.innerHTML = `<h2 class="sliderPrice" id="precio3">$${precio3.toString()}</h2>`;

           

        })
        .catch(error => {
            console.error('Error al cargar los datos JSON', error);
        });
}

//Funcion para sacar los productos en inventario

function productos_inventarios() {
    const api = "http://localhost:3000/productos";
    
    fetch(api)
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        .then(data => {
            divCards.innerHTML = "";
            data.forEach(element => {
                divCards.innerHTML += ` 
                <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="card text-center shadow">
                  <div class="card-body">
                    <img src="${element.imagen}" alt="" class="card-img-top img-fluid bonito" id="img_card" style="width: 20rem; height: 23rem;">
                    <h2 class="mt-4" id="name_card">${element.nombre}</h2>
                    <h4 class="" id="precio_card">$${element.precioVenta}</h4>
                    <h4 class="" id="almacen_card">${element.ubicacion}</h4>
                    <h4 class="" id="cantidad_card">Stock: ${element.cantidadDisponible}</h4>
                  </div>
                </div>
              </div>`
            });
            
            verificarCantidad();
          })
        .catch(error => {
            console.error('Error al cargar los datos JSON', error);
        });
        
}
/*=============== Alerta de inventario bajo  ===============*/
function verificarCantidad() {

  const api = "http://localhost:3000/productos";
    
    fetch(api)
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        .then(data => {
            data.forEach(element => {
              if (element.cantidadDisponible < 5) {
                alert(`¡Atención! La cantidad disponible de ${element.nombre} es menor que 5. Actualmente quedan ${element.cantidadDisponible} unidades.`);
            }
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos JSON', error);
        });
  
}

