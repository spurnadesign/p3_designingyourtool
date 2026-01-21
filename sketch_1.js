var slider = document.getElementById("slider");
let myfont;

/*Imagenes*/
let ojos = [];
let mouth = [];
let mouthIndex = 0;
let ojosIndex = 0;

/*Frases*/
let frases = [];

/*Color*/
let color = [c];

function preload (){
  ojos[0] = loadImage("IMG/ojos_1.png");
  ojos[1] = loadImage("IMG/ojos_2.png");
  ojos[2] = loadImage("IMG/ojos_3.png");
  ojos[3] = loadImage("IMG/ojos_4.png");
  ojos[4] = loadImage("IMG/ojos_5.png");

  mouth[0] = loadImage("IMG/boca_1.png");
  mouth[1] = loadImage("IMG/boca_2.png");
  mouth[2] = loadImage("IMG/boca_3.png");
  mouth[3] = loadImage("IMG/boca_4.png");
  mouth[4] = loadImage("IMG/boca_5.png");
}

function setup() {
  var c = createCanvas(500, 600);
  c.parent("canvasWrapper");

  imageMode(CENTER); // clave para no deformar
}

function draw() {
  background(220);

  /* ---------- TERCIO SUPERIOR (OJOS) ---------- */
  let ojosImg = ojos[ojosIndex];
  if (ojosImg) {
    let targetH = height / 3;
    let scaleFactor = targetH / ojosImg.height;

    let imgW = ojosImg.width * scaleFactor;
    let imgH = ojosImg.height * scaleFactor;

    image(
      ojosImg,
      width / 2,
      targetH / 2,
      imgW,
      imgH
    );
  }

  /* ---------- TERCIO INFERIOR (BOCA) ---------- */
  let mouthImg = mouth[mouthIndex];
  if (mouthImg) {
    let targetH = height / 3;
    let scaleFactor = targetH / mouthImg.height;

    let imgW = mouthImg.width * scaleFactor;
    let imgH = mouthImg.height * scaleFactor;

    image(
      mouthImg,
      width / 2,
      height - targetH / 2,
      imgW,
      imgH
    );
  }
}

function nextMouth(){
  mouthIndex = (mouthIndex + 1) % mouth.length;
}

function nextOjos(){
  ojosIndex = (ojosIndex + 1) % ojos.length;
}
