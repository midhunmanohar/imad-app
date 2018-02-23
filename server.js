var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne={
    ttile:'Article-one-imad',
    heading:'Article-one',
    date:'jan 01 2018',
    content:` <h3>Article-One</h3>
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>
            
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>
            
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, at ut fugiat fuga.
            Modi officiis harum, ipsa quod totam quas aliquam eaque reiciendis earum tempore optio
            placeat dolorem eos ullam.</p>`
};

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
                    ${date}
                    <h3>
                      ${heading}
                    
                    </h3>
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>`
  
  return htmlTemplate;  
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req,res){
   res.send(createTemplate(articleOne));
});

app.get('/article-two',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
