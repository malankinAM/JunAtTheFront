let rootElement = document.documentElement;
let coloresA = {
  '--carcasa': '#d2c9c4',
  '--carcasaBorde': '#aea49b',
  '--marco': '#3b2f33',
  '--boton_O': '#8d8986',
  '--boton_N': '#5e575e',
  '--pantalla': '#bdbec2',
  '--pantallaBorde': '#646367',
  '--cover': '#d2c9c4',
  '--digitos': '#151419',
}
let coloresB = {
  '--carcasa': '#c6c4cf',
  '--carcasaBorde': '#818390',
  '--marco': '#858388',
  '--boton_O': '#676769',
  '--boton_N': '#0c0b09',
  '--pantalla': '#0e1619',
  '--pantallaBorde': '#435257',
  '--cover': '#2b292c',
  '--digitos': '#95fffc',
}

function tema (esto){
  let puntero = document.querySelector('#puntero');
  let valor = esto.checked;
  
  let object = {};
  if(valor){
    object = coloresB;
    puntero.setAttribute('cx', 60);
  }else{
    object = coloresA;
    puntero.setAttribute('cx', 20);
  }
  
  for (const color in object) {
    rootElement.style.setProperty(color, object[color]);
  }
}


let capas = document.getElementsByClassName('capa');
let capas2 = document.getElementsByClassName('capa2');
let pantalla = document.getElementById('digitos');
let textual = '';
let adelante = 0;
let atras = 36;
let resultado = 0;

for (let i = 0; i < capas.length; i++) {
  capas[i].addEventListener('click', teclear, false);
}

for (let i = 0; i < capas2.length; i++) {
  capas2[i].addEventListener('click', operar, false);
}

let n_dig = 0;

function teclear(evt) {
  let n = evt.target.previousSibling.innerHTML;
  console.log(n);
  textual += n;
  n_dig += adelante;
  pantalla.innerHTML += '<use href="#lcd' + n + '" x="' + n_dig + '"></use>'
  if (n != '.') {
    pantalla.setAttribute('transform', 'translate(-' + n_dig + ' 0)');
    if (n_dig == 180) {
      for (let i = 0; i < capas.length; i++) {
        capas[i].removeEventListener('click', teclear, false);
      }
    } else {
      adelante = 18;
    }
    atras = 18;
  } else {
    evt.target.removeEventListener('click', teclear, false);
    adelante = 0;
    atras = 18;
  }
}

function cg(evet) {
  alert('Listo para operar');
}

function limpiarPantalla() {
  pantalla.innerHTML = '';
  pantalla.removeAttribute('transform');
}

function asignarBotones() {
  for (let i = 0; i < capas.length; i++) {
    capas[i].addEventListener('click', teclear, false);
  }
}

function operar(evt) {
  if (textual != '') {
    let signo = evt.target.previousSibling.innerHTML;
    if (signo != '←') {
      limpiarPantalla();
      asignarBotones();
      n_dig = 18;
    }

    switch (signo) {
      case '+':
        textual += ' ' + signo;
        break;
      case '-':
        textual += ' ' + signo;
        break;
      case '×':
        textual += ' *';
        break;
      case '÷':
        textual += ' /';
        break;
      case '=':
        resultado = eval(textual); 
        console.log(resultado);
        graficar();
        break;
      case '√':
        resultado = eval('Math.sqrt(' + textual + ')');
        graficar();
        break;
      case 'x²':
        resultado =eval('Math.pow('+textual+',2)');
        graficar();
        break;
      case '←':
        if (textual != '') {
          n_dig -= atras;
          textual = textual.slice(0, -1);
          pantalla.removeChild(pantalla.lastChild);
          pantalla.setAttribute('transform', 'translate(-' + n_dig + ' 0)');
          if (textual.charAt(textual.length - 1) == '.') {
            atras = 0;
            asignarBotones();
          } else {
            atras = 18;
          }
        }
        break;
      case 'C':
        limpiarPantalla();
        asignarBotones();
        n_dig = 0;
        textual = '';
        break;
    }
  }
  console.log(textual);
}

function graficar(){
  let lcd = ''; 
  textual = resultado.toString();
switch (textual) {
    case 'Infinity':
        textual = "1nfi.";
        break;
    case '-Infinity':
        textual = "-1nfi.";
        break;
    case 'NaN':
        textual = "error";
        break;
}
 
       let digitos = textual.split('');
  let longitud = digitos.length;
  let k = 1;
  digitos.forEach((a,i)=>{ if(i<11){lcd += '<use href="#lcd' + a + '" x="' + (18 * k) + '"></use>';
                           a!='.'?k+=1:'';}});
  n_dig = (k-1)*18;
  pantalla.setAttribute('transform', 'translate(-' + n_dig + ' 0)');
  pantalla.innerHTML = lcd;
}

let infinito = 'm198.65 103.36 2.21-3.69 1.07-12.81-1.68-2.26-1.66 1.64-1.25 15.02zm1.65-19.8 2.07-2.12 1.09-13.13-1.79-3.32-1.45 1.66-1.25 15.02zm-75.77 18.37.48-.94 1.23-14.74-1.66-1.71-1.95 2.21-1.07 12.91zm.23-18.61 1.85-1.63 1.23-14.75-.62-1.11-3.04 2.25-1.07 12.86zm5.81 20.04 2.21-3.69 1.07-12.81-1.68-2.26-1.66 1.64-1.25 15.02zm11.95-1.43.48-.94 1.23-14.74-1.66-1.71-1.95 2.21-1.07 12.91zm-10.3-18.37 2.07-2.12 1.09-13.13-1.79-3.32-1.45 1.66-1.25 15.02zm10.53-.24 1.85-1.63 1.23-14.75-.62-1.11-3.04 2.25-1.07 12.86zm-1.27-15.4 3.44-2.58-1.68-1.34h-8.97l-.45.53 1.9 3.44zm7.08 35.44 2.21-3.69 1.07-12.81-1.68-2.26-1.66 1.64-1.25 15.02zm10.02-17.85 1.24-1.66-1.06-1.69h-6.05l-1.86 1.73 1.14 1.62zm-8.36-1.95 2.07-2.12 1.09-13.13-1.79-3.32-1.45 1.66-1.25 15.02zm9.27-15.63 3.44-2.58-1.68-1.34h-8.97l-.45.53 1.9 3.44zm7.08 35.44 2.21-3.69 1.07-12.81-1.68-2.26-1.66 1.64-1.25 15.02zm1.65-19.8 2.07-2.12 1.09-13.13-1.79-3.32-1.45 1.66-1.25 15.02zm8.86 19.8 2.21-3.69 1.07-12.81-1.68-2.26-1.66 1.64-1.25 15.02zm11.95-1.43.48-.94 1.23-14.74-1.66-1.71-1.95 2.21-1.07 12.91zm-10.3-18.37 2.07-2.12 1.09-13.13-1.79-3.32-1.45 1.66-1.25 15.02zm10.53-.24 1.85-1.63 1.23-14.75-.62-1.11-3.04 2.25-1.07 12.86zm-1.27-15.4 3.44-2.58-1.68-1.34h-8.97l-.45.53 1.9 3.44zm27.85 34.01.48-.94 1.23-14.74-1.66-1.71-1.95 2.21-1.07 12.91zm.23-18.61 1.85-1.63 1.23-14.75-.62-1.11-3.04 2.25-1.07 12.86zm-1.27-15.4 3.44-2.58-1.68-1.34h-8.97l-.45.53 1.9 3.44zm24.77 36.09 1.47-1.56-3.15-2.39h-5.94l-2.13 3.52.79.42zm1.75-2.09.48-.94 1.23-14.74-1.66-1.71-1.95 2.21-1.07 12.91zm-1.94-16.42 1.24-1.66-1.06-1.69h-6.05l-1.86 1.73 1.14 1.62zm-8.36-1.95 2.07-2.12 1.09-13.13-1.79-3.32-1.45 1.66-1.25 15.02zm10.53-.24 1.85-1.63 1.23-14.75-.62-1.11-3.04 2.25-1.07 12.86zm-21.35-15.4-1.1-2.58 1.55-1.34h7.77l.45.53-2.71 3.44z';
let aa = '<path  d="m 235,100 h4v4h-4z m 0,-5 h4v4h-4z m 0,-5 h4v4h-4z m 0,-5 h4v4h-4z m -5,15 h4v4h-4z m 0,-10 h4v4h-4z m 0,-10 h4v4h-4z m -5,20 h4v4h-4z m 0,-10 h4v4h-4z m 0,-10 h4v4h-4z m -5,15 h4v4h-4z m 0,-15 h4v4h-4z"></path>';


//*** boton +- deshabilitado