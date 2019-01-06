const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use('/', express.static('public'));
app.use('/login', function(req, res){
  res.status(401).sendFile('/home/ubuntu/workspace/public/login.html');
});
app.use('/register', function(req, res){
  res.status(401).sendFile('/home/ubuntu/workspace/public/register.html');
});
app.listen(8080);

const Sequelize = require('sequelize');
const sequelize = new Sequelize('proiect','root','',{
	dialect : 'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Connected to database");
}).catch(() => {
    console.log("Unable to connect to database");
});

const Artist = sequelize.define('artists', 
{
	id: 
      {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
       },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    varsta: Sequelize.INTEGER,
    nrpiese:Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
	  updatedAt: Sequelize.DATE,
});

const Song = sequelize.define('songs', 
{
  id:
     {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
   name: Sequelize.STRING,
   gen: Sequelize.STRING,
   nrViews: Sequelize.INTEGER,
   date: Sequelize.DATE,
   length: Sequelize.INTEGER,
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,
  
  });
  
  Artist.hasMany(Song, {as: 'Songs'});
  
  const Playlist =sequelize.define ('playlists',
  {
    id:
      {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
       },
     NrSongs: sequelize.INTEGER,
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE,
 }};
 
 Playlist.hasMany(Song, {as: 'songs'});
 
            
   
    
 
 
 
 
 
 
 
 
 
 
 
