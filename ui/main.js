console.log('Loaded!');

// document.getElementById("main-text").innerHTML="Hello";

// var img=document.getElementById("madi");
// img.onclick=function(){
//     img.style.marginLeft='100px';
// }

var button=document.getElementById("counter");
var counter=0;
var span=document.getElementById("count");
button.onclick=function(){
    counter+=1;
    
}
span.innerHTML=counter.toString();
