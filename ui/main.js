console.log('Loaded!');

// document.getElementById("main-text").innerHTML="Hello";

// var img=document.getElementById("madi");
// img.onclick=function(){
//     img.style.marginLeft='100px';
// }

var button = document.getElementById('counter');

button.onclick = function (){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200){
                
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
         }
      
  };
  
request.open("GET", "http://midhmanohar.imad.hasura-app.io/counter", true);
request.send();
    
};

// var counter=0;
// var span=document.getElementById("count");
// button.onclick=function(){
//     counter+=1;
//     span.innerHTML=counter.toString();
// }

