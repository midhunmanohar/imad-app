
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

/*  Submit comment 
  
var commentSubmit=document.getElementById("commentSubmit");

commentSubmit.onclick=function(){
    
    // create the request
   var request = new XMLHttpRequest();  
    
   request.onload = function () { 
            console.log('Readystate :',request.readyState);
            if (this.status == 200){
            var commentInput =this.responseText;
            commentInput=JSON.parse(commentInput);
            alert(commentInput);
            // console.log(commentInput);
            
            document.getElementById("main-text").innerHTML=commentInput;
            
        }
         
        
         
       
  }; 
        var comment=document.getElementById("comment").value;
       
        // console.log(comment);
       
        //make the request 
        request.open("GET", "http://midhmanohar.imad.hasura-app.io/submit-comment?cmt1="+comment, true);
        request.send(null);
};


*/


 
//submit username/password 
 
var login=document.getElementById("login");

login.onclick=function(){
   
   var request = new XMLHttpRequest();  
    
   request.onreadystatechange = function () { 
            if (this.readyState == 4 && this.status == 200){
              
             alert("User Logged In Successfully");
            }  else if(this.status==403){
                alert("Username/Password is incorrect");
            }else if(this.status==500){
                alert("something went wrong on the server");
            }
       
  }; 
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;
        console.log(username);
        console.log(password);
        
        //make the request 
        
        request.open("POST", "http://midhmanohar.imad.hasura-app.io/login", true);
        request.setRequestHeader("Content-Type","application/json");
        request.send(JSON.stringify({username:username,password:password}));
};


































