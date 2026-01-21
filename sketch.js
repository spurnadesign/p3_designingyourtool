// --- Frases ---
let frasesFront = ["Cuerpo y espinas", "Silencio y lucha", "Archivo y cuerpo"];
let fraseIndexFront = 0;

let frasesBack = ["Libertad y verdad", "Diferencia y cambio", "Inicio y ruptura"];
let fraseIndexBack = 0;

// --- Colores ---
let colores = ["#E40303","#FF8C00","#FFED00","#008026","#004DFF","#750787"];

// --- Imágenes ---
let ojos = [];
let mouth = [];

// --- Portada ---
let ojosIndexFront = 0;
let mouthIndexFront = 0;

// --- Contraportada ---
let ojosIndexBack = 0;
let mouthIndexBack = 0;

// --- Tipografía ---
let fontInsolente;
let fraseDisplayFront, fraseDisplayBack;

// --- Sliders ---
let sliderFront, sizeSliderFront;
let sliderBack, sizeSliderBack;

// --- Canvas ---
let canvasFront, canvasBack;

// --- Cargar imágenes y tipografía ---
function preload() {
  fontInsolente = loadFont("TIPO/Insolente-Regular.otf");

  for (let i = 1; i <= 5; i++) {
    ojos.push(loadImage(`IMG/ojos_${i}.png`));
    mouth.push(loadImage(`IMG/boca_${i}.png`));
  }
}

function setup() {
  // Canvas Portada
  canvasFront = createCanvas(450, 500);
  canvasFront.parent("canvasFrontWrapper");

  // Canvas Contraportada
  new p5(sketchBack, 'canvasBackWrapper');

  // Sliders y textarea
  sliderFront = document.getElementById("sliderFront");
  sizeSliderFront = document.getElementById("sizeSliderFront");
  sliderBack = document.getElementById("sliderBack");
  sizeSliderBack = document.getElementById("sizeSliderBack");

  fraseDisplayFront = document.getElementById("fraseDisplayFront");
  fraseDisplayBack = document.getElementById("fraseDisplayBack");

  actualizarFraseFront();
  actualizarFraseBack();

  textFont(fontInsolente);
  textAlign(CENTER, TOP);
}

// ----------------- Portada -----------------
function draw() {
  let colorIndex = parseInt(sliderFront.value);
  background(colores[colorIndex]);

  image(ojos[ojosIndexFront], 0, 0);
  image(mouth[mouthIndexFront], 0, 300);

  let fontSize = parseInt(sizeSliderFront.value);
  //otro frasesBack[frasesIndexBack] //drawTextfontautofront
  drawTextAutoFront(frasesFront[fraseIndexFront], fontSize, width / 2, 20, width - 40, height - 40);
   

}


function drawTextAutoFront(txt, fontSize, x, y, boxWidth, boxHeight) {
  textFont(fontInsolente);
  textSize(fontSize);
  fill(255);

  let words = txt.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    if (textWidth(currentLine + " " + word) < boxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  // Ajuste automático si sobrepasa el alto del canvas
  let lineHeight = textAscent() + textDescent() + 5;
  let totalHeight = lines.length * lineHeight;
  if (totalHeight > boxHeight) {
    let scaleFactor = boxHeight / totalHeight;
    textSize(fontSize * scaleFactor);
    lineHeight = textAscent() + textDescent() + 5;
    totalHeight = lines.length * lineHeight;
  }

  let startY = y + (boxHeight - totalHeight) / 2;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, startY + i * lineHeight);
  }
}

// ----------------- Contraportada -----------------
const sketchBack = (p) => {
  p.setup = () => {
    p.createCanvas(450, 500);
    p.textFont(fontInsolente);
    p.textAlign(p.CENTER, p.TOP);
    
  };

  p.draw = () => {
    let colorIndex = parseInt(document.getElementById("sliderBack").value);
    p.background(colores[colorIndex]);

   p.image(ojos[ojosIndexBack], 0, 0);
   // p.image(mouth[mouthIndexBack], 0, 300);
    let fontSizeBack = parseInt(document.getElementById("sizeSliderBack").value);
    drawTextAutoBack(frasesBack[fraseIndexBack], fontSizeBack, p);

  };

  /*function drawTextAutoBack(txt, fontSize, p) {
    p.textFont(fontInsolente);
    p.textSize(fontSize);
    p.fill(255);

    let words = txt.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      let word = words[i];
      if (p.textWidth(currentLine + " " + word) < p.width - 40) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);


    //calcular el lineheight_p no funciona calcula tamaño y escala del texto respecto del centro de la posición de la
    let lineHeight_p = p.textAscent() + p.textDescent() + 100;
    let totalHeight_p = lines.length * lineHeight_p;
   if (totalHeight_p > p.height - 40) {
      let scaleFactor_p = (p.height - 40) / totalHeight_p;
     p.textSize(fontSize * scaleFactor_p);
   }
    let startY_p = (p.height) / 2;
    for (let i = 0; i < lines.length; i++) {
      p.text(lines[i], p.width / 2, totalHeight_p + startY_p + i * 40);
    }
   
}*/

function drawTextAutoBack(txt, fontSize, p) {
  p.textFont(fontInsolente);
  p.textSize(fontSize);
  p.fill(255);

  let boxWidth = p.width - 40;
  let words = txt.split(" ");
  let lines = [];
  let current = words[0];

  for (let i = 1; i < words.length; i++) {
    if (p.textWidth(current + " " + words[i]) < boxWidth) {
      current += " " + words[i];
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);

  // Calcular lineHeight y totalHeight
  //let lineHeight = 50 + 100 + 6;
  let lineHeight = fontSize * 1.2;
  let totalHeight = lines.length * lineHeight;

  // Escalar si sobrepasa altura
  if (totalHeight > p.height - 40) {
    let scaleFactor = (p.height - 40) / totalHeight;
    p.textSize(fontSize * scaleFactor);
    lineHeight = p.textAscent() + p.textDescent() + 6;
    totalHeight = lines.length * lineHeight;
  }

  // Centrado vertical
  let startY = (p.height - totalHeight) / 2;

  // Dibujar cada línea
  for (let i = 0; i < lines.length; i++) {
    p.text(lines[i], p.width / 2, startY + i * lineHeight);
  }
}

}


  


// ---------- Funciones UI ----------
function nextTextFront() { fraseIndexFront = (fraseIndexFront + 1) % frasesFront.length; actualizarFraseFront(); }
function actualizarFraseFront() { fraseDisplayFront.value = frasesFront[fraseIndexFront]; }

function nextTextBack() { fraseIndexBack = (fraseIndexBack + 1) % frasesBack.length; actualizarFraseBack(); }
function actualizarFraseBack() { fraseDisplayBack.value = frasesBack[fraseIndexBack]; }

function nextOjosFront() { ojosIndexFront = (ojosIndexFront + 1) % ojos.length; }
function nextMouthFront() { mouthIndexFront = (mouthIndexFront + 1) % mouth.length; }

function nextOjosBack() { ojosIndexBack = (ojosIndexBack + 1) % ojos.length; }
function nextMouthBack() { mouthIndexBack = (mouthIndexBack + 1) % mouth.length; }

// --- Export ---
function saveCoverPNG(which) {
  if (which === 'front') saveCanvas(canvasFront, 'portada', 'png');
  else if (which === 'back') saveCanvas(document.querySelector("#canvasBackWrapper canvas"), 'contraportada', 'png');
}

function saveCoverJPG(which) {
  if (which === 'front') saveCanvas(canvasFront, 'portada', 'jpg');
  else if (which === 'back') saveCanvas(document.querySelector("#canvasBackWrapper canvas"), 'contraportada', 'jpg');
}
