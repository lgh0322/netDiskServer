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


app.get('/tendency', (req, res) => {
  console.log(req.headers.password)
  if(req.rawHeaders[1]=="gaga"){
    res.sendFile(__dirname + '/3.png');
  }else{
    res.send("Hello word")
    res.end()
  }
 
});

 fs.unlinkSync(__dirname +"\\haha\\dsfg.txt")



/**
 * 
 * @param {*} path 必传参数可以是文件夹可以是文件
 * @param {*} reservePath 保存path目录 path值与reservePath值一样就保存
 */
function delFile(path, reservePath) {
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let currentPath = path + "/" + file;
                if (fs.statSync(currentPath).isDirectory()) {
                    delFile(currentPath, reservePath);
                } else {
                    fs.unlinkSync(currentPath);
                }
            });
            if (path != reservePath) {
                fs.rmdirSync(path);
            }
        } else {
            fs.unlinkSync(path);
        }
    }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})