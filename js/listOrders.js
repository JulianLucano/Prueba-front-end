var contenedorTabla=document.getElementById("contenedorOrders");
$(document).ready(function(){
   
    //Creacion de spinner mientras la pagina carga los datos 
    contenedorTabla.innerHTML=`
      <div class="col-lg-12 col-md-12 col-sm-12 text-center bg-white p-3">
        <span >Cargando...</span>
        <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
      </div>
      `;

    listaOrders();
});

//Obtener la lista de ordenes
function listaOrders(){
    $.ajax({
        url : 'https://eshop-deve.herokuapp.com/api/v2/orders',
        method :'GET',
        data : {},
        dataType : 'json',
        headers: {
                   'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ'},

        success : function(json) {
          tabla(json);
        }
      });
}

//Creacion de las cards con la informacion de las ordenes
function tabla(datos){
    let data=datos.orders;
    let array={};
    let json={};
    contenedorTabla.innerHTML ='';

    if(data.length ===0){
      contenedorTabla.innerHTML =`
      
        <div class="col-lg-12 col-md-12 col-sm-12 text-center bg-white p-3">
          No hay registros
        </div>
      `;
      
    }else{

      for(let orders of data){
         
         contenedorTabla.innerHTML +=`
        
            <div class="col-lg-4 col-md-4 col-sm-12 pt-4">
              <div class="card cardOrder animate__animated animate__backInLeft" style="width: 18rem;">
                <div class="card-header text-center bg-white">
                  <i class="material-icons" style="font-size:50px;">shopping_cart</i>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Orden: ${orders.number}</h5>
                  <p class="card-text">Total: $${orders.totals.total}</p>
                  <p class="card-text">Subtotal: $${orders.totals.subtotal}</p>
                </div>
         
                <div class="card-body">
                  <hr>
                  <button type="button" class="btn btn-outline-success" onclick="detalleOrder('${orders.id}','${orders.number}')">Ver detalle</button>
                </div>
              </div>
            </div>
            `;

            array={
              "id":orders.id,
              "items":orders.items
            }

            json[array.id] = { ...array}
            }
            localStorage.setItem('datos',JSON.stringify(json));
    }
   
}

//Guardamos el id y numero de orden para ser utilizados posteriormente
function detalleOrder(noOrder,number){
  localStorage.setItem('idOrder',noOrder);
  localStorage.setItem('noOrder',number);    
  location.href="tabla.html";
}

