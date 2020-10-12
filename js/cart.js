var  cart = [];


// Mostar el carrito con dos artíclos pre-cargados.
function showCart(array) {

         let htmlContentToAppend = "";
            for (let i = 0; i < array.length; i++) {
                let article = array[i];
                
                htmlContentToAppend += `
                    <div class="container">
                    <div class="row">
                    <div class = "col-sm">
                    <img  id="imgProd" src=" ` + article.src + `" class="img-fluid img-thumbnail" width="200">
                    <p><b>Nombre:</b> ` + article.name + `</p>
                    <p><b>Cantidad: </b><input type="number" value="`+ article.count +`" class="productCount"></p>
                    <p><b>Precio unitario:</b> ` + article.unitCost + `</p>
                    <p><b>Moneda:</b> ` + article.currency + `</p>
                    <p><b> Subtotal: </b><span class="subTotal"></span></p>
                    <hr>
                    </div>
                    </div>
                    </div>
                    
                    `

            }
            document.getElementById("cartField").innerHTML = htmlContentToAppend;
            subtotalCost();
}

// Obtener el subtotal de los artículos que están en el carrito.
function subtotalCost() {
    let almostTotal = 0;
    let sub = document.getElementsByClassName("subTotal"); // Especifico donde voy a colocar el resultado del subtotal
    let count = document.getElementsByClassName("productCount");// Especifico de dónde voy a obtener el dato de la cantidad de productos
    
    for (let i = 0; i < cart.length; i++) {
        let result;
        let cost = cart[i].unitCost;// Variable que contiene el costo unitario de los productos.
        cart[i].count = count[i].value;// Variable que contiene el value del input de la cantidad de productos.
        
        // Si la moneda del costo del producto es en USD, se pasa a pesos, multiplicandolo por 40, sino solo se hace precio por cantidad.
        if (cart[i].currency == 'USD') {
            result = cost * cart[i].count * 40;
        } else {
            result = cost * cart[i].count;
        }
        // Agrega el subtotal al html, especificando con un string la moneda del subtotal, que en este caso va a ser pesos.
        sub[i].innerHTML = result + " UYU";
        almostTotal += result;
        
        
    }
    document.getElementById("casiTotal").innerHTML = almostTotal;// Agrega el total al html.
}




   

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
         cart = resultObj.data.articles;


            showCart(cart);
        }
        
        let prodCount = document.getElementsByClassName("productCount");

        // Cada vez que agrego un número en la cantidad de productos(input) me realiza la función de subtotal.
        for (let i = 0; i < prodCount.length; i++) {
            prodCount[i].addEventListener("input", function () {
                subtotalCost();
                
            });
        
        }

    });
});