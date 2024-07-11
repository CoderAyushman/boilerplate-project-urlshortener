require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
const validator = require('validator');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
// app.get('/api/hello', function(req, res) {
//   res.json({ greeting: 'hello API' });
// });
let number;
let original_url;

app.post('/api/shorturl',(req,res)=>{
const urls=req.body.url;
const parsedUrl=new URL(urls);
let hostname = parsedUrl.hostname;
const num= Math.floor(Math.random() * 1001);
number=num;

console.log(req.body.url)
dns.lookup(hostname, (err, address) => {
  
  if(err){
    res.json({ error: 'invalid url' });
  }
  else{
    original_url=urls;
    res.json({ original_url : urls, short_url : num});
  }
});

});
app.get('/api/shorturl/:numb',(req,res)=>{
  if(req.params.numb==number){
    res.redirect(original_url);
  }
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
