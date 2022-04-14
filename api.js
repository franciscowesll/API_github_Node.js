const express = require('express')
const axios = require('axios')
const { Router } = require('express')

const app = express()




app.listen(4000)

app.route('/api/users').get((req, res) => {
   axios.get('https://api.github.com/users').then(result => { 
       
   const resultado = result.data
   const page = parseInt(req.query.page)
   const limit = 20
  
   const startIndex = (page - 1) * limit
   const endIndex = page * limit

   const results = {}

   if(endIndex < resultado.length){
        results.next = {
            link: `localhost:4000/api/users?page'=${page+1}`
            
        }
    }

   if (startIndex > 0){
        results.previous = {
            link: `localhost:4000/api/users?page=${page-1}`
        }
    }

    const resul = resultado.map((item, index) => item.login )
   results.results = resul.slice(startIndex, endIndex) 
   

  
  res.send(results) 
})
   
   
})


const detalhes = app.route('/api/users/:username/details').get( (req, res) => {
    const usuario = req.params.username
    
    axios.get(`https://api.github.com/users/${usuario}`)
          .then(result => res.send(result.data))
        
})

const reposicao = app.route('/api/users/:username/repos').get( (req, res) => {
    const usuario = req.params.username
    axios.get(`https://api.github.com/users/${usuario}/repos`)
          .then(result => res.send(result.data))

        
})

