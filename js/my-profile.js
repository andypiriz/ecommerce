
// Formulario para editar los datos del usuario
function userForm() {
    
    let htmlContentToAppend = "";
    
    htmlContentToAppend += `
            <form id="editUserForm" action="">
             <h5 class="fillIt"> COMPLETA TUS DATOS: </h5>
             <p>Nombre:<input type="text" id="editUserName"></p>
             <p>Edad:<input type="number" id="editUserAge"></p>
             <p>Email:<input type="email" id="editUserEmail"></p>
             <p>Teléfono:<input type="number" id="editUserPhone"></p></br></br>
             <button id="userFormBTN" type="button" onclick="saveUserData(), userDataUpd(), hideForm()">
             Guardar cambios</button>
            </form>
            `
    document.getElementById("editProfileField").innerHTML = htmlContentToAppend;
    
}

//Almacena y muestra los datos del usario en el perfil
function saveUserData() {
    
    
    var userName = document.getElementById("editUserName").value;
    var userAge = document.getElementById("editUserAge").value;
    var userEmail = document.getElementById("editUserEmail").value;
    var userPhone = document.getElementById("editUserPhone").value;

    var userData = {
        name: userName,
        age: userAge,
        email: userEmail,
        phone: userPhone
    }

    let dataToString = JSON.stringify(userData);
    localStorage.setItem('userData', dataToString);

    retrieveUserData();
}
    
function retrieveUserData() {
    let htmlContentToAppend = "";
    let dataToJSON = JSON.parse(localStorage.getItem('userData'));
   
    htmlContentToAppend += `
            <div id="userDataField" class="row">
            <div class="col">
                <p><b>Nombre:</b>`+ dataToJSON.name +`</p>
                <p><b>Edad:</b>`+ dataToJSON.age +`</p>
                <p><b>Email:</b>`+ dataToJSON.email +`</p>
                <p><b>Teléfono de contacto:</b>` + dataToJSON.phone + `</p>
            </div>
            `
    document.getElementById("userNewData").innerHTML = htmlContentToAppend;

}


// Oculta el DIV vacío del HTML
function userDataUpd() {
  document.getElementById("userDataEmptyForm").style.display = "none";
}

function showUserDataUpd() {
    document.getElementById("userDataEmptyForm").style.display = "block";

}

// Oculta el formulario una vez que se pulsa el botón de guardar cambios
function hideForm() {
    document.getElementById("editUserForm").style.display = "none";
}

function removeUserData() {
    localStorage.removeItem('userData');
    document.getElementById("userDataField").remove();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    if (localStorage.getItem('userData') != null) {
        retrieveUserData();
        userDataUpd();
    }

    document.getElementById("editProfileBTN").addEventListener("click", function () {
        userForm();
        
    });
    

    

});