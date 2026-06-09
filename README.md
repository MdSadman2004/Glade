# Glade Startup Website

This is the fully replicated Glade startup website, cloned directly from the Netlify production build.

## Project Structure
- `index.html` - Homepage.
- `approach.html`, `how-it-works.html`, `ecosystem.html`, `projects.html`, `connect.html` - Subpages loaded dynamically via REST API.
- `css/` - Custom layouts, visual design systems, animations.
- `js/` - Logic for state storage, layout animations, cursor effects, and 3D canvas formation engine.
- `assets/` - Brand logos and graphical assets.
- `api/` - Mock JSON databases loaded by dynamic pages.
- `server.js` - Express backend providing pretty routing and REST endpoints.

## Local Setup

### Requirements
- Node.js (v14+) and npm

### Installation
Install the project dependencies:
```bash
npm install
```

### Start Server
Run the local dev server:
```bash
npm start
```

Once running, navigate to:
[http://localhost:3000](http://localhost:3000)
