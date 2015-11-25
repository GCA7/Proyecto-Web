var LOGIN=LOGIN||
{
		//funcion para guardar un usuario
		guardarUser: function() {

			var email = document.getElementById("email").value;
			var contrasena = document.getElementById("contrasena").value;
			debugger;

			if(!document.getElementById('checkterm').checked){

				alert('No has aceptado los terminos de servicio y privacidad');
			}else{

				LOGIN.validarcampos(form_registro);
			}
		},

	//funcion para guardar los datos del usuario
	guardar:function(email,contrasena)
	{
		debugger;
		this.email=email;
		this.contrasena=contrasena;

       //lo obtiene todo en si
       dato = localStorage.getItem("Login");

       //lo obtiene en objetos 
       dato = JSON.parse(localStorage.getItem("Login"));

       if(dato==null)
       {
       	var datosLogin=new Array();

       	var date={'User':this.email,'Password':this.contrasena};
       	datosLogin.push(date);
          //Este es para ser el key del localstorage y le envia un arreglo de objetos		
          localStorage.setItem("Login",JSON.stringify(datosLogin));
        }else
        {

         var date={'User':this.email,'Password':this.contrasena};
         dato.push(date);
        //Este es para ser el key del localstorage y le envia un arreglo de objetos		
        localStorage.setItem("Login",JSON.stringify(dato));

      }
    	//funcion que valida el usuario en el login

    },validar:function(email,contrasena)
    {
    	this.email=email;
    	this.contrasena=contrasena;
    	dato = localStorage.getItem("Login");

    	dato = JSON.parse(localStorage.getItem("Login"));

    	debugger;

    	for (var i = 0; i <dato.length; i++) {
    		/*validacion de los usuarios*/
    		if(dato[i].User==this.email&&dato[i].Password==this.contrasena){
    			LOGIN.useronline();
          window.open("menuprincipal.html");
          window.close("index2.html");
          var logueado=dato[i].User;
          return true;
        }
      }
      alert('[ERROR] Datos incorrectos, favor verificar');

	//valida el usuario
},Login:function()

{
	debugger;
	var email = document.getElementById("email").value;
	var contrasena = document.getElementById("contrasena").value;

	LOGIN.validar(email,contrasena);

	//funcion que muestra el contenido oculto del login
},mostrar:function()
{
	document.getElementById('oculto').style.display = 'block';
	document.getElementById('btnsesion').style.display = 'none';
	document.getElementById('btnregistro').style.display = 'none';

	//funcion para validar que el usuario llene todos los campos exigidos
},validarcampos:function(){
	debugger;
	var email = document.getElementById("email").value;
	var contrasena = document.getElementById("contrasena").value;
	var usuario = document.getElementById("usuario").value;
	var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(document.form_registro.usuario.value=="")
	{ 
		alert("No se pueden Enviar los Datos Por que Falta Rellenar Todos los Campos"); 
		return false; 
	} 
	else if(document.form_registro.contrasena.value=="") 
	{ 
		alert("No se pueden Enviar los Datos Por que Falta Rellenar Todos los Campos"); 
		return false; 
	} 
	else if(!mail.test(email)) 
	{ 
		alert("Error: La dirección de correo " + email + " no es valida");
		return false; 
	}
	else if(document.form_registro.email.value=="")
	{ 
		alert("No se pueden enviar los datos por que falta rellenar todos los campos"); 
		return false; 
	} else 
	{ 
		LOGIN.guardar(email,contrasena);
	} 

},useronline:function(){
  debugger;
  var ptoconectado = document.getElementById("email").value;
  var enlinea={'online':ptoconectado};
  localStorage.setItem("Online",JSON.stringify(enlinea));

},borradores:function(){
 debugger;
 var ptoconectado = document.getElementById("email").value;
 borra=JSON.parse(localStorage.getItem("Online"));

},salidaguardado:function(){
  debugger;
  var destinatario = document.getElementById("paramsj").value;
  var asunto = document.getElementById("asuntomsj").value;
  var contenido = document.getElementById("contenidomsj").value;
  if(LOGIN.validarlightbox()){
    var bandejaborrador=new Array();
    var correos=JSON.parse(localStorage.getItem("Borradores"));
    var newmsj={'para':destinatario,'asunto':asunto,'contenido':contenido};
    if(correos===null){
      bandejaborrador.push(newmsj);
      localStorage.setItem("Borradores",JSON.stringify(bandejaborrador));
    }else{
      correos.push(newmsj);  
      localStorage.setItem("Borradores",JSON.stringify(correos));
    }

  }
  

},validarlightbox:function(){
  debugger;
  var para = document.getElementById("paramsj").value;
  var asunto = document.getElementById("asuntomsj").value;
  var contenido = document.getElementById("contenidomsj").value;
  var validacioncorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!validacioncorreo.test(para)){
    alert("sea idiota meta un correo que sirva");
  }else if(asunto==""&&contenido==""){
    alert("Debe llenar todos los campos")
  }else{
    return true;
  }
  $("#redactar").click();

},enviadosguardado:function(){
   debugger;
  var destinatario = document.getElementById("paramsj").value;
  var asunto = document.getElementById("asuntomsj").value;
  var contenido = document.getElementById("contenidomsj").value;
  if(LOGIN.validarlightbox()){
    var bandejaenviado=new Array();
    var correosenviado=JSON.parse(localStorage.getItem("Enviados"));
    var sendmsj={'para':destinatario,'asunto':asunto,'contenido':contenido};
    if(correosenviado===null){
      bandejaenviado.push(sendmsj);
      localStorage.setItem("Enviados",JSON.stringify(bandejaenviado));
    }else{
      correosenviado.push(sendmsj);  
      localStorage.setItem("Enviados",JSON.stringify(correosenviado));
    }

  }
}




};
