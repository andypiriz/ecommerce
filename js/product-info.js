var products = {};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productName        = document.getElementById("productName");
            let productDescription = document.getElementById("productDescription");
            let productCost        = document.getElementById("productCost");
            let productCurrency    = document.getElementById("productCurrency");
            let productCategory    = document.getElementById("productCategory");

            productName.innerHTML         = product.name;
            productDescription.innerHTML  = product.description;
            productCost.innerHTML         = product.cost;
            productCurrency.innerHTML     = product.currency;
            productCategory.innerHTML     = product.category;

            
        }
    });

});