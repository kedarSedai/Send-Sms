const express = require('express');
const Nexmo = require('nexmo');
const keys = require('./config/key')
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

const port = process.env.PORT || 3000;

 const nexmo = new Nexmo({
    apiKey: keys.apiKey,
    apiSecret: keys.apiSecret,
 });

//Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//public folder setup
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
   const number = req.body.number;
   const text = req.body.text;

   nexmo.message.sendSms('1234567890', number, text, { type: 'unicode' },
   (err, responseData) =>{
       if(err){
           console.log(err);
       } else{
           console.dir(responseData);
       }
   });
});

app.listen(port, () => console.log (`Server is running @ ${port}`));