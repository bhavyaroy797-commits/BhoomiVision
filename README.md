# 🌱 BhoomiVision - Land Insights for a Better Tomorrow

> **Evidence-Based Land Governance | Transparent Land Management | Stronger Policies**

A comprehensive web platform for land research, policy innovation, and GIS-based spatial analysis across India. Built with React, Flask, PostgreSQL, MySQL, and MongoDB.

![BhoomiVision](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-informational)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

**BhoomiVision** is a platform built to empower decision-makers, researchers, and citizens with evidence-based land governance insights. It integrates:

- **AI-powered semantic search** on land policies and research
- **GIS maps & spatial analysis** for land use patterns
- **Land dispute tracking & risk prediction**
- **Agricultural productivity analytics**
- **Policy simulation & decision support**
- **Role-based access control** for 5 user types

### Mission
> **Healthy Land • Stronger Communities • A Sustainable India**

---

## ✨ Features

### 🔍 Research & AI Search
- Semantic search on policies, research papers, and land records
- AI-powered Q&A with evidence sourcing
- Historical data access & trend analysis
- Citation management & research gap identification

### 🗺️ GIS & Mapping
- Interactive satellite imagery (ISRO Bhuvan integration)
- Land use & land cover (LULC) change detection
- District-level boundary visualization
- Thematic map generation
- Real-time layer toggling

### 📊 Analytics & Reports
- Land use change analysis (2015-2025)
- Agricultural productivity reports
- Dispute hotspot identification
- Land acquisition project tracking
- Policy compliance dashboards
- Custom report generation (PDF/Excel)

### 👥 Role-Based Access Control
1. **Public User** - Policies, open maps, basic research
2. **Researcher/Analyst** - Full research, AI search, datasets
3. **GIS Field Officer** - Satellite imagery, field tools, land detection
4. **Govt Official** - Policy simulation, dispute resolution, governance dashboards
5. **System Admin** - Platform monitoring, user management

### 📋 Policy & Innovation
- Central & state policy archive
- Government schemes database
- Policy documents & circulars
- Innovation case studies
- Drone-based land monitoring
- Digital land records integration

---

## 🛠️ Tech Stack

### Frontend
```
React 18                    - UI Framework
React Router v6             - Client-side routing
Vite                       - Build tool
Tailwind CSS / Vanilla CSS - Styling
Leaflet.js                 - Interactive maps
Chart.js                   - Data visualization
Axios                      - HTTP client
```

### Backend
```
Flask / Python             - REST API server
Flask-CORS                 - Cross-origin requests
SQLAlchemy                 - ORM for MySQL
PyMongo                    - MongoDB driver
```

### Databases
```
MySQL + PostGIS            - Relational & spatial data
MongoDB                    - Document storage & full-text search
Elasticsearch              - NLP & semantic search
```

### DevOps & Tools
```
Node.js 18+                - Runtime
Git                        - Version control
npm / yarn                 - Package management
Docker (optional)          - Containerization
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ & npm/yarn
- Python 3.9+
- MySQL 8.0+
- MongoDB 6.0+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/bhoomivision.git
cd bhoomivision
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm install react-router-dom
npm run dev
```

Open browser to `http://localhost:5173`

### 3. Backend Setup (Optional - For Full Stack)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run
```

Backend runs on `http://localhost:5000`

### 4. Database Setup
See [Database Setup](#database-setup) section below.

---

## 📥 Installation

### Full Installation Guide

#### Step 1: Frontend Installation
```bash
cd frontend
npm install
npm install react-router-dom
```

#### Step 2: Backend Installation
```bash
cd backend
python -m venv venv
source venv/bin/activate

# On Windows:
# venv\Scripts\activate

pip install flask
pip install flask-cors
pip install flask-sqlalchemy
pip install pymongo
pip install python-dotenv
```

#### Step 3: Environment Variables
Create `.env` file in backend folder:
```
MYSQL_URL=mysql+pymysql://root:PASSWORD@localhost:3306/bhoomivision
MONGODB_URL=mongodb://localhost:27017/bhoomivision
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
```

#### Step 4: Start Servers
```bash
# Terminal 1: Frontend
cd frontend
npm run dev

# Terminal 2: Backend
cd backend
flask run
```

---

## 📁 Project Structure

```
bhoomivision/
├── frontend/
│   ├── src/
│   │   ├── main.jsx              # React entry point
│   │   ├── App.jsx               # Main app component
│   │   ├── index.css             # Global styles
│   │   ├── api/                  # Flask API calls
│   │   ├── auth/                 # Authentication context
│   │   ├── components/           # Reusable components
│   │   ├── pages/                # Page components
│   │   ├── hooks/                # Custom hooks
│   │   ├── utils/                # Utility functions
│   │   └── context/              # Global state
│   ├── public/
│   │   └── assets/images/        # Background images
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/
│   ├── app/
│   │   ├── api/                  # Route blueprints
│   │   ├── models/               # SQLAlchemy models
│   │   ├── services/             # Business logic
│   │   ├── ml/                   # ML models
│   │   ├── gis/                  # Spatial functions
│   │   └── documents/            # OCR & indexing
│   ├── migrations/               # Database migrations
│   ├── config.py                 # Configuration
│   ├── requirements.txt
│   └── app.py
│
├── database/
│   ├── bhoomivision_mysql_schema.sql
│   └── bhoomivision_mongodb_schema.js
│
└── README.md
```

---

## 🗄️ Database Setup

### MySQL Setup (Relational Data)
```bash
# 1. Install MySQL from https://dev.mysql.com/downloads/mysql/
# 2. Create database
mysql -u root -p
CREATE DATABASE bhoomivision;

# 3. Import schema
mysql -u root -p bhoomivision < database/bhoomivision_mysql_schema.sql
```

**Connection String:**
```
mysql+pymysql://root:PASSWORD@localhost:3306/bhoomivision
```

### MongoDB Setup (Documents)
```bash
# 1. Install MongoDB from https://www.mongodb.com/try/download/community
# 2. Start MongoDB service
mongod

# 3. In new terminal, connect
mongosh

# 4. Import collections
use bhoomivision
// Paste contents of bhoomivision_mongodb_schema.js
```

**Connection String:**
```
mongodb://localhost:27017/bhoomivision
```

---

## 📚 API Documentation

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Research
```
GET  /api/research/query           # Semantic search
GET  /api/research/papers          # Research papers list
POST /api/research/ask-ai          # AI Q&A
```

### Land Governance
```
GET  /api/land-records             # Land records
GET  /api/disputes                 # Land disputes
GET  /api/acquisitions             # Land acquisitions
```

### GIS & Maps
```
GET  /api/gis/map-data             # Map layers
GET  /api/gis/satellite-imagery    # Satellite images
POST /api/gis/lulc-analysis        # Land use analysis
```

### Reports
```
POST /api/reports/generate         # Generate report
GET  /api/reports/:id              # Get report
GET  /api/reports/download/:id     # Download report
```

See `backend/docs/API.md` for full API reference.

---

## 🤝 Contributing

We welcome contributions! Here's how:

### 1. Fork the Repository
```bash
git clone https://github.com/YOUR_USERNAME/bhoomivision.git
cd bhoomivision
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Write clean, readable code
- Follow project structure
- Add comments for complex logic

### 3. Commit & Push
```bash
git add .
git commit -m "Add: Brief description of changes"
git push origin feature/your-feature-name
```

### 4. Create Pull Request
- Go to GitHub
- Click "Compare & pull request"
- Describe your changes
- Wait for review

### Coding Standards
- Use meaningful variable names
- Keep functions small & focused
- Comment complex sections
- Write tests for new features

---

## 📊 Project Stats

- **Lines of Code:** 10,000+
- **Database Tables:** 18 (MySQL)
- **MongoDB Collections:** 8
- **API Endpoints:** 40+
- **User Roles:** 5
- **Supported Districts:** 700+

---

## 🎓 Learn More

### Documentation
- [Frontend Setup Guide](docs/FRONTEND_SETUP.md)
- [Backend Setup Guide](docs/BACKEND_SETUP.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [API Reference](docs/API_REFERENCE.md)

### External Resources
- [React Documentation](https://react.dev)
- [Flask Documentation](https://flask.palletsprojects.com)
- [Leaflet Maps](https://leafletjs.com)
- [MongoDB Guide](https://docs.mongodb.com)
- [PostGIS Tutorial](https://postgis.net/workshops)

---

## 🎯 Roadmap

- [x] Core platform & authentication
- [x] GIS maps & visualization
- [x] Research & AI search
- [ ] Mobile app (React Native)
- [ ] Advanced ML predictions
- [ ] Real-time data integration
- [ ] API v2 with GraphQL
- [ ] Multilingual support

---


### v1.0.0 (Current)
- Initial release
- Core platform & auth
- GIS maps
- Research & AI search
- Land governance dashboard
- Role-based access control

---

**Last Updated:** September 9, 2026

**Made with ❤️ for a Sustainable India**

---

*"Better Policies Today for a Sustainable Tomorrow"* 🌍
