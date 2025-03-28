const express = require('express');
const app = express();
const path = require('path');

// Middleware pour les fichiers statiques (CSS/JS/Images)
app.use(express.static('public')); // Suppose que vos fichiers sont dans un dossier 'public'

// Routes principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// +++ AJOUTEZ CES 2 ROUTES +++
app.get('/stagiaire', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stagiaire.html'));
});

app.get('/formateur', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formateur.html'));
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});