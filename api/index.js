const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const { Pokemon, Tipo } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(upload.any());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para obtener todos los Pokémon
app.get('/api/pokemon', async (req, res) => {
  try {
    const pokemonList = await Pokemon.findAll();
    res.json(pokemonList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Pokémon' });
  }
});

// Endpoint para obtener un Pokémon por nombre
app.get('/api/pokemon/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const pokemon = await Pokemon.findOne({
      where: { nombre: name }
    });
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ error: 'Pokémon no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Pokémon' });
  }
});

// Endpoint para crear un nuevo Pokémon
app.post('/api/pokemon', async (req, res) => {
  const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso } = req.body;
  try {
    const newPokemon = await Pokemon.create({
      nombre, imagen, vida, ataque, defensa, velocidad, altura, peso
    });
    res.status(201).json(newPokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear Pokémon' });
  }
});
// Endpoint para editar un Pokémon por nombre
// Endpoint para editar un Pokémon por ID
app.put('/api/pokemon/:id', async (req, res) => {
  const { id } = req.params;
  const { imagen, vida, ataque, defensa, velocidad, altura, peso } = req.body;

  try {
    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }

    // Actualiza los campos del Pokémon
    pokemon.imagen = imagen || pokemon.imagen;
    pokemon.vida = vida || pokemon.vida;
    pokemon.ataque = ataque || pokemon.ataque;
    pokemon.defensa = defensa || pokemon.defensa;
    pokemon.velocidad = velocidad || pokemon.velocidad;
    pokemon.altura = altura || pokemon.altura;
    pokemon.peso = peso || pokemon.peso;

    // Guarda los cambios en la base de datos
    await pokemon.save();

    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar Pokémon' });
  }
});

// Endpoint para eliminar un Pokémon por ID
app.delete('/api/pokemon/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await Pokemon.findByPk(id);

    if (!pokemon) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }

    // Elimina el Pokémon de la base de datos
    await pokemon.destroy();

    res.json({ message: 'Pokémon eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar Pokémon' });
  }
});

// Endpoint para obtener todos los Tipos
app.get('/api/tipo', async (req, res) => {
  try {
    const tiposList = await Tipo.findAll();
    res.json(tiposList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Tipos' });
  }
});

// Endpoint para obtener un Tipo por nombre
app.get('/api/tipo/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const tipo = await Tipo.findOne({
      where: { nombre: name }
    });
    if (tipo) {
      res.json(tipo);
    } else {
      res.status(404).json({ error: 'Tipo no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Tipo' });
  }
});

// Endpoint para crear un nuevo Tipo
app.post('/api/tipo', async (req, res) => {
  const { nombre } = req.body;
  try {
    const newTipo = await Tipo.create({
      nombre
    });
    res.status(201).json(newTipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear Tipo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

