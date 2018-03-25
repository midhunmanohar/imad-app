 
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
        request.open("GET","http://midhmanohar.imad.hasura-app.io/submit-name?name="+nameInput, true);
        request.send(null);
};

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
};
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}


function loadLogoutForm(username){
    var logoutHtml=`
    <h3>Hi ${username} </h3>
   <button><a style="text-decoration:none;color:#000;" href="/logout">Logout</a></button>`;
    
    return logoutHtml;
     
}

 
//submit username/password 

//Login
 
var login=document.getElementById("login");

login.onclick=function(){
   
   var request = new XMLHttpRequest();  
    
   request.onreadystatechange = function () { 
            if (this.readyState == 4 && this.status == 200){
              
             alert("User Logged In Successfully");
             
             document.getElementById("login_area").innerHTML=loadLogoutForm(username);
             
             loadArticles ();
             
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




//Register new user

var register=document.getElementById("register");

register.onclick=function(){
   
   var request = new XMLHttpRequest();  
    
   request.onreadystatechange = function () { 
            if (this.readyState == 4 && this.status == 200){
              
             alert("Registered Successfully");
            }  else if(this.status==403){
                alert("Username/Password is invalid");
            }else if(this.status==500){
                alert("something went wrong on the server");
            }
       
  }; 
        var username=document.getElementById("username").value;
        var password=document.getElementById("password").value;
        console.log(username);
        console.log(password);
        
        //make the request 
        
        request.open("POST", "http://midhmanohar.imad.hasura-app.io/create-user", true);
        request.setRequestHeader("Content-Type","application/json");
        request.send(JSON.stringify({username:username,password:password}));

    
};


































