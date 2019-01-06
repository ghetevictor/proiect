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
	dialect : 'mysql',
	operatorsAliases: false,
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
    nrSongs:Sequelize.INTEGER,
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
     NrSongs: Sequelize.INTEGER,
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE,
 });
 
 Playlist.hasMany(Song, {as: 'songs'});
 
 app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created');
    }).catch((err) => {
        console.log(err);
        response.status(200).send('could not create tables');
    });
});

app.use(express.json());
app.use(express.urlencoded());





// Metode GET, POST, PUT si DELETE pt Artist



app.post('/newArtist', (req, res) => {
	Artist.create(req.body).then((result) => {
      res.status(201).json(result);
  }).catch((err) => {
      console.log(err);
      res.status(500).send("resource not created");
  });
});
app.get('/artists', (request, response) => {
    Artist.findAll().then((results) => {
        response.status(200).json(results);
    });
});
app.get('/getArtist/:id', (request, response) => {
    Artist.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('database error');
    });
});
app.put('/editArtist/:id', (request, response) => {
    Artist.findById(request.params.id).then((artist) => {
        if(artist) {
            artist.update(request.body).then((result) => {
                response.status(201).json(result);
            }).catch((err) => {
                console.log(err);
                response.status(500).send('database error');
            });
        } else {
            response.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('database error');
    });
});
app.delete('/deleteArtist/:id', (request, response) => {
    Artist.findById(request.params.id).then((artist) => {
        if(artist) {
            artist.destroy().then((result) => {
                response.status(204).send();
            }).catch((err) => {
                console.log(err);
                response.status(500).send('database error');
            });
        } else {
            response.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('database error');
    });
});




// Metode GET, POST, PUT si DELETE pt Song



app.post('/newSong', (req, res) => {
	Song.create(req.body).then((result) => {
      res.status(201).json(result);
  }).catch((err) => {
      console.log(err);
      res.status(500).send("resource not created");
  });
});
app.get('/songs', (request, response) => {
    Song.findAll().then((results) => {
        response.status(200).json(results);
    });
});
app.get('/getSong/:id', (request, response) => {
    Song.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('database error');
    });
});
app.put('/editSong/:id', (request, response) => {
    Song.findById(request.params.id).then((song) => {
        if(song) {
            song.update(request.body).then((result) => {
                response.status(201).json(result);
            }).catch((err) => {
                console.log(err);
                response.status(500).send('database error');
            });
        } else {
            response.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('database error');
    });
});
app.delete('/deleteSong/:id', (request, response) => {
    Song.findById(request.params.id).then((song) => {
        if(song) {
            song.destroy().then((result) => {
                response.status(204).send();
            }).catch((err) => {
                console.log(err);
                response.status(500).send('database error');
            });
        } else {
            response.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('database error');
    });
});



// Metode GET, POST, PUT si DELETE pt Playlist



app.post('/newPlaylist', (req, res) => {
	Playlist.create(req.body).then((result) => {
      res.status(201).json(result);
  }).catch((err) => {
      console.log(err);
      res.status(500).send("resource not created");
  });
});
app.get('/playlists', (request, response) => {
    Playlist.findAll().then((results) => {
        response.status(200).json(results);
    });
});
app.get('/getPlaylist/:id', (request, response) => {
    Playlist.findById(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result);
        } else {
            response.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('database error');
    });
});

app.put('/editPlaylist/:id', (request, response) => {
    Playlist.findById(request.params.id).then((playlist) => {
        if(playlist) {
            playlist.update(request.body).then((result) => {
                response.status(201).json(result);
            }).catch((err) => {
                console.log(err);
                response.status(500).send('database error');
            });
        } else {
            response.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('database error');
    });
});

app.delete('/deletePlaylist/:id', (request, response) => {
    Playlist.findById(request.params.id).then((playlist) => {
        if(playlist) {
            playlist.destroy().then((result) => {
                response.status(204).send();
            }).catch((err) => {
                console.log(err);
                response.status(500).send('database error');
            });
        } else {
            response.status(404).send('resource not found');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('database error');
    });
});

