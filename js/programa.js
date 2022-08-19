let carrito=[]; 
let shop=document.getElementById("shops");
let boton_presupuesto = document.getElementById("presupuesto");

if(localStorage.getItem("carrito")){
    carrito=JSON.parse(localStorage.getItem("carrito"));
}

crearCards();

function crearCards(){
    for (const producto of productos){
        shop.innerHTML+=`
        <div class="servicios">
            <div class="servicio">
                <div class="servicio__img">
                <img src="../assets/img/${producto.imagen}.png" alt="${producto.alt}">
                </div>
                <div class="servicio__txt">
                    <h2>${producto.descripcion}</h2>
                    <h2><strong>$${producto.precio}</strong></h2>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                    <button id='btn${producto.id}'class='button__main'>Agregar al carrito</button>
                </div>
            </div>
        </div>`
    }
    productos.forEach(producto =>{
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            sumarAlCarrito(producto);
        });
    })
}

function sumarAlCarrito(producto){
    carrito.push(producto);
    console.log(carrito);
    alert(producto.descripcion+" fue agregado al carrito correctamente!");
    document.getElementById("mostrarCarrito").innerHTML+=`
        <tr>
            <td>${producto.descripcion}</td>
            <td>$${producto.precio}</td>
        </tr>
    `;
    localStorage.setItem("carrito",JSON.stringify(carrito));
}


boton_presupuesto.addEventListener("click", respuestaClick);

function respuestaClick() {
    console.log("Respuesta evento");
}; 
