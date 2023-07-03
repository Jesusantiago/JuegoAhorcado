// Primero se obtiene las botones y div donde se dibujaran
const canvasPalabra = document.querySelector("[data-tipo='canvas-palabra']");
const canvasLetra = document.querySelector("[data-tipo='canvas-letra']");
const button = document.querySelector("[data-tipo='verificar']");

// obtenemos el canvas
let canvas = document.querySelector("[data-tipo='canvas']");
// creamos el canvas en 2 dimensiones
let ctx = canvas.getContext("2d");
// Datos de iniciación del canvas
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const partesCuerpo = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let seleccionPalabra;
let usoLetra;
let errores;
let aciertos;
let ganaste;

const palabras = ["cangrejo", "halcon", "parlante", "rugby", "ambiente", "hexagono", "descarga", "bocina"];

const agregarLetra = letra =>{
    const letraElemento = document.createElement("span")
    letraElemento.innerHTML = letra.toUpperCase();
    canvasLetra.appendChild(letraElemento);
}




const agregaParteCuerpo = partesCuerpo => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(...partesCuerpo)
}

const gano = () => {
    document.removeEventListener("keydown", letraEvento);
    button.style.display = "block";
}

const letraIncorrecta = () =>{
    agregaParteCuerpo(partesCuerpo[errores]);
    errores++;
    console.log(errores)
    if(errores === partesCuerpo.length) gano(); 
    
}

const letraAcertada = letra => {
    const { children } = canvasPalabra;
    for (let i = 0; i < children.length; i++){
        if(children[i].innerHTML === letra){
            children[i].classList.toggle("hidden");
            aciertos++;
        }
    }
    if(aciertos === palabraSeleccionada.length) gano();
}




   
const letraEntrada = letra => {
    if(palabraSeleccionada.includes(letra)){
        letraAcertada(letra);
    }
     else {
        letraIncorrecta();
    }
    agregarLetra(letra);
    usoLetra.push(letra);
}

const letraEvento = event =>{
    let nuevaLetra = event.key.toUpperCase();
    if(nuevaLetra.match(/^[a-zñ]$/i) && !usoLetra.includes(nuevaLetra));
    letraEntrada(nuevaLetra);
}

const palabraPintada = () => {
    palabraSeleccionada.forEach(letra => {
        const letraElemento = document.createElement("span");
        letraElemento.innerHTML = letra.toUpperCase();
        letraElemento.classList.add("letter");
        letraElemento.classList.add("hidden");
        canvasPalabra.appendChild(letraElemento);
    });
}

const palabraRandon = () => {
    let palabra = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();
    palabraSeleccionada = palabra.split("");
}

const pizarra = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20,20);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "#d95d39";
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);

}


const juego = () => {
    usoLetra = [];
    errores = 0;
    aciertos = 0;

    canvasPalabra.innerHTML = "";
    canvasLetra.innerHTML = "";
    button.style.display = "none";

    pizarra();
    palabraRandon();
    palabraPintada();
    document.addEventListener("keydown", letraEvento);

};


button.addEventListener("click", juego);