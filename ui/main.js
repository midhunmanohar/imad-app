console.log('Loaded!');

// document.getElementById("main-text").innerHTML="Hello";

// var img=document.getElementById("madi");
// img.onclick=function(){
//     img.style.marginLeft='100px';
// }

var button=document.getElementById("counter");

button.onclick=function(){
    //Create a request
    var request= new XMLHttpRequest();
    // capture the response and store it in a variable
    request.onreadystatechange =function(){
        if(request.readystate===XMLHttpRequest.DONE){
            // Take some action
            if(request.status ===200){
                var counter=request.responseText;
                var span = document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
    };
    
    // make request
    
    request.open('GET','http://midhunmanohar.imad.hausra-app.io/counter',true);
    request.send(null);
}


// var counter=0;
// var span=document.getElementById("count");
// button.onclick=function(){
//     counter+=1;
//     span.innerHTML=counter.toString();
// }

