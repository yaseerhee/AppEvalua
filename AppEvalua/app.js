//<------------------MENSAJE------------------------>
//NO OLVIDE ECHARLE UN VISTAZO AL TXT(DESGLOSE)
//ALLÍ SE MUESTRA COMO HE PLANTEADO EL EJERCICIO
//<------------------------------------------------->

//<------------------PROPIEDADES-------------------->
// VARIBLES
var porcentajes = []; //almacen de los porcentajes introducidos
var total = []; //almacen de la media de cada ejercicio
var control = 0; // Contador del submit CalculoNotaFinal
var notafinal = 0; // almacena la notafinal

//CONSTANTES
let casosRaros = 0.1; // 10%
let funcion = 0.7; // 70%
let calidad = 0.15; // 15%
let diseno = 0.05; // 5%

// PIDE EL NUMERO DE ACTIVIDADES QUE TIENE LA PRACTICA
var numeroAct = prompt("Introduce el numero de actividades");
if(numeroAct == null){
  alert("Si cancela, no puede entrar en la aplicación.");
    window.open("https://www.google.es/");
}
while(Number(numeroAct) <= 0 || isNaN(Number(numeroAct))) {
  alert("Introduce un valor que sea un numero");
  numeroAct = prompt("Introduce el numero de actividades");
  if(Number(numeroAct) == null){
    alert("Si cancela, no puede entrar en la aplicación. ¿Está seguro?");
    confirm();
  }
}
// PIDE CONFIRMACIÓN DE LAS ACTIVIDADES INTRODUCIDAS
confirm(
  numeroAct +
    "  : Este es el numero de actividades introducidas ¿Está usted seguro? Si no es así cancele y refresque la página."
);
//<------------------------------------------------------------------------------->

//<---------------------METODOS--------------------------------------------------->
//METODO PRINCIPAL QUE INTERACTÚA DIRECTAMENTE CON EL BOTON DEL INDEX.HTML
function preguntarPracticas() {
  calculoPorcentajes();
  document.write("<br/>");
  enunciado();
  document.write("<br/>");
  generartabla();
  //BOTON NOTAFINAL
  document.write(
    '<div id="contenedorBtn"><input id="boton" type="button" value="Nota final" onclick="control++;if(control == 1){tempCalculo();}else{desactivaBoton(this.id);}">' + //ME AYUDA A FRENAR LA RECURSIVIDAD
      //BOTON LIMPIAR
      '<input id="boton" type="submit" value="Limpiar Datos" onclick="limpiar()">' +
      //BOTON PARA REFRESCAR
      '<input id="boton" type="submit" value="Refrescar Página" onclick="refrescar()"></div>'
  );
}

//METODO QUE COMPRUEBA QUE HAS INTRODUCIDO BIEN LOS PORCENTAJES Y SINO ES ASÍ
//TE PIDE UNOS NUEVOS PARA SUSTITUIRLOS.
function calculoPorcentajes() {
  if (numeroAct > 1) {
    for (let i = 0; i < numeroAct; i++) {
      porcentajes[i] = Number(
        prompt("Introduce el porcentaje de la práctica n " + (i + 1) + " : ")
      );

      //UNA VEZ INTRODUCIDO. EL WHILE TE VUELVE A PEDIR LOS PORCENTAJES EN EL CASO DE HABER
      //INTRODUCIDO UN NUMERO NO ENTERO, UN NOTANUMBER Y UN 0% (DEBIDO A QUE NINGUNA ACTIVIDAD
      //PUEDE VALER 0%)

      while (
        !Number.isInteger(porcentajes[i]) ||
        isNaN(porcentajes[i]) ||
        porcentajes[i] == 0
      ) {
        if (!Number.isInteger(porcentajes[i]) || isNaN(porcentajes[i])) {
          alert("No es un numero");
          porcentajes[i] = Number(
            prompt(
              "Introduce el porcentaje de la práctica n " + (i + 1) + " : "
            )
          );
        } else {
          alert("No puedes evaluar una actividad al 0%. XD");
          porcentajes[i] = Number(
            prompt(
              "Introduce el porcentaje de la práctica n " + (i + 1) + " : "
            )
          );
        }
      }
      //PIDE CONFIRMACIÓN DE LOS PORCENTAJES
      confirm("Confirma el porcentaje: " + porcentajes[i] + "%.");
    }
    comprobacionPorcentajes();
  } else {
    //AL HABER INTRODUCIDO SOLO UNA ACTIVIDAD. DAMOS POR HECHO QUE VALE EL 100%.
    porcentajes[numeroAct] = 100;
    console.log("Comprabación correcta"); //PARA MANTENER UN SEGUIMIENTO DE LA APP.
  }
}

//ESTE METODO CALCULO SI LA SUMA DE LOS PORCENTAJES INTRODUCIDOS DA EL 100%.
//SINO LO CUMPLE TE PIDE UNOS NUEVOS
function comprobacionPorcentajes() {
  var suma = 0;
  for (let j = 0; j < porcentajes.length; j++) {
    suma += porcentajes[j];
  }
  if (suma != 100) {
    alert("Compruebe los porcentajes. La suma de ambos no llega al 100%. ");
    for (let k = 0; k < porcentajes.length; k++) {
      porcentajes[k] = Number(
        prompt("Introduce el porcentaje de la práctica n " + (k + 1) + " : ")
      );
    }
  } else {
    console.log("Comprobación correcta");
  }
}

//METODO QUE MUESTRA UN TEXTO AL USUARIO
function enunciado() {
  document.write(
    "<h1>TE DESEAMOS TODA LA SUERTE DEL MUNDO</h1>" +
      "<h2>¡BIENVENIDO AL VERIFICADOR DE NOTAS!</h2>"
  );
}

//METODO QUE GENERA UNA TABLA POR CADA NUMERO DE ACTIVIDADES
function generartabla() {
  for (var i = 0; i < numeroAct; i++) {
    document.write("<h2>Ejercicio nº " + (i + 1) + "</h2>");
    document.write(
      '<link rel="stylesheet" href="estilos.css"><div id="resultado"><table><tr><th>Apartados</th><th>Total</th><th>Puntuación</th></tr>' +
        '<tr><td>Tratamiento de casos raros</td><td id="solcasos' +
        i +
        '"></td><td><input type="number" min="0" max="10" id="casos' +
        i +
        '"></td></tr>' +
        '<tr><td>Funcionamiento.¿hace lo que se pide?</td><td id = "solfuncion' +
        i +
        '"></td><td><input type="number" min="0" max="10" id="funcion' +
        i +
        '"></td></tr>' +
        '<tr><td>Calidad, comentarios, nomenclatura</td><td id="solcalidad' +
        i +
        '"></td><td><input type="number" min="0" max="10" id="calidad' +
        i +
        '"></td></tr>' +
        '<tr><td>Diseño</td><td id="soldisenno' +
        i +
        '"></td><td><input type="number" min="0" max="10" id="disenno' +
        i +
        '"></td></tr>' +
        "</table></div>" +
        //GENERA EL BOTON DE CALCULAR Y UNA VEZ LO PRESIONAS MUESTRA EL RESULTADO
        '<div id="boton2"><input id="boton" type="submit" value="Calcular Media" onclick="calcular()"></div>' +
        "<div><h2>El resultado del ejercicio " +
        (i + 1) +
        ':  </h2><h1 id="total' +
        i +
        '"></h1></div>'
    );
  }
}

//METODO QUE CALCULA LA MEDIA DE CADA EJERCICIO Y APARTADO
function calcular() {
  for (let i = 0; i < numeroAct; i++) {
    var casos = document.getElementById("casos" + i).value;
    //CONTROL DE QUE EL INPUT NO SEA SUPERIOR O INFERIOR A 10.
    if (casos > 10 || casos < 0) {
      alert(
        "Has introducido un valor superior a 10 o inferior a 0 en casos" +
          casos +
          " .Cambialo para poder continuar con los calculos."
      );
      casos = "null";
    } else {
      casosT = casos * casosRaros;
      casosT = Math.round(casosT * 100) / 100;
      document.getElementById("solcasos" + i).innerHTML = casosT;
    }

    var funcionamiento = document.getElementById("funcion" + i).value;
    //CONTROL DE QUE EL INPUT NO SEA SUPERIOR O INFERIOR A 10.
    if (funcionamiento > 10 || funcionamiento < 0) {
      alert(
        "Has introducido un valor superior a 10 o inferior a 0 en funcionamiento: " +
          funcionamiento +
          " .Cambialo para poder continuar con los calculos."
      );
      funcionamiento = "null";
    } else {
      funcionT = funcion * funcionamiento;
      funcionT = Math.round(funcionT * 100) / 100;
      document.getElementById("solfuncion" + i).innerHTML = funcionT;
    }

    var calidadC = document.getElementById("calidad" + i).value;
    //CONTROL DE QUE EL INPUT NO SEA SUPERIOR O INFERIOR A 10.
    if (calidadC > 10 || calidadC < 0) {
      alert(
        "Has introducido un valor superior a 10 o inferior a 0 en calidad: " +
          calidadC +
          " .Cambialo para poder continuar con los calculos."
      );
      calidadC = "null";
    } else {
      calidadT = calidad * calidadC;
      calidadT = Math.round(calidadT * 100) / 100;
      document.getElementById("solcalidad" + i).innerHTML = calidadT;
    }

    var disennoC = document.getElementById("disenno" + i).value;
    //CONTROL DE QUE EL INPUT NO SEA SUPERIOR O INFERIOR A 10.
    if (disennoC > 10 || disennoC < 0) {
      alert(
        "Has introducido un valor superior a 10 o inferior a 0 en diseño: " +
          disennoC +
          " .Cambialo para poder continuar con los calculos."
      );
      disennoC = "null";
    } else {
      disenoT = disennoC * diseno;
      disenoT = Math.round(disenoT * 100) / 100;
      document.getElementById("soldisenno" + i).innerHTML = disenoT;
    }
    //CONTROL DE QUE EN EL CASO DE QUE SEA SUPERIOR O INFERIOR EL TOTAL SEA 0
    if (
      casos == null ||
      funcionamiento == null ||
      calidadC == null ||
      disennoC == null
    ) {
      total[i] = 0;
      document.getElementById("total" + i).innerHTML = total[i];
    } else {
      //CONTROL DE QUE EN EL CASO DE QUE ESTE BIEN CALCULE EL TOTAL
      total[i] = casosT + funcionT + calidadT + disenoT;
      total[i] = Math.round(total[i] * 100) / 100;
      document.getElementById("total" + i).innerHTML = total[i];
    }
  }
}

//METODO QUE CALCULA LA NOTA FINAL
function calculoNotaFinal() {
  if (numeroAct > 1) {
    var calculoNotaFinal = [];
    for (var i = 0; i < numeroAct; i++) {
      calculoNotaFinal[i] = total[i] * (porcentajes[i] / 100);
      notafinal += calculoNotaFinal[i];
    }
    notafinal = Math.round(notafinal * 100) / 100;
  } else {
    notafinal = total;
  }
  document.write("<h1>La nota final es: " + notafinal + " </h1>");
}
//METODO QUE MUESTRA EL RESULTADO DE CALCULONOTAFINAL EN 5 SEC
function tempCalculo() {
  setTimeout(calculoNotaFinal, 5000);
}

//METODO QUE DESACTIVA EL BOTON DE CALCULONOTAFINAL Y ASÍ SOLO ACEPTA UN CALCULO
//Y NO GENERA UN RESULTADO POR CADA CLICK
function desactivaBoton(id) {
  document.getElementById(id).disabled = true;
}

//METODO QUE LIMPIA LOS INPUTS
function limpiar() {
  for (let i = 0; i < numeroAct; i++) {
    document.getElementById("casos" + i).value = " ";
    document.getElementById("funcion" + i).value = " ";
    document.getElementById("calidad" + i).value = " ";
    document.getElementById("disenno" + i).value = " ";
  }
}

//METODO QUE REFRESCA LA PAGINA
function refrescar() {
  location.reload();
}

// <------------------------------------------------------------------------------------------>
