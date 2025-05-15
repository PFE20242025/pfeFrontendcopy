const express = require('express');
const path = require('path');
const app = express();

// Détermine le chemin du répertoire de l'application
// Pour une App Service Linux, le code est déployé dans /home/site/wwwroot
// Si nous sommes en développement local, nous utilisons le répertoire courant
const distPath = path.join(__dirname, './dist/pfefrontend');

// Journalisation pour le débogage
console.log('Serving static files from:', distPath);
console.log('Current directory:', __dirname);
console.log('Directory contents:', require('fs').readdirSync(__dirname));

// Sert les fichiers statiques
app.use(express.static(distPath));

// Route tous les autres chemins vers index.html pour le routage côté client Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Utilise le port fourni par l'environnement Azure ou 8080 par défaut
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Angular app running on port ${PORT}`);
});
