
const pintarcarrito = () => {

    pestañacontenedor.innerHTML ="";
    pestañacontenedor.style.display = "flex";
    const pestaña = document.createElement("div");
    pestaña.className = "pestaña-shopp";
    pestaña.innerHTML = `
      <h1 class="pestaña-titulo">Carrito</h1> 
    `;

    pestañacontenedor.append(pestaña);

    const pestañaboton = document.createElement("h1");
    pestañaboton.innerText = "x";
    pestañaboton.className = "pestaña-titulo";

    pestañaboton.addEventListener("click",() => {
        pestañacontenedor.style.display = "none";
    });

    pestaña.append(pestañaboton)

    carrito.forEach((product) => {
    let carritocontenedor = document.createElement("div")
    carritocontenedor.className = "pestaña-content";
    carritocontenedor.innerHTML =  `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p>$${product.precio}</p>
      <p>Cantidad:${product.cantidad}</p>
      <span class="sumar"> + </span>
      <span class="restar"> - </span>
      <p>Total: ${product.cantidad * product.precio}</p>
      <span class="eliminar-producto"> ❌ </span>
    `;

    pestañacontenedor.append(carritocontenedor);

    let restar = carritocontenedor.querySelector(".restar");
    restar.addEventListener("click", () => {
        if(product.cantidad !==1 ){
        product.cantidad--;
        }
        saveLocal();
        pintarcarrito();
    });

    let sumar = carritocontenedor.querySelector(".sumar");
    sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        pintarcarrito();
    });

    let eliminar = carritocontenedor.querySelector(".eliminar-producto");

    eliminar.addEventListener("click", ()=> {
        
        Toastify({
            text: `${product.nombre} se marcho del carrito`,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #219259, #27915c)",
              borderRadius: "2rem",
              textTransform: "uppercase",
              fontSize: "1rem",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" // Agrega sombra al texto
            },
            offset: {
              x: 20,
              y: 10
            },
            onClick: function() {} // Callback after click
          }).showToast();

       eliminarproducto(product.id); 
    });
   });

   const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

   const totalprecio = document.createElement("div")
   totalprecio.className = "total-content";
   totalprecio.innerHTML = `total a pagar: $${total}`;
   
   pestañacontenedor.append(totalprecio)
};

vercarrito.addEventListener("click", pintarcarrito)

const eliminarproducto = (id) => {
   const foundid = carrito.find((element) => element.id === id);

   carrito = carrito.filter((carritoId) => {
    return carritoId !== foundid;
   })

   carritocontenedor();
   saveLocal();
   pintarcarrito();
};

const carritocontenedor = () => {
    cantidadcarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadcarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritocontenedor();