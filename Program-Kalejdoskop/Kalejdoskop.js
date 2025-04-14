let shapes = []
let kaleidoscopeRadius = 300
let rotationAngle = 0
let shapeType = "cirkel"
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
	//Jeg danner en knap til at fjerne den markerede figur
	createButton("Fjern figur").position(100,270).mousePressed(deleteSelected);
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
 	//Tilføj start figur
 	isAddingShape(150,150,40,color(0,100,100),"cirkel",8);
}
 
 
function draw(){
    background(256);
	//Rotation kontrol
	if(isRotating){
		rotationAngle += speedSlider.value()/500;
	}
	if(keyIsDown(65)) rotationAngle -= speedSlider.value()/500; //Hvis "A" bliver trykket
	if(keyIsDown(68)) rotationAngle += speedSlider.value()/500; //Hvis "D" bliver trykket
	//Tegn radius af kalejdoskopet
	noFill();
	stroke(0);
	strokeWeight(2);
	circle(width/2,height/2,kaleidoscopeRadius*2);
	//Tegn figurer
	for(let shape of shapes){
		drawShape(shape);
		if(dist(shape.x,shape.y,width/2,height/2)<kaleidoscopeRadius){
			mirrorShape(shape);
		}
	}
	//Markér den valgte figur
	if(selectedShape){
		stroke(0);
		strokeWeight(2);
		noFill();
		drawShapeOutline(selectedShape);
		//Opdater valgte figurs properties
		selectedShape.color = colorPicker.color();
		selectedShape.size = sizeSlider.value();
		selectedShape.reflection = reflectionSlider.value();
	}
}

function addShape(x,y,size,color,type,reflection){
	const newShape={
		x,y,size,color,type,reflection,isDragging: false
	}
	shapes.push(newShape);
	return newShape
}

function drawShape(shape){
	//Jeg tjekker her om figuren er inden for radius
	if(shapeVisible){
		if(dist(shape.x,shape.y,width/2,height/2)<kaleidoscopeRadius){
			fill(shape.color);
			noStroke();
			switch(shape.type){
				case "cirkel":
					circle(shape.x,shape.y,shape.size);
					break
				case "kvadrat":
					square(shape.x-shape.size/2,shape.y-shapesize/2,shape.size);
					break
				case "trekant":
					triangle(shape.x,shape.y-shape.size/2,shape.x-shape.size/2,shape.y+shape.size/2,shape.x+shape.size/2,shape.y+shape.size/2);
					break
				case "stjerne":
					drawStar(shape.x,shape.y,shape.size/2,shape.size/4,5);
					break
				case "sekskant":
					drawHexagon(shape.x,shape.y,shape.size/2);
					break
			}
		}
	}
}

function mirrorShape(shape){
	
}