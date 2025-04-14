let shapes = []
let kaleidoscopeRadius = 300
let rotationAngle = 0
let shapeType = "circle"
let isAddingShape = false
let rotationspeed = 0
let isRotating = false
let selectedShape, colorPicker, sizeSlider, reflectionSlider, speedSlider
let shapevisible = true

function setup(){
	createCanvas(window);
	//jeg sætter farvetypen til HueSaturationBrightness
	colorMode(HSB,360,100,100);
	//Jeg danner et kontrolpanel
	createDiv("Figur").position(20,10).style('font-size','16px');
	//Jeg danner knapper til valg af figur/shape
	createButton("Cirkel").position(20,40).mousePressed(() => shapeType = "cirkel");
	createButton("Kvadrat").position(80,40).mousePressed(() => shapeType = "kvadrat");
	createButton("Trekant").position(150,40).mousePressed(() => shapeType = "trekant");
	createButton("Stjerne").position(220,40).mousePressed(() => shapeType = "stjerne");
	createButton("Sekskant").position(285,40).mousePressed(() => shapeType = "sekskant");
	//Jeg danner en knap til at skabe den valgte figur
	createButton("Tlføj figur").position(20,270).mousePressed(()=> {isAddingShape = true});
	//Jeg danner paneler til at påvirke figurerne
	createDiv("Figur instillinger").position(20,80).style('font-size','16px');
	colorpicker = createColorPicker(color(0,100,100)).position(20,120);
	createSpan("Størrelse").position(20,160);
	sizeSlider = createSlider(10,100,40).position(20,180);
	createSpan("Antal refleksioner").position(20,210);
	reflectionSlider = createSlider(3,24,12).position(20,230);
	//Jeg danner nu paneler til at påvirke kalejdoskopets rotation
	createDiv("Rotations instillinger").position(20,310).style('font-size','16px');
	createButton("Start/stop drejning").position(20,340).mousePressed(toggleRotation);
	createSpan("Hastighed").position(20,380);
	speedSlider = createSlider(0,100,20).position(120,380);
}