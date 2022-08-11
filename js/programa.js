let i = 1, j = 1, l = 0; // condiciones 
let totalC = 0, totalS=0, total=0; //Precio total
let final = 0; //Confirmar compra
let conti=1, contc = 1, conts=1;
//let comp;

const suma = (a , b) => {return a+b}
 
const cafes = [
    {nombre: "cafe primera marca",precio: 1000},
    {nombre: "cafe segunda marca",precio: 600},
]

const servicios = [
    {nombre: "servicio prueba",precio: 1500},
    {nombre: "servicio facturacion",precio: 2000},
]

const carrito = [
    {nombre: "cafe primera marca",precio: 1000, cantidad:0},
    {nombre: 'cafe segunda marca',precio: 600,cantidad:0},
    {nombre: 'servicio prueba',precio: 1500,cantidad:0},
    {nombre: 'servicio facturacion',precio: 2000,cantidad:0},
    {nombre: 'SALIR'}
];

while( i != 0)
{  
    alert ("Ingrese un número para ver los productos")
    let producto = prompt("Productos:\n[1] Cafes\n[2] Servicios\n");
   
    if (producto == 1)
    {
        if (contc != 0)
        {
            console.log("Cantidad de productos: "+Cafes.length);
            for(const cafe of cafes)
            {
                console.log(conti+" Producto: "+cafe.nombre+ " Precio: "+cafe.precio);
                conti++;
                contc = 0;
            }
            console.log("\n");
        }
        j=1;

        while (j != 0)
        {
            let cafe = prompt("Escriba el nombre del producto que desea comprar, o escriba SALIR para dejar de comprar")
            conti=1;
            
            console.log(cafe);

            let encontrado = carrito.find((cafes)=>cafes.nombre==cafe);

            console.log(encontrado);

           switch (encontrado.nombre)
            {
                case "cafe primera marca": totalC = suma (totalC , carrito[0].precio); alert ("Total a pagar: $"+totalC); carrito[0].cantidad++; break;
                case "cafe segunda marca": totalC = suma (totalC ,carrito[1].precio); alert ("Total a pagar: $"+totalC); carrito[1].cantidad++; break;
                case "SALIR": j = 0; alert ("Total a pagar: $"+totalC); break;
                default: alert("No Ingresó ni un 1 ni un 2"); break;
            }
        }

    }

    else if (producto == 2)
    {
            if (conts != 0)
            {
                console.log("Cantidad de productos: "+servicios.length);
                for(const servicio of servicios)
                {
                    console.log(conti+" Producto: "+servicio.nombre+ " Precio: "+servicio.precio);
                    conti++;
                    conts = 0;
                 }
                 console.log("\n");
        }

        j=1;

        while (j != 0)
        {
            let serv2 = prompt("Escriba el nombre del producto que decea comprar, o escriba SALIR dejar de comprar")
            conti=1;
            
            console.log(serv2);

            let encontradom = carrito.find((serv)=>serv.nombre==serv2);

            console.log(encontradom);

           switch (encontradom.nombre)
            {
                case "servicio prueba": totalC = suma (totalC , carrito[5].precio); alert ("Total a pagar: $"+totalC); carrito[5].cantidad++; break;
                case "servicio facturacion": totalC = suma (totalC ,carrito[6].precio); alert ("Total a pagar: $"+totalC); carrito[6].cantidad++; break;
                case "SALIR": j = 0; alert ("Total a pagar: $"+totalC); break;
                default: alert("No Ingresó ni un 1 ni un 2"); break;
            }
        }
    }

    else 
    {
        alert("Ingresó mal el número para ver los productos");  
    }

    i = prompt ("¿Desea comprar otro producto?\n[0] NO\n[1] SI")
}

total = totalS + totalC;

if (totalS > 0)
{
    alert("servicios comprados:\nservicios de prueba = "+carrito[5].cantidad+"\nservicios facturacion = "+carrito[6].cantidad);
}
if (totalC > 0)
{
    alert("Cafes comprados:\ncafe de primera marca = "+carrito[0].cantidad+"\nCafe de segunda marca = "+carrito[1].cantidad);
}

alert("Total a pagar por cafes = $" +totalC+"\nTotal a pagar por servicios = $"+totalS+ "\nTotal a pagar = $" +total);

l = prompt ("¿Desea Realizar la Compra?\n[1] Si\n[2]No")
if (l == 1)
{
alert ("¡Gracias por su compra!");
}
else if (l == 2)
{
    alert ("Su compra fue Cancelada\n¡Vuelva Pronto!");
}