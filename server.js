const express = require('express');
const app = express();
const mongoose = require('mongoose');


const mongoUri = process.emv.MONGODB_URI || 'mongodb://localhost:27017/sc2'
mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=>{
	console.log('connected to mongo');
});


const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
  res.send('working')
})



app.listen(port, ()=>{
  console.log('listening');
})
