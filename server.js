import express from "express";
const app = express();
import multer from "multer";
import compressing from 'compressing'
import fs from 'fs'

app.use(express.static("public"));
let filename=""

function compress()
{
  compressing.gzip.compressFile(`User/${filename}`, `public/final-file.gz`)
}
const setupname = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "User/");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueSuffix = `File`;
    cb(null, uniqueSuffix + "." + fileExtension);
    filename=uniqueSuffix+"."+fileExtension;
    compress()
    },
  });
const upload = multer({storage: setupname });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    res.redirect('/');
})
function delete_file()
{
  fs.unlinkSync(`public/final-file.gz`,()=>{  })
  fs.unlinkSync(`User/${filename}`,()=>{  })
}

app.post('/filedownload',  function (req, res) {
  delete_file()
  res.redirect('/');
})
app.listen(80, () => {
    console.log("Server is running...");
});