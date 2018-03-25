var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
const crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    
    user:'midhmanohar',
    database:'midhmanohar',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};



var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json()); 

app.use(session({
    secret:"someRandomSecretValue",
    cookie:{maxAge:1000*60*60*24*30}
}));

function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    
    var htmlTemplate=`<html>
        <head>
            <title>${title}</title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                <a href="/">Home</a>
                <hr/>
                </div>
                <div>
                    ${date.toDateString()}
                    <h3>
                      ${heading}
                    
                    </h3>
                </div>
                <div>
                    ${content}
                </div>
                <br/>
                <input type="text" id="comment" placeholder="add comments here"></input>
                <br/>
                <button id="submit_btn">submit</button>
                
                <div id="comment_area">
                
                </div>
            </div>
        </body>
    </html>`;
  
  return htmlTemplate;  
}

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
   
    // var salt = crypto.randomBytes(128).toString('hex');
    // var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,password],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } else{
           res.send("User successfully created :"+username);
       }
    }); 
    
});

app.post('/comment',function(req,res){
   var comment=req.body.comment;
   var id=req.session.auth.userId;
   pool.query('INSERT INTO "comment" (id,comments) VALUES ($1,$2)',[id,comment],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send("comment submited");
       }
   });
});

app.post('/login',function(req,res){
    
    var username=req.body.username;
    var password=req.body.password;
    
    
    pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err,result){
        
      if(err){
          
          res.status(500).send(err.toString());
      } else{
    
          var dbString = result.rows[0].password;
          
          if(dbString===password){
              
              req.session.auth={userId:result.rows[0].id};
              
              res.send('Login successfully');
          }else{
              res.status(403).send("Invalid username/password");
          }
      }
      });
           
});

app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('You are logged in : '+req.session.auth.userId.toString());
   } else{
       res.send("you are not logged in");
   }
});

app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send("Logged Out");
});

var names=[];
app.get('/submit-name',function(req,res){
   
   var name=req.query.name;
   
   names.push(name);
   
   res.send(JSON.stringify(names));
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/get-articles',function(req,res){
    
     pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
    
});

var pool=new Pool(config);

var counter=0;
app.get('/counter',function(req,res){
    counter+=1;
    res.send(counter.toString());
});

app.get('/articles/:articleName',function(req,res){
    
   var articleName=req.params.articleName;

     pool.query('SELECT * FROM article WHERE title = $1 ',[req.params.articleName],function(err,result){
      if(err){
          res.status(500).send(err.toString());
      } else{
          if(result.rows.length===0){
              res.status(404).send("article not found");
          }else{
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
          }
      }
   });
   
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
