const express = require('express')
const app = express()
const port = 3000


app.use(express.json());
app.use(express.urlencoded());



const multiparty = require('multiparty')
 
const fs = require('fs')
 
app.post("/info",  function (req, res) {

  let form = new multiparty.Form();

  form.encoding = 'utf-8';

  form.uploadDir = './images';

  // 设置文件大小限制
  // form.maxFilesSize = 1 * 1024 * 1024;
  
  form.parse(req, function (err, fields, files) {
    try {
      console.log(files)
      let inputFile = files.uploadFile[0];
      let newPath = form.uploadDir + "/" + inputFile.originalFilename;
      // 同步重命名文件名 fs.renameSync(oldPath, newPath)
　　　 //oldPath  不得作更改，使用默认上传路径就好
      fs.renameSync(inputFile.path, newPath);
      res.send({ data: "上传成功！" });
    } catch (err) {
      console.log(err);
      res.send({ err: "上传失败！" });
    };
  })
});


app.post('/login',function(req,res){  
  console.log(req.body)
  var user_name=req.body.user;  
  var password=req.body.password;  
  console.log("User name = "+user_name+", password is "+password);  
  res.end("yes");  
});  


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/3.png');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})