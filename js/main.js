const shopp = document.getElementById("shopp");
const vercarrito = document.getElementById("vercarrito");
const pestañacontenedor = document.getElementById("pestaña-contenedor");
const cantidadcarrito = document.getElementById("cantidadcarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProductos = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((product) => {
      let content = document.createElement("div");
      content.className = "card";
      content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="precio">$${product.precio}</p>
      `;

      shopp.append(content);

      let comprar = document.createElement("button");
      comprar.innerText = "comprar";
      comprar.className = "comprar";

      content.append(comprar);

      comprar.addEventListener("click", () => {
        const repetir = carrito.some(
          (repetirProduct) => repetirProduct.id === product.id
        );

        if (repetir) {
          carrito.forEach((prod) => {
            if (prod.id === product.id) {
              prod.cantidad++;
            }
          });

        } else {
          carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: 1,
          });

          Toastify({
            text: `${product.nombre} se agregó correctamente al carrito`,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #116c3e, #27915c)",
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

        }

        console.log(carrito);
        console.log(carrito.length);
        carritocontenedor();
        saveLocal();
      });
    });
  } catch (error) {
    console.log("Error al obtener los productos:", error);
  }
};

const modificarCarritoContenedor = () => {
  cantidadcarrito.innerText = carrito.length;
};

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

getProductos();
modificarCarritoContenedor();