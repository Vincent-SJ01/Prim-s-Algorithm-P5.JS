let titik = [];                             //jadikan node sebagai variabel global agar bisa dipakai di mana pun
let gabung = [];                      
let sendiri = [];

let hubung = []; 
let jarak = []; 


function setup(){
    createCanvas(1080,720);
    let b = createButton("Reset Button");
    b.mousePressed(hapus);
    b.style("font-size","30px");
}


function draw(){

    background(10);
    resetArray();  


    for(let i=0 ; i<titik.length ; i++){

        let v = titik[i];
        fill(255);
        ellipse(v.x,v.y,15,15);

        sendiri.push(titik[i]);              //anggap semua node belum dikunjungi
        hubung.push(null);
        jarak.push(width*height);            //inisial jarak awal dengan nilai paling maksimal
        
    }

    pilihNode(0);
    let index=0; 

    while(sendiri.length >0){

        checkNode(index);
        
        let temp = width*height; 
        let value; 
        for(let i=0 ; i<sendiri.length ; i++){      //cari node dengan jarak terpendek, simpan index pada value
            if(jarak[i] < temp){
                value = i;                          
                temp = jarak[i]; 
            }
        }
    
        pilihNode(value);                           //pilih node dengan jarak terpendek
        index++;                                    //upadate jarak tiap note dengan node yang baru dipilih

    }
    
}

//dibawah ini adalah daftar function

//memilih node dengan index = value untuk dihilangkan dari array "sendiri"
//jangan lupa gambar garisnya juga... :v 
//hapus jarak dan hubung, sudah ga dipakai soalnya
function pilihNode(index){                  

    if(hubung[index] != null){
        let temp = map(jarak[index],0,300,0,255);
        let v1 = sendiri[index];
        let v2 = hubung[index];

        stroke(temp,255-temp,0);
        strokeWeight(2);
        line(v1.x,v1.y,v2.x,v2.y);
        stroke(255);
    }
    
    gabung.push(sendiri[index]);
    sendiri.splice(index,1);
    hubung.splice(index,1);
    jarak.splice(index,1);
    
}


function checkNode(index){

    let temp = gabung[index];

    for(let i=0 ; i<sendiri.length ; i++){

        let d = dist(sendiri[i].x,sendiri[i].y,temp.x,temp.y);
        if(d < jarak[i]){
            jarak[i] = d; 
            hubung[i] = temp; 
        }    

    }
    
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


function resetArray(){
    sendiri.splice(0,sendiri.length);
    gabung.splice(0,gabung.length);
    hubung.splice(0,hubung.length);
    jarak.splice(0,jarak.length);
}


function hapus(){
    titik.splice(0,titik.length);
}


