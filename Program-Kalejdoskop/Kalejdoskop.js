//her initielle variabler
let shapes = [] //skaber her et array til opbevaring af brugte figurer
let kaleidoscopeRadius = 300 //bestemmer her radius af kalejdoscop
let rotationAngle = 0 //rotationsvinkel til bestemmelse af hvor lang figurer skal drejes
let shapeType = "cirkel" //type af figur, her standard cirkel
let isAddingShape = false //bruges til at være igang med at danne figurer eller ej
let rotationspeed = 0 //hastighed for rotation
let isRotating = false //boolean for hvor vidt kalejdoskopet drejer.
let selectedShape,colorPicker,sizeSlider,reflectionSlider,speedSlider,sizeValueText,reflectionValueText,speedValueText //variabler for UI elementer
let shapeVisible = true //boolean for hvor vidt grundfigurer skal kunne ses.

function setup(){
	createCanvas(1400,800);
	//jeg sætter farvetypen til HueSaturationBrightness
	colorMode(HSB,360,100,100);
	//Jeg danner et kontrolpanel
	createDiv("Figur").position(20,10).style('font-size','16px');
	//Jeg danner knapper til valg af figur/shape
	createButton("Cirkel").position(20,40).mousePressed(() => shapeType = "cirkel");
	createButton("Kvadrat").position(80,40).mousePressed(() => shapeType = "kvadrat");
	createButton("Trekant").position(150,40).mousePressed(() => shapeType = "trekant");
	createButton("Stjerne").position(220,40).mousePressed(() => shapeType = "stjerne");
	createButton("Sekskant").position(20,70).mousePressed(() => shapeType = "sekskant");
	createButton("Ottekant").position(100,70).mousePressed(()=> shapeType = "ottekant");
	createButton("Rombe").position(175,70).mousePressed(() => shapeType = "rombe");
	createButton("Femkant").position(245,70).mousePressed(() => shapeType = "femkant");
	//Jeg danner en knap til at skabe den valgte figur
	createButton("Tlføj figur").position(20,270).mousePressed(()=> {isAddingShape = true});
	//Jeg danner en knap til at fjerne den markerede figur
	createButton("Fjern figur").position(100,270).mousePressed(deleteSelected);
	//Jeg danner paneler til at påvirke figurerne
	createP("Figur instillinger").position(20,80).style('font-size','16px');
	colorPicker = createColorPicker(color(0,100,100)).position(20,120);
	createDiv("Størrelse").position(20,160);
	sizeSlider = createSlider(10,100,40).position(20,180);
	sizeValueText = createDiv(sizeSlider.value()).position(160,180);
	createDiv("Antal refleksioner").position(20,210);
	reflectionSlider = createSlider(3,24,12).position(20,230);
	reflectionValueText = createDiv(reflectionSlider.value()).position(160,230);
	//Jeg danner nu paneler til at påvirke kalejdoskopets rotation
	createDiv("Rotations instillinger").position(20,310).style('font-size','16px');
	createButton("Start/stop drejning").position(20,340).mousePressed(toggleRotation);
	createDiv("Hastighed").position(20,380);
	speedSlider = createSlider(0,100,20).position(80,380);
	speedValueText = createDiv(speedSlider.value()).position(220,380);
 	//Tilføj start figur
 	addShape(150,130,40,color(0,100,100),"cirkel",8);
	//Jeg laver en boks som fortæller antal refleksioner:
	
}

function draw(){
    background(256);
	//opdaterer slidertext værdier
	sizeValueText.html(sizeSlider.value());
    reflectionValueText.html(reflectionSlider.value());
    speedValueText.html(speedSlider.value());
	//Rotation kontrol
	if(isRotating){
		rotationAngle += speedSlider.value()/500;
	}
	//Hvis "A" bliver trykket
	if(keyIsDown(65)){
		rotationAngle -= speedSlider.value()/500
	} 
	 //Hvis "D" bliver trykket
	if(keyIsDown(68)){
		rotationAngle += speedSlider.value()/500
	} 
	//Tegn radius af kalejdoskopet
	noFill();
	stroke(0);
	strokeWeight(2);
	circle(width/2,height/2,kaleidoscopeRadius*2);
    //jeg tegner her alle figurer man kan ændre på (både inden- og udenfor radius)
    for(let shape of shapes) {
        drawShape(shape);
    }
    //jeg tegner spejlede figurer (kun dem indenfor radius)
    for(let shape of shapes) {
        if(dist(shape.x,shape.y,width/2,height/2)<kaleidoscopeRadius) {
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
//Jeg gør her at man kan tilføje nye figurer.
function addShape(x,y,size,color,type,reflection){
    const newShape={
        x,y,size,color,type,reflection,isDragging: false
    }
    shapes.push(newShape);
    return newShape;
}
//jeg tegner her mine figurer, og fjerner dem hvis jeg manuelt drejer kalejdoskopet
function drawShape(shape){
	if(shapeVisible && !keyIsDown(65) && !keyIsDown(68)){
			fill(shape.color);
			noStroke();
			switch(shape.type){
				case "cirkel":
					circle(shape.x,shape.y,shape.size);
					break
				case "kvadrat":
					square(shape.x-shape.size/2,shape.y-shape.size/2,shape.size);
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
				case "ottekant":
					drawOctagon(shape.x,shape.y,shape.size/2);
					break
				case "rombe":
					push();
					translate(shape.x, shape.y);
					rotate(PI/4); // Drej 45 grader
					square(-shape.size/2,-shape.size/2,shape.size);
					pop();
					break
				case "femkant":
					drawPentagon(shape.x,shape.y,shape.size/2)
					break
		}
	}
}
//her er koden til at spejle figurerne.
function mirrorShape(shape){
	push();
	translate(width/2,height/2);
	for(let i=0; i<shape.reflection; i++){
		push();
		rotate(TWO_PI/shape.reflection*i+rotationAngle);
		let dx=shape.x-width/2
		let dy=shape.y-height/2
		let distance=dist(0,0,dx,dy)
		let angle = atan2(dy, dx);
		let mirroredX=cos(angle)*distance
		let mirroredY=sin(angle)*distance

		translate(mirroredX,mirroredY);
		rotate(angle);
		fill(shape.color);
		noStroke();
		drawMirroredShape(shape);

		pop();
	}
	pop();
}
//Jeg tegner her de spejlede figurer.
function drawMirroredShape(shape){
	switch(shape.type){
		case "cirkel":
			circle(0,0,shape.size);
			break
		case "kvadrat":
			square(-shape.size/2,-shape.size/2,shape.size);
			break
		case "trekant":
			triangle(0,-shape.size/2,-shape.size/2,shape.size/2,shape.size/2,shape.size/2);
			break
		case "stjerne":
			drawStar(0,0,shape.size/2,shape.size/4,5);
			break
		case "sekskant":
			drawHexagon(0,0,shape.size/2);
			break
		case "ottekant":
			drawOctagon(0,0,shape.size/2);
			break
		case "rombe":
			push();
			rotate(PI/4);
			square(-shape.size/2, -shape.size/2, shape.size);
			pop();
			break
		case "femkant":
			drawPentagon(0,0,shape.size/2)
			break
		}
}
//Her er instrukserne til at tegne en stjerne.
function drawStar(x,y,radius1,radius2,npoints){
	let angle = TWO_PI/npoints
	let halfAngle = angle/2
	beginShape();
	for(let i=0;i<TWO_PI;i+=angle){
		let sx = x+cos(i)*radius2
		let sy = y+sin(i)*radius2
		vertex(sx,sy);
		sx = x+cos(i+halfAngle)*radius1;
		sy = y+sin(i+halfAngle)*radius1;
		vertex(sx,sy);
	}
	endShape(CLOSE);
}
//Her instrukser til sekskant.
function drawHexagon(x,y,radius){
	beginShape();
	for(let i=0;i<TWO_PI;i+=TWO_PI/6){
		let sx=x+cos(i)*radius
		let sy=y+sin(i)*radius
		vertex(sx,sy);
	}
	endShape(CLOSE);
}
//Her instruker til en ottekant:
function drawOctagon(x,y,radius){
	beginShape();
	for(let i=0;i<TWO_PI;i+=TWO_PI/8){
		let sx=x+cos(i)*radius
		let sy=y+sin(i)*radius
		vertex(sx,sy);
	}
	endShape(CLOSE);
}
//her instrukser til en femkant:
function drawPentagon(x,y,radius){
	beginShape();
	for(let i=0;i<TWO_PI;i+=TWO_PI/5){
		let sx=x+cos(i)*radius
		let sy=y+sin(i)*radius
		vertex(sx,sy);
	}
	endShape(CLOSE);
}
//Her tjekker jeg om musen bliver trykket ned og hvad konstekvensen skal være
function mousePressed(){
	if(isAddingShape){
		let newShape = addShape(150,130,sizeSlider.value(),colorPicker.color(),shapeType,reflectionSlider.value())
		selectedShape = newShape
		isAddingShape = false
		return
	}
	//tjek valgt shape
	for(let i=shapes.length-1;i>=0;i--){
		let shape=shapes[i]
		if(isMouseOverShape(shape)){
			selectedShape = shape
			shape.isDragging = true
			//opdater påvirkning af figur (farve,størrelse & refleksioner)
			colorPicker.color(shape.color);
			sizeSlider.value(shape.size);
			reflectionSlider.value(shape.reflection);
			return
		}
	}
	//Hvis man trykker udenfor en figur:
	selectedShape=null
}
//her gøres så man kan bevæge den valgte figur
function mouseDragged(){
	if(selectedShape&&selectedShape.isDragging){
		selectedShape.x=mouseX
		selectedShape.y=mouseY
	}
}
//stop bevægelse af valgt figur
function mouseReleased(){
	if(selectedShape){
		selectedShape.isDragging=false
	}
}
//function til at slette valgte figur
function deleteSelected(){
	if(selectedShape){
		shapes=shapes.filter(s=>s !== selectedShape);
		selectedShape=null
	}
}
//function til at rotere kalejdoskopet
function toggleRotation(){
	isRotating= !isRotating
	//koden herunder tjekker med "?" om isRotating er sand, skulle den være det så roterer kalejdoskopet med speedSlider.value()/500 hvis ikke så hastigheden 0.
	rotationspeed=isRotating ? speedSlider.value()/500 : 0
	//jeg gør herunder de figurer man kan manipulere usynlige.
	shapeVisible = !isRotating
}
// function til at tjekke om musen er over en figur for at vælge den
function isMouseOverShape(shape){
	if(shape.type==="cirkel"){
		return dist(mouseX,mouseY,shape.x,shape.y)<shape.size/2;
	}else if(shape.type==="kvadrat"){
		return abs(mouseX-shape.x)<shape.size/2 && abs(mouseY-shape.y)<shape.size/2;
	}else if(shape.type==="trekant"){
		return pointInTriangle(mouseX,mouseY,shape);
	}else{
		//for andre mere komplekse figurer (stjerne, sexkant etc.), bruger jeg cirklen omkring figuren som "hitboks".
		return dist(mouseX,mouseY,shape.x,shape.y)<shape.size/2;
	}
}
//jeg tjekker her om arealet/området indenfor en trekant
function pointInTriangle(px,py,shape){
	let x1=shape.x
	let y1=shape.y-shape.size/2
	let x2=shape.x-shape.size/2
	let y2=shape.y+shape.size/2
	let x3=shape.x+shape.size/2
	let y3=y2
	let A=0.5*(-y2*x3+y1*(-x2+x3)+x1*(y2-y3)+x2*y3)
	let sign=A<0 ? -1:1
	let s=(y1*x3-x1*y3+(y3-y1)*px+(x1-x3)*py)*sign
	let t=(x1*y2-y1*x2+(y1-y2)*px+(x2-x1)*py)*sign
	return s>0 && t>0 && (s+t)<2*A*sign;
}
//jeg tegner her omridset af den valgte figur:
function drawShapeOutline(shape){
	if(shape.type==="cirkel"){
		circle(shape.x,shape.y,shape.size+10);
	}else if(shape.type==="kvadrat"){
		square(shape.x-shape.size/2-5,shape.y-shape.size/2-5,shape.size+10);
	}else if(shape.type==="trekant"){
		triangle(shape.x,shape.y-shape.size/2-5,shape.x-shape.size/2-5, shape.y+shape.size/2+5,shape.x+shape.size/2+5, shape.y+shape.size/2+5);
	}else{
		//for de mere komplekse figurer nøjes jeg med at tegne en cirkel omkring dem.
		circle(shape.x,shape.y,shape.size+10);
	}
}