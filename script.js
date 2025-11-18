// ----------------------------
// BASE DE DATOS (50 personajes)
// ----------------------------
const personajes = [
  { nombre: "Mario", img: "img/mario.png" },
  { nombre: "Luigi", img: "img/luigi.png" },
  { nombre: "Peach", img: "img/peach.png" },
  { nombre: "Bowser", img: "img/bowser.png" },
  { nombre: "Link", img: "img/link.png" },
  { nombre: "Zelda", img: "img/zelda.png" },
  { nombre: "Ganondorf", img: "img/ganondorf.png" },
  { nombre: "Samus Aran", img: "img/samus.png" },
  { nombre: "Ridley", img: "img/ridley.png" },
  { nombre: "Kirby", img: "img/kirby.png" },
  { nombre: "Meta Knight", img: "img/metaknight.png" },
  { nombre: "Pikachu", img: "img/pikachu.png" },
  { nombre: "Charizard", img: "img/charizard.png" },
  { nombre: "Sonic", img: "img/sonic.png" },
  { nombre: "Tails", img: "img/tails.png" },
  { nombre: "Knuckles", img: "img/knuckles.png" },
  { nombre: "Donkey Kong", img: "img/dk.png" },
  { nombre: "Diddy Kong", img: "img/diddy.png" },
  { nombre: "Fox McCloud", img: "img/fox.png" },
  { nombre: "Falco Lombardi", img: "img/falco.png" },
  { nombre: "Yoshi", img: "img/yoshi.png" },
  { nombre: "Wario", img: "img/wario.png" },
  { nombre: "Waluigi", img: "img/waluigi.png" },
  { nombre: "Mega Man", img: "img/megaman.png" },
  { nombre: "Protoman", img: "img/protoman.png" },
  { nombre: "Ryu", img: "img/ryu.png" },
  { nombre: "Chun-Li", img: "img/chunli.png" },
  { nombre: "Ken", img: "img/ken.png" },
  { nombre: "Pac-Man", img: "img/pacman.png" },
  { nombre: "Cloud Strife", img: "img/cloud.png" },
  { nombre: "Tifa Lockhart", img: "img/tifa.png" },
  { nombre: "Aerith", img: "img/aerith.png" },
  { nombre: "Sephiroth", img: "img/sephiroth.png" },
  { nombre: "Geralt", img: "img/geralt.png" },
  { nombre: "Ciri", img: "img/ciri.png" },
  { nombre: "Kratos", img: "img/kratos.png" },
  { nombre: "Atreus", img: "img/atreus.png" },
  { nombre: "Lara Croft", img: "img/lara.png" },
  { nombre: "Master Chief", img: "img/masterchief.png" },
  { nombre: "Cortana", img: "img/cortana.png" },
  { nombre: "Scorpion", img: "img/scorpion.png" },
  { nombre: "Sub-Zero", img: "img/subzero.png" },
  { nombre: "Gordon Freeman", img: "img/gordon.png" },
  { nombre: "Alyx Vance", img: "img/alyx.png" },
  { nombre: "Solid Snake", img: "img/snake.png" },
  { nombre: "Big Boss", img: "img/bigboss.png" },
  { nombre: "Sora", img: "img/sora.png" },
  { nombre: "Bayonetta", img: "img/bayonetta.png" },
  { nombre: "Jill Valentine", img: "img/jill.png" },
  { nombre: "Leon S. Kennedy", img: "img/leon.png" },
];

// ----------------------------
// ELEMENTOS
// ----------------------------
const imgPersonaje = document.getElementById("img-personaje");
const opcionesDiv = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaFinal = document.getElementById("pantalla-final");
const resultadoFinal = document.getElementById("resultado-final");
const animFinal = document.getElementById("anim-final");
const btnReiniciar = document.getElementById("btn-reiniciar");

let preguntas = [];
let index = 0;
let aciertos = 0;
let bloqueado = false; // evita múltiples respuestas por pregunta

// ----------------------------
// UTILIDADES para las preguntas random
// ----------------------------
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

// ----------------------------
// LÓGICA DE PREGUNTAS para una pregunta, dos respuestas falsas y mezclado
// ----------------------------
function generarPreguntas() {
  const seleccion = pickRandom(personajes, 5);
  return seleccion.map((p) => {
    const falsas = pickRandom(
      personajes.filter((x) => x.nombre !== p.nombre),
      2
    ).map((x) => x.nombre);
    const opciones = shuffle([p.nombre, ...falsas]);
    return { img: p.img, correcta: p.nombre, opciones };
  });
}

// ----------------------------
// RENDER Y INTERACCIÓN imagen de pregunta, anima el movimiento, bloquea respuestas
// ----------------------------
function mostrarPregunta() {
  bloqueado = false;
  mensaje.textContent = "";
  const q = preguntas[index];

  imgPersonaje.src = q.img;
  imgPersonaje.alt = `Personaje: ${q.correcta}`;

  opcionesDiv.innerHTML = "";
  q.opciones.forEach((op) => {
    const btn = document.createElement("div");
    btn.className = "opcion pixel anim-bote";
    btn.textContent = op;

    btn.onclick = () => {
      if (bloqueado) return;
      bloqueado = true;
      validarRespuesta(op, q.correcta, btn);
    };

    opcionesDiv.appendChild(btn);
  });
}

function validarRespuesta(opcion, correcta, btnClicada) {
  const todosBtns = Array.from(opcionesDiv.children);

  // bloquea interacción y da feedback visual // da color a la respuesta correcta e incorrecta
  todosBtns.forEach((btn) => {
    btn.style.pointerEvents = "none";
    if (btn.textContent === correcta) {
      btn.style.borderColor = "#33ff00";
      btn.style.boxShadow = "0 0 12px #33ff00";
      btn.style.background = "#0a0";
    } else if (btn === btnClicada) {
      btn.style.borderColor = "#ff4444";
      btn.style.boxShadow = "0 0 12px #ff4444";
      btn.style.background = "#400";
    }
  });

  if (opcion === correcta) {
    mensaje.style.color = "#33ff00";
    mensaje.textContent = "✅ ¡Correcto! ✅";
    aciertos++;
  } else {
    mensaje.style.color = "#000000ff";
    mensaje.textContent = `❌ ¡Incorrecto! La respuesta correcta era ${correcta} ❌`;
  }

  setTimeout(() => {
    index++;
    if (index < 5) {
      mostrarPregunta();
    } else {
      finalizarJuego();
    }
  }, 1100);
}

// ----------------------------
// FINAL oculta imagen y opciones, muestra resultado y animación según aciertos
// ----------------------------
function finalizarJuego() {
  pantallaJuego.classList.add("oculto");
  pantallaFinal.classList.remove("oculto");

  resultadoFinal.textContent = `Has acertado ${aciertos} de 5 personajes.`;

  animFinal.innerHTML = "";
  animFinal.className = "";

  if (aciertos === 5) {
    animFinal.innerHTML = "🎉";
    animFinal.classList.add("celebracion");
  } else if (aciertos >= 3) {
    animFinal.innerHTML = "✨";
    animFinal.classList.add("neutro");
  } else {
    animFinal.innerHTML = "💀";
    animFinal.classList.add("triste");
  }
}

// ----------------------------
// REINICIO
// ----------------------------
btnReiniciar.onclick = () => {
  index = 0;
  aciertos = 0;
  preguntas = generarPreguntas();
  pantallaFinal.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");

  mostrarPregunta();
};

// ----------------------------
// INICIO
// ----------------------------
window.addEventListener("DOMContentLoaded", () => {
  preguntas = generarPreguntas();
  mostrarPregunta();
});
