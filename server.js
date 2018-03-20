var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
const crypto = require('crypto');

var config = {
    
    user:'midhmanohar',
    database:'midhmanohar',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};



var app = express();
app.use(morgan('combined'));

/*

var articles ={
    'article-one':{
    title:'Article-One-Imad',
    heading:'Article-one',
    date:'jan 01 2018',
    content:`
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>
            
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>
            
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>`
    },
    'article-two':{
    title:'Article-Two',
    heading:'Article-Two',
    date:'jan 23 2018',
    content:` <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>
            
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>
            
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>`
    },
    'article-three':{
    title:'Article-Three',
    heading:'Article-Three',
    date:'feb 05 2018',
    content:` <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>
            
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>
            
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>`
    }
    
}; 

*/


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
                <textarea rows="6" cols="100" placeholder="Add comments here..."></textarea>
            </div>
        </body>
    </html>`
  
  return htmlTemplate;  
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    var hashed=crypto.pbkdf25Sync(input,salt,10000,512,'sha512');
    return hashed;
}
app.get('/hash/:input',function(req,res){
    
    var hashedString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
    
});


var pool=new Pool(config);

/*

app.get('/test-db',function(req,res){
   pool.query('SELECT * FROM test',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          res.send(JSON.stringify(result.rows[1]));
      } 
   });     
});

*/

var counter=0;
app.get('/counter',function(req,res){
    counter+=1;
    res.send(counter.toString());
});


var comment1="";
app.get('/submit-comment',function(req,res) {
    
    
        var cmt1 = req.query.cmt1;
        comment1=cmt1;
        res.send(JSON.stringify(comment1));
});



app.get('/:articleName',function(req,res){
    
   var articleName=req.params.articleName;
   
//   pool.query(`SELECT * FROM article WHERE title = '${req.params.articleName}'`,function(err,result)
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


/*

var names=[];
app.get('/submit-name',function(req,res){
   var name = req.query.name;
   
   names.push(name);
   
   res.send(JSON.stringify(names));
});

*/



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
