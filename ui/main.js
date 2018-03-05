console.log('Loaded!'); 

// document.getElementById("main-text").innerHTML="Hello";

// var img=document.getElementById("madi");
// img.onclick=function(){
//     img.style.marginLeft='100px';
// } 

var button = document.getElementById('counter'); 

button.onclick = function (){ 
     // create the request
    var request = new XMLHttpRequest();  
    
    request.onreadystatechange = function () { 
            if (this.readyState == 4 && this.status == 200){
                
                var counter = request.responseText; 
                var span = document.getElementById('count'); 
                span.innerHTML = counter.toString(); 
         }  
       
  }; 
  //make the request
request.open("GET", "http://midhmanohar.imad.hasura-app.io/counter", true);
request.send(null);
    
};

// var counter=0;
// var span=document.getElementById("count");
// button.onclick=function(){
//     counter+=1;
//     span.innerHTML=counter.toString();
// }

var submit=document.getElementById("submit");
        
submit.onclick=function(){
    
   // create the request
   var request = new XMLHttpRequest();  
    
   request.onreadystatechange = function () { 
            if (this.readyState == 4 && this.status == 200){
              
            var names=request.responseText;
            names=JSON.parse(names);
            var list='';
            for(var i=0;i<names.length;i++){
                list+='<li>'+names[i]+'</li>';
            }
            var ul=document.getElementById('namelist');
            ul.innerHTML=list;  
                      
         }  
       
  }; 
        var nameInput=document.getElementById("name").value;
        //make the request 
        request.open("GET", "http://midhmanohar.imad.hasura-app.io/submit-name?name="+nameInput, true);
        request.send(null);
};

var commentSubmit=document.getElementById("commentSubmit");

commentSubmit.onclick=function(){
    
    // create the request
   var request = new XMLHttpRequest();  
    
   request.onload = function () { 
            console.log('Readystate :',request.readyState);
            if (this.status == 200){
            var commentInput =this.responseText;
            console.log(commentInput);
            commentInput=JSON.parse(commentInput);
            
            var commentArea=document.getElementById("commentArea");
            commentArea.innerHTMl=commentInput;
            
            
                      
         }
         
        
         
       
  }; 
        var comment=document.getElementById("comment").value;
       
        // console.log(comment);
       
        //make the request 
        request.open("GET", "http://midhmanohar.imad.hasura-app.io/submit-comment?cmt1="+comment, true);
        request.send(null);
};
 



































