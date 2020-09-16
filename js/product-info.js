var product = {};
var num_stars = 1;


//Mostrar imágenes del producto en un carrusel
function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
      if (i == 0) {                             
          htmlContentToAppend += ` 
          <div class="carousel-item active">
              <img class="d-block w-100" src="` + array[i] + `" > 
          </div> 
          `
      } else {
          htmlContentToAppend += `
          <div class="carousel-item">
              <img class="d-block w-100" src="` + array[i] + `">
          </div>
          `
      }
  }
  document.getElementById("Caruzel").innerHTML = htmlContentToAppend;
}

//Muestra los productos relacionados
function relatedProducts(relatedProduct) {

  getJSONData(PRODUCTS_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          let htmlContentToAppend = "";
          for(let i = 0; i < relatedProduct.length; i++){
              let product = resultObj.data[relatedProduct[i]];
                  htmlContentToAppend += ` 
                  <a href = "product-info.html?name=`+ product.name + `" class="list-group-item list-group-item-action col-6">
                  <img  src=" ` + product.imgSrc + `" class="img-thumbnail"> 
                  <h3> ` + product.name + ` </h3>
                  <p> ` + product.currency + ` ` +  product.cost + ` </p>

                  </a>
              `
          }

          document.getElementById('related_products').innerHTML = htmlContentToAppend;
        };

      });
  }



// Mostar el nombre del usuario actual en la sección de comentar
var userComment = localStorage.getItem("nombre_usuario");
  document.getElementById("userCom").innerHTML = userComment;

function stars_score() {
stars ="";
for(let s=5; s>0; s--) {
  if(s > num_stars) {
    stars +=`<span class="fa fa-star float-right"></span>`
  } else {
    stars +=`<span class="fa fa-star checked float-right"></span>`
  }
  document.getElementById("stars_rating").innerHTML=stars;
}
}



//Agregar estrellas a la calificación
function add_star() {
  if(num_stars < 5) {
    num_stars++;
  }
}

//Restar estrellas a la calificación
function take_star() {
  if(num_stars > 1) {
    num_stars--;
  }
}

//Mostrar las estrellas en el formulario, para calificar
function show_rating(num) {
  let rating = "";
  
  for(let x=5; x>0; x--) {
    
    if(x > num) {
      rating +=`<span class="fa fa-star float-right"></span>`
    } else {
      rating +=`<span class="fa fa-star checked float-right"></span>`
    }
    document.getElementById("stars_rating").innerHTML= rating;

  }
}



//Añadir comentario a la pantalla actual
function addComment(event) {
  event.preventDefault();
  let opinion = document.getElementById("opinion").value;
  

  let comment = "";
  var today = new Date();
  var todayDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  comment = `
          <h4><b>Su comentario:</b></h4>
          <p><b>Usuario: `+userComment+`</b></p>
          <p><b>Comentario:</b> `+opinion+`</p>`
          for(let y = 5; y > 0; y--) {
    
            if(y > num_stars) {
              comment += `<span class="fa fa-star float-right"></span>`
            } else {
              comment += `<span class="fa fa-star checked float-right"></span>`
            }}
          comment+=
          `
          <p><b>Fecha:</b> `+todayDate+`</p>
          <hr>
        `
      document.getElementById("users").innerHTML += comment;
}







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

            showImagesGallery(product.images);
            relatedProducts(resultObj.data.relatedProducts);

            
        }
        
    });

    //Mostrar los comentarios que están en el JSON
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            let htmlContentToAppend = "";
            
            for(let i = 0; i < product.length; i++){
            let comment = product[i];
            
           
                
            htmlContentToAppend += `
                 
              <img src="img/avatar.png" alt="Usuario" style="float: left; padding: 10px;">
              <p><b>Usuario: `+comment.user+`:</b></p>
              <p><b>Comentario:</b> `+comment.description+`</p>
              <p><b>Calificación:</b> `+comment.score+` <i class="fa fa-star"></i></p>
              <p><b>Fecha:</b> `+comment.dateTime+`</p>
             <hr>
            `
          stars_score();

         document.getElementById("users").innerHTML = htmlContentToAppend;
          
        }
      }
    });
    
    
    
    

});

