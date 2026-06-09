const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve CSS, JS, and Asset folders statically
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Replicate Netlify's pretty URLs for subpages (routing clean paths to html files)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/approach', (req, res) => res.sendFile(path.join(__dirname, 'approach.html')));
app.get('/how-it-works', (req, res) => res.sendFile(path.join(__dirname, 'how-it-works.html')));
app.get('/ecosystem', (req, res) => res.sendFile(path.join(__dirname, 'ecosystem.html')));
app.get('/projects', (req, res) => res.sendFile(path.join(__dirname, 'projects.html')));
app.get('/connect', (req, res) => res.sendFile(path.join(__dirname, 'connect.html')));

// API Endpoints to serve the dynamic page data (mimicking backend REST API)
app.get('/api/pages/approach', (req, res) => res.sendFile(path.join(__dirname, 'api', 'pages', 'approach.json')));
app.get('/api/pages/connect', (req, res) => res.sendFile(path.join(__dirname, 'api', 'pages', 'connect.json')));
app.get('/api/pages/ecosystem', (req, res) => res.sendFile(path.join(__dirname, 'api', 'pages', 'ecosystem.json')));
app.get('/api/pages/how-it-works', (req, res) => res.sendFile(path.join(__dirname, 'api', 'pages', 'how-it-works.json')));
app.get('/api/pages/projects', (req, res) => res.sendFile(path.join(__dirname, 'api', 'pages', 'projects.json')));

// Form Submission POST Endpoint
app.post('/api/submit-connect', (req, res) => {
  console.log('Received Lead Submission:', req.body);
  
  // Return success message expected by the frontend
  res.status(200).json({
    message: "Thank you! Your submission was successful. Our integration team will be in touch with you shortly to find your clearing."
  });
});

// Fallback route - serve homepage for unhandled page requests
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`  Glade Startup Website successfully running!`);
  console.log(`  Local Address: http://localhost:${PORT}`);
  console.log(`===================================================`);
});
