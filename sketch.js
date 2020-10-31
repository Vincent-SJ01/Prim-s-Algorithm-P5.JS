let titik = [];                         //jadikan node sebagai variabel global agar bisa dipakai di mana pun

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

        sendiri[i] = titik[i];              //anggap semua node belum dikunjungi
    }

    changeArray(gabung,sendiri,0);          //jadikan node awal sebagai node utama

    while(sendiri.length > 0){

        let temp = 10000000;
        let indexA; 
        let indexB; 


        for(let i=0 ; i<gabung.length ; i++){

            for(let j=0 ; j<sendiri.length ; j++){

                let v1 = gabung[i];
                let v2 = sendiri[j];
                let d = dist(v1.x,v1.y,v2.x,v2.y)       //cari jarak antar node

                if(d < temp){                           //temukan jarak terpendek
                    indexA = i; 
                    indexB = j; 
                    temp = d; 
                }
            }
        }


        temp = map(temp,0,300,0,255);               //mengatur rentang warna garis

        let v1 = gabung[indexA];
        let v2 = sendiri[indexB];

        stroke(temp,255-temp,0);
        strokeWeight(2);
        line(v1.x,v1.y,v2.x,v2.y);
        stroke(255);

        changeArray(gabung,sendiri,indexB);         //tandai node[indexB] telah dikunjungi

    }
    
}

//dibawah ini adalah daftar function

function hapus(){
    titik.splice(0,titik.length);
}


function changeArray(arr1, arr2, index){
    arr1.push(arr2[index]);
    arr2.splice(index,1);
}


function mousePressed(){

    let clicked = false; 
    let index; 

    for(let i=0 ; i<titik.length ; i++){
        
        let v = titik[i];
        let d = dist(v.x,v.y,mouseX,mouseY);

        if(d < 15){                                 //check apakah click di suatu node
            index = i;
            clicked = true;
            break;  
        }
    }

    if(clicked){

        titik.splice(index,1);

    }else{

        if(mouseX < width && mouseY < height){            //jangan buat node di luar canvas

            let v = createVector(mouseX,mouseY);            
            titik.push(v);
        }


    }
}