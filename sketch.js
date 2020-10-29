let titik = []; 

function mousePressed(){

    let clicked = false; 
    let index; 

    for(let i=0 ; i<titik.length ; i++){
        
        let v = titik[i];
        let d = dist(v.x,v.y,mouseX,mouseY);

        if(d < 15){
            index = i;
            clicked = true;
            break;  
        }
    }

    if(clicked){

        titik.splice(index,1);

    }else{

        if(mouseX < width && mouseY < height){            //jangan print di luar 

            let v = createVector(mouseX,mouseY);            
            titik.push(v);
        }


    }
}


function setup(){
    createCanvas(1080,720);
    let b = createButton("Reset Button");
    b.mousePressed(hapus);
    b.style("font-size","30px");
}

function draw(){

    background(10);


    let gabung = []; 
    let sendiri = []; 


    for(let i=0 ; i<titik.length ; i++){

        let v = titik[i];
        fill(255);
        ellipse(v.x,v.y,15,15);

        sendiri[i] = titik[i];              //anggap semua blm dikunjungi
    }


    gabung[0] = sendiri[0]
    sendiri.splice(0,1);


    while(sendiri.length > 0){

        let temp = 10000000;
        let indexA; 
        let indexB; 


        for(let i=0 ; i<gabung.length ; i++){

            for(let j=0 ; j<sendiri.length ; j++){

                let v1 = gabung[i];
                let v2 = sendiri[j];
                let d = dist(v1.x,v1.y,v2.x,v2.y)       //cari jarak antar mereka

                if(d < temp){
                    indexA = i; 
                    indexB = j; 
                    temp = d; 
                }
            }
        }


        temp = map(temp,0,300,0,255);

        let v1 = gabung[indexA];
        let v2 = sendiri[indexB];

        stroke(temp,255-temp,0);
        strokeWeight(2);
        line(v1.x,v1.y,v2.x,v2.y);

        gabung.push(sendiri[indexB]);
        sendiri.splice(indexB,1);

    }
    
}

function hapus(){
    titik.splice(0,titik.length);
}
