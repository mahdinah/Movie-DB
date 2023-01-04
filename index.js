const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('ok')
})
app.get('/test', (req, res) => {
  res.send(
      {
           status:200,
           message:"ok"
      }
  )
})



 //time
app.get('/time', (req, res) => {
const today = new Date();
const time = today.getHours() + ":" + today.getSeconds();
  res.send(
    {status:200, message:time}
  )
})
//     //hello

app.get('/hello/:ID', (req, res) => {
  data = req.params;
    res.send(
      {status:200, message:"Hello, "+ data.ID}
    )
  })
//      //search
     app.get('/search', (req, res) => {
      search=req.query.s
        if (!search){
          res.send(
          {status:500, error:true, message:"you have to provide a search"}
          )
        }else{
          res.send(
            {status:200, message:"ok", data:search}
          )
        }
    })
app.listen(port,()=>{
  console.log(`Server Listening on port ${port}`)
  });