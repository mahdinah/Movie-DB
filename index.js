const express = require('express');

const app = express();
const port = 3000;
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
      app.post("/movies/add", (req, res) => {
        // Get the title, year, and rating from the query string
        let { title, year, rating } = req.query;
      
        // Check if the title and year are present
        if (!title || !year) {
          return res.status(404).send({
            status: 404,
            error: true,
            message: "You cannot create a movie without providing a title or a year",
          });
        }
      
        // Check if the year is 4 digits and is a number
        if (year.length !== 4 || isNaN(year)) {
          return res.status(404).send({
            status: 404,
            error: true,
            message: "You cannot create a movie without providing a valid year",
          });
        }
      
        // Set the default rating if one is not provided
        if (!rating || isNaN(rating)) {
          rating = 4;
        }
      
        // Create the new movie object
        const newMovie = {
          title,
          year,
          rating,
        };
      
        // Add the new movie to the movies array
        movies.push(newMovie);
      
        // Return the updated list of movies
        res.send(movies);
      });
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
 app.put('/movies/update/ID', (req, res) => {
    
  data = req.params;
  newTitle = req.query.title
  newYear = Number(req.query.year)
  newRating = Number(req.query.rating)
  let index
  let exist = false;
  for(var i = 0; i < movies.length; i++){
    if(data.ID == movies[i].id){
      exist = true;
      index= i;
    }
  }
  if (exist){
    if(newTitle) movies[index].title = newTitle
    if(newYear) movies[index].year = newYear
    if (newRating) movies[index].rating = newRating
    res.send({status:200, data:movies})
  }else {
    res.send({status:404, error:true, message:'the movie <ID> does not exist'})
  }
  
  })
   //delete
   app.delete('/movies/delete/:ID', (req, res) => {
    data = req.params;
    let index
    let exist = false;
    for(var i = 0; i < movies.length; i++){
      if(data.ID == movies[i].id){
        exist = true;
        index= i;
      }
    }
    if (exist){
      movies.splice(index,1);
      res.send({status:200, data:movies})
    }else {
      res.send({status:404, error:true, message:'the movie <ID> does not exist'})
    }
      
   })
   //read-by-date
   app.get("/movies/read/by-date", (req, res) => {
    res.send({ status: 200, data: movies.sort((a, b) => a.year - b.year) });
  });
  //read-by-rating
  app.get("/movies/read/by-rating", (req, res) => {
    res.send({ status: 200, data: movies.sort((a, b) => b.rating - a.rating) });
  });
  //read-by-title
  app.get("/movies/read/by-title", (req, res) => {
    res.send({
      status: 200,
      data: movies.sort((a, b) => a.title.localeCompare(b.title)),
    });
  });
  //read-by-id
  app.get('/movies/read/id/:id', (req, res)=> {
    let id = req.params.id;
    //const mov = movies.find(c=>movies[id]===parseInt(id));
    const mov = movies[id-1];
    if(!mov)res.send({status:404, error:true, message:'the movie id does not exist'});
    res.send({status:200, data:mov}); 
});
  
app.listen(port,()=>{
  console.log(`Server Listening on port ${port}`)
  });