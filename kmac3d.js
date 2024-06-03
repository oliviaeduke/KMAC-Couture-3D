let dress1, dress2, dress3;
let currentModel;
let logo;
let button = false;
let button2 = false;
let button3 = false;
let buttonText;
let rotationY = 0;
let zoom = 1;
let translationY = 0;
let prevDist = -1;
let prevTouchY = 0;
let prevTouchX = 0;

function preload() {
  dress1 = loadModel('dress1.obj', true);
  textureImage = loadImage('dress1.jpg');
  logo = loadImage('kmaclogo.png');
  dress2 = loadModel('dress2.obj', true);
  textureImage2 = loadImage('dress2.jpg');
  dress3 = loadModel('dress3.obj', true);
  textureImage3 = loadImage('dress3.jpg');
}

function setup() {
  let fs = fullscreen();
  fullscreen(!fs);

  var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.style('display', 'block');
  currentModel = dress1;
  texture(textureImage);

  let div = createDiv();
  div.position(10, 20);
  div.size(330, 390);
  div.style('background-color', 'clear');
  div.style('text-align', 'justified');
  div.style('font-size', '15px');
  div.style('font-family', 'Avenir Regular');
  div.style('background-color', 'white');
  div.style('padding', '10px');
  div.style('stroke', '2px');
  div.style('border-radius', '10px');
  div.style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.2)');
  let logo = createImg('kmaclogo.png');
  logo.position(10, 10);
  logo.size(290, 140);
  let p = createP('Since 2012, KMAC Couture has been a keystone in Louisville’s art scene. Submitting designs for the wearable live art and runway show is open to all levels, and has brought national attention to both the event and designers.');
  let p2 = createP('The annual event happens each spring. Selected dresses from past years are on display on the Frazier’s mezzanine level. Use this touch screen to explore, rotate, and get a closer look at the three original dresses.');
  p.position(10, 100);
  p2.position(10, 250);
  p.parent(div.elt);
  p2.parent(div.elt);

  let bcol = color('#FBAA19');
  let pcol = color('#c27e03');

  let button = createButton('#unfollow by Bri Bowers');
  button.style("font-family", "Avenir Regular");
  button.style("font-size", "20px");
  button.style('background-color', bcol);
  button.style('border-radius', '10px');
  button.style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.2)');
  button.style('border', '0px solid black');
  button.position(20, 500);
  button.touchStarted(() => {
    button.style('background-color', pcol);
    currentModel = dress1;
    texture(textureImage);
    showText('<b>#unfollow, 2018</b><br>Bri Bowers<br>yarn, plastic, canvas<br>on loan from Bri Bowers');
  });
  button.touchEnded(() => {
    button.style('background-color', bcol);
  });

  let button2 = createButton('Home by Fiyin Lasisi');
  button2.style("font-family", 'Avenir Regular');
  button2.style("font-size", "20px");
  button2.style('background-color', bcol);
  button2.style('border-radius', '10px');
  button2.style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.2)');
  button2.style('border', '0px solid black');
  button2.position(20, 550);
  button2.touchStarted(() => {
    button2.style('background-color', pcol);
    currentModel = dress2;
    texture(textureImage2);
    showText('<b>Home, 2019</b><br>Fiyin Lasisi<br>sheer fabric, ankara fabric, beads<br> on loan from Fiyin Lasisi');
  });
  button2.touchEnded(() => {
    button2.style('background-color', bcol);
  });

  let button3 = createButton('Quilted Together Forever by Wende Cudmore');
  button3.style("font-family", 'Avenir Regular');
  button3.style("font-size", "20px");
  button3.style('background-color', bcol);
  button3.style('border-radius', '10px');
  button3.style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.2)');
  button3.style('border', '0px solid black');
  button3.position(20, 600);
  button3.touchStarted(() => {
    button3.style('background-color', pcol);
    currentModel = dress3;
    texture(textureImage3);
    showText('<b>Quilted Together Forever, 2019</b><br>Wende Cudmore<br>pressed fruits and vegetables<br>on loan from Wende Cudmore');
  });
  button3.touchEnded(() => {
    button3.style('background-color', bcol);
  });

  buttonText = createDiv('');
  buttonText.position(1480, 800);
  buttonText.style('color', '#000000');
  buttonText.style('font-size', '16px');
  buttonText.style('font-family', 'Avenir Regular');
  buttonText.style('background-color', 'white');
  buttonText.style('padding', '10px');
  buttonText.style('stroke', '2px');
  buttonText.style('border-radius', '10px');
  buttonText.style('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.2)');
}

function draw() {
  background(260); 

  // Default camera position
  camera(0, -300, 500);
  rotateY(rotationY);

  // Apply vertical translation to the model
  translate(0, translationY, 0);
  noStroke();
  scale(-2.5, 2.5, 2.5);
  scale(zoom);
  rotateX(radians(-180));
  model(currentModel);
  rotationY += 0.003;
}

function showText(text) {
  buttonText.html(text);
}

function touchMoved() {
  if (touches.length === 1) {
    // Vertical movement
    translationY += (touches[0].y - prevTouchY) * 0.5;
    prevTouchY = touches[0].y;
    // Horizontal rotation
    rotationY += (touches[0].x - prevTouchX) * 0.01;
    prevTouchX = touches[0].x;
  } else if (touches.length === 2) {
    let currentDist = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y);
    if (prevDist > 0) {
      let zoomChange = (currentDist - prevDist) * 0.005;
      zoom += zoomChange;
      zoom = constrain(zoom, 1, 3);
    }
    prevDist = currentDist;
  }
  return false;
}

function touchStarted() {
  if (!fullscreen()) {
    fullscreen(true);
  }
  prevDist = -1;
  if (touches.length === 1) {
    prevTouchY = touches[0].y;
    prevTouchX = touches[0].x;
  }
  return false;
}

function touchEnded() {
  if (touches.length < 2) {
    prevDist = -1;
  }
  return false;
}

function mouseWheel(event) {
  let zoomChange = event.delta * 0.001;
  zoom += zoomChange;
  zoom = constrain(zoom, 1, 3);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

document.ontouchmove = function(event) {
  event.preventDefault();
};
