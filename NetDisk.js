const express = require('express')
const app = express()
const port = 3000


app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.post('/login',function(req,res){  
  console.log(req.body)
  var user_name=req.body.user;  
  var password=req.body.password;  
  console.log("User name = "+user_name+", password is "+password);  
  res.end("yes");  
});  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})