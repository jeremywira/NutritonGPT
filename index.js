const { Configuration, OpenAIApi } = require("openai");
var app = require('express')();
const {readFile, readFileSync} = require('fs');
const bodyParser = require('body-parser');
var Finalres = "";
var userQuery = "";
var sup = [];

app.set('view engine', "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',(request, response) => {
    response.render("index");
});

app.get('/maingpt',(request, response) => {
    response.render('maingpt',{title:  ""});
});

app.post('/generate', (req, res) => {
    userQuery = req.body.MainPrompt;
    GPTresponse(userQuery);
    setTimeout(function() {
        res.render('maingpt', {title: Finalres});
      }, 5000);
});

function GPTresponse(prompt) {
    const configuration = new Configuration({
        apiKey: //Replace with API key (note that you should use .env)
      });
      const openai = new OpenAIApi(configuration);
      
      (async () => {
          const response = await openai.createCompletion({
              model: "text-davinci-001",
              prompt: "You are a vitamin and supplement recommendation ai, I am a client who is either supplying a problem or a goal or both, recommend 3 vitamins or supplements in dot points." + prompt,
              temperature: 0,
              max_tokens: 200,
              // top_p: 1.0,
              // frequency_penalty: 0.5,
              // presence_penalty: 0.0,
              // top: ["You:"],
          });
          console.log(response.data.choices[0].text);
          Finalres = (response.data.choices[0].text);
      })(); 
    return Finalres;   
}

// function GPTresponse(prompt) {
//     Finalres = '-A vitamin B12 supplement can help improve energy levels.'+
//    ' -A magnesium supplement can help improve sleep quality.' +
//    '-A Rhodiola rosea supplement can help improve energy levels and reduce fatigue.' 
//    vit = Finalres.split('-');
//    for (i=0; i<vit.length; i+=1) {
//     console.log(vit[i]);
//    } 
// }



app.listen(process.env.PORT || 3000, () => console.log('App avaliable on http://localhost:3000'))