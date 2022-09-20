//Declaro arreglos del programa
const productosDentroCarrito = [];
const productos = [];

class ProductoCarrito {
    constructor(productos, cantidad) {
        this.productos = productos;
        this.cantidad = cantidad;
    }
}

//Estandar pesos Argentinos 
const estandarPesosArgentinos = Intl.NumberFormat('es-ES');

//Referencias de elementos
const contenedorProductos = document.querySelector("#shops");
const contenedorCarritoCompras = document.querySelector("#mostrarCarrito");
const contenedorFooterCarrito = document.querySelector("#footer");
const botonFinalizarCompra = document.querySelector("#terminarCompra");
const botonSubmit = document.querySelector("#confirmar");

//Llamado de funciones
sumarAlCarrito();
cargarJSONLocal();

//Declaracion de funciones
function cargarJSONLocal() {
    const URLJSON = 'productos.json'
    fetch(URLJSON)
        .then(resp => resp.json())
        .then(data => {
            data.forEach(
                (elemento) => productos.push(elemento)
            )
            dibujarCatalogoProductos();
        })
};

function sumarAlCarrito() {
    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";
    cantidadArt();
    productosDentroCarrito.forEach(
        (elemento) => {
            let renglonesCarrito = document.createElement("tr");
            renglonesCarrito.classList.add('itemCarrito');

            renglonesCarrito.innerHTML = `
                <td>${elemento.productos.id}</td>
                <td class="title">${elemento.productos.nombre}</td>
                <td><input id="cantidad-producto-${elemento.productos.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.productos.precio}</td>
                <td>$ ${estandarPesosArgentinos.format(elemento.productos.precio*elemento.cantidad)}</td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito += elemento.cantidad * elemento.productos.precio;

            //Evento suma de cantidades
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.productos.id}`);

            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                sumarAlCarrito();
            });


        }
    );

    if (productosDentroCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `;
        botonFinalizarCompra.innerHTML ="";
    } else {
        contenedorFooterCarrito.innerHTML = `
        <th scope="row" colspan="5">Total de la compra: $${estandarPesosArgentinos.format (sumaCarrito)}</th>
    `;
        botonFinalizarCompra.innerHTML = `
            <a class="btn btn-primary" href="./fincompra.html" role="button">Terminar compra</a>
    `;
    }
}

function crearCards(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio} ARS</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let foto = document.createElement("img");
    foto.src = producto.imagen;
    foto.className = "card-img-top";
    foto.alt = producto.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(foto);
    carta.append(cuerpoCarta);

    //Eventos
    botonAgregar.onclick = () => {

        let productoCarrito = new ProductoCarrito(producto, 1);
        productosDentroCarrito.push(productoCarrito);

        sumarAlCarrito();

        swal({
            title: "¡Producto agregado!",
            text: `${producto.nombre} agregado al carrito de compra.`,
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ir a carrito",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if (irACarrito) {
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                    keyboard: true
                });
                const modalToggle = document.getElementById('toggleMyModal');
                myModal.show(modalToggle);

            }
        });

    }

    return carta;
}

function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCards(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );

}

function cantidadArt() {
    let cantidadArticulos = document.querySelector("#nArticulos");
    cantidadArticulos.innerHTML = ` 
        ${productosDentroCarrito.length}
    `;
}

let clear = document.querySelector("#clearAll");
clear.addEventListener('click', () => {
    productosDentroCarrito.splice(0, productosDentroCarrito.length);
    sumarAlCarrito();
});


   

   


