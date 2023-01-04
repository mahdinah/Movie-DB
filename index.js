const express = require('express');

const app = express();
const port = 3001;
const movies = [
  { title: 'Jaws', year: 1975, rating: 8, id:12},
  { title: 'Avatar', year: 2009, rating: 7.8, id:34 },
  { title: 'Brazil', year: 1985, rating: 8, id:56 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2, id:78 }
]

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
      //create
      app.get('/movies/add', (req, res) => {
        res.send('add movie')

      })
         //read
   app.get('/movies/get', (req, res) => {
    res.send(
    {
     status:200,
     data:movies
    }
  )
})
 //update
 app.get('/movies/edit', (req, res) => {
  res.send('edit movie')
 })
   //delete
   app.get('/movies/delete', (req, res) => {
    res.send('delete movie')
   })
  
app.listen(port,()=>{
  console.log(`Server Listening on port ${port}`)
  });