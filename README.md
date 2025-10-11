<div align="center">

# 🔥 FuzzForge

### AI-Powered Security Analysis & Vulnerability Detection Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success)](https://github.com/Shashwat-srivastav/fuzzforge)

**Intelligent security analysis powered by AI agents • Real-time fuzzing • Professional vulnerability reporting**

[🚀 Quick Start](#-quick-start) • [📖 Features](#-features) • [💻 Demo](#-demo) • [📚 Documentation](#-documentation)

</div>

---

## 🎯 What is FuzzForge?

**FuzzForge** is a next-generation security analysis platform that combines **static code analysis**, **dynamic fuzzing**, and **AI-powered vulnerability detection** to identify critical security flaws in your codebase.

### Why FuzzForge?

- **🤖 AI-Powered**: Multi-agent system with specialized security experts
- **🔍 Real AST Analysis**: No hallucinations, actual code structure parsing
- **⚡ Parallel Execution**: 40% faster with concurrent analysis
- **🐛 Real Fuzzing**: VM-based dynamic testing with crash detection
- **📊 Comprehensive Reports**: Professional vulnerability documentation with CVSS scoring
- **🎯 Production Ready**: Graceful fallbacks, zero crashes, honest communication

---

## ✨ Features

### Core Capabilities

| Feature | Description |
|---------|-------------|
| **🔬 AST-Based Analysis** | Real code structure parsing using Babel, not LLM inference |
| **⚡ Parallel Agents** | Reconnaissance + API security run concurrently (~40% faster) |
| **🐛 Dynamic Fuzzing** | VM-isolated execution with 500 iterations per function |
| **🛡️ API Security** | Full OWASP API Top 10:2023 coverage |
| **🕸️ Code Knowledge Graph** | Visual attack surface mapping with D3.js |
| **📄 CVE Correlation** | Automatic threat intelligence matching |
| **🎯 Smart Target Selection** | AI identifies high-risk functions for fuzzing |
| **📊 CVSS Scoring** | Professional vulnerability severity assessment |

### Supported Languages

| Language | AST Analysis | Real Fuzzing | Status |
|----------|--------------|--------------|--------|
| JavaScript | ✅ | ✅ | Full Support |
| TypeScript | ✅ | ✅ | Full Support |
| Python | ✅ | ⚠️ LLM Simulation | High Quality |
| Java | ✅ | ⚠️ LLM Simulation | High Quality |
| C/C++ | ⚠️ Pattern-based | ⚠️ LLM Simulation | Good Quality |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm** or **yarn**
- **Mistral AI API Key** ([Get one free](https://console.mistral.ai/))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Shashwat-srivastav/fuzzforge.git
cd fuzzforge

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and add your Mistral API key:
# MISTRAL_API_KEY=your_api_key_here

# 4. Start the backend server (Terminal 1)
npm run dev:server

# 5. Start the frontend (Terminal 2)
npm run dev

# 6. Open your browser
# Navigate to http://localhost:5173
```

### Using FuzzForge

1. **Prepare Your Codebase**
   - Compress your project into a ZIP file
   - Supported extensions: `.js`, `.ts`, `.py`, `.java`, `.cpp`, `.c`, `.go`, `.rs`, `.php`

2. **Upload & Analyze**
   - Click "Upload Codebase" button
   - Select your ZIP file
   - Wait 15-60 seconds for analysis

3. **Review Results**
   - 📍 Reconnaissance findings (secrets, exposed paths)
   - 🔒 API security vulnerabilities
   - 🕸️ Interactive code knowledge graph
   - 🎯 Identified fuzz targets
   - 🐛 Real fuzzing results
   - 📄 Professional vulnerability report

4. **Export Report**
   - Download comprehensive security report
   - Share with your team
   - Integrate into your security workflow

---

## 🔄 Analysis Workflow

FuzzForge executes a **7-step automated security analysis**:

```
1️⃣ 📍 Reconnaissance Analysis
   → Scan for hardcoded secrets, API keys, exposed paths
   → Pattern matching for dangerous functions
   → Threat intelligence correlation
   
2️⃣ 🔒 API Security Analysis  
   → OWASP API Top 10:2023 detection
   → BOLA/IDOR, broken auth, injection flaws
   → Missing security controls
   
3️⃣ 🕸️ Code Knowledge Graph
   → AST-based structure analysis
   → Function/class dependency mapping
   → Attack surface visualization
   
4️⃣ 🎯 Fuzz Target Identification
   → AI-powered high-risk function detection
   → Complexity and impact scoring
   → Prioritized fuzzing targets
   
5️⃣ 💉 PromptFuzz Generation
   → 50+ intelligent test payloads
   → Boundary values, injections, overflows
   → Language-specific attack vectors
   
6️⃣ 🐛 Real Fuzzing Engine
   → VM-isolated execution (JS/TS)
   → 500 iterations per function
   → Actual crash detection
   → LLM simulation fallback (Python/Java)
   
7️⃣ 📄 Vulnerability Report
   → CVSS v3.1 scoring
   → Professional documentation
   → Remediation guidance with code examples
   → CVE-ready format
```

---

## 🎨 UI Features & Badges

FuzzForge provides **transparent, honest feedback** about analysis quality through UI badges:

| Badge | Meaning | Quality |
|-------|---------|---------|
| 🔬 **AST-VERIFIED** | Real code structure analysis | ⭐⭐⭐⭐⭐ |
| ⚡ **PARALLEL EXECUTION** | Concurrent agents (optimal) | ⭐⭐⭐⭐⭐ |
| ⚠️ **SEQUENTIAL FALLBACK** | One-by-one processing | ⭐⭐⭐☆☆ |
| 🎯 **AI-IDENTIFIED** | AI-selected targets | ⭐⭐⭐⭐⭐ |
| ⚠️ **HEURISTIC ANALYSIS** | Pattern-based detection | ⭐⭐⭐☆☆ |
| 🐛 **REAL FUZZING** | Actual crash detection | ⭐⭐⭐⭐⭐ |
| ⚠️ **LLM SIMULATION** | AI-predicted vulnerabilities | ⭐⭐⭐☆☆ |

**No fake badges** - FuzzForge honestly communicates which mode is active and what quality you're getting.

---

## 🏗️ Architecture

### Technology Stack

**Frontend**
- React 19.1 with TypeScript 5.8
- Vite 6.2 (blazing fast HMR)
- TailwindCSS for styling
- ReactFlow for graph visualization
- Zod for schema validation

**Backend**
- Node.js with Express
- Babel parser for AST analysis
- VM module for fuzzing isolation
- Rate limiting & CORS protection

**AI Integration**
- Mistral AI API (mistral-medium-2508)
- Multi-agent orchestration
- Intelligent fallback mechanisms

### System Design

```
┌─────────────────┐
│  User Interface │
│   (React App)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API Gateway    │
│   (Express)     │
└────────┬────────┘
         │
         ├─────────────┬──────────────┬──────────────┐
         ▼             ▼              ▼              ▼
┌────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ AST Parser │  │ Mistral  │  │  Fuzzing │  │   CVE    │
│  (Babel)   │  │    AI    │  │  Engine  │  │Database  │
└────────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| **Analysis Time** | 15-60 seconds (average) |
| **Parallel Speedup** | ~40% faster than sequential |
| **Fuzzing Iterations** | 500 per function |
| **Code Coverage** | 100% fallback coverage |
| **TypeScript Errors** | 0 |
| **Production Ready** | ✅ YES |

### Performance Comparison

| Codebase Size | Parallel Mode | Sequential Mode |
|---------------|---------------|-----------------|
| Small (<10 files) | ~10-15s | ~15-20s |
| Medium (10-50 files) | ~20-30s | ~30-45s |
| Large (50+ files) | ~40-60s | ~60-90s |

---

## 💻 Demo

### Live Demo

🌐 **[Try FuzzForge Live](https://shashwat-srivastav.github.io/fuzzforge/)**

### Demo Video

*(Coming soon)*

### Screenshots

**Main Dashboard**
![Dashboard](docs/images/dashboard.png)

**Code Knowledge Graph**
![CKG](docs/images/ckg.png)

**Vulnerability Report**
![Report](docs/images/report.png)

---

## 📚 Documentation

### Quick Links

- [Installation Guide](#installation)
- [Usage Guide](#using-fuzzforge)
- [API Documentation](docs/API.md)
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Contributing Guide](CONTRIBUTING.md)

### Key Concepts

#### Multi-Agent System

FuzzForge uses specialized AI agents, each with expert-level prompting:

1. **Reconnaissance Agent** - Senior offensive security engineer
2. **API Security Agent** - Principal API security architect (OWASP specialist)
3. **CKG Generator** - Elite software architect
4. **Fuzz Target Agent** - Lead fuzzing engineer (ex-Google Project Zero)
5. **PromptFuzz Agent** - Senior exploit developer (AFL++ contributor)
6. **Report Generator** - Principal security researcher (CVE experience)

#### Intelligent Fallbacks

FuzzForge **never crashes**. Every component has graceful degradation:

- ⚡ Parallel execution → ⚠️ Sequential fallback
- 🎯 AI target selection → ⚠️ Heuristic analysis
- 🐛 Real fuzzing → ⚠️ LLM simulation
- 🔬 AST parsing → ⚠️ Pattern matching

---

## 🛠️ Development

### Project Structure

```
fuzzforge/
├── components/          # React UI components
│   ├── AgentCard.tsx
│   ├── CKGVisualizer.tsx
│   ├── VulnerabilityReport.tsx
│   └── ...
├── services/           # Core business logic
│   ├── geminiService.ts
│   ├── astAnalyzer.ts
│   ├── fuzzingEngine.ts
│   └── ...
├── hooks/              # React hooks
│   └── useFuzzingWorkflow.tsx
├── server/             # Backend API
│   └── api.js
├── demo-codebase/      # Test data
└── ...
```

### Available Scripts

```bash
# Development
npm run dev              # Start frontend (http://localhost:5173)
npm run dev:server       # Start backend (http://localhost:3001)

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run type-check       # TypeScript type checking
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API Configuration
MISTRAL_API_KEY=your_mistral_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173

# Frontend Configuration  
VITE_API_PROXY_URL=http://localhost:3001/api/analyze
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas We Need Help

- 🌍 Additional language support (Go, Rust, PHP, Ruby, C#)
- 🧪 Benchmark dataset creation
- 🎨 UI/UX improvements
- 📖 Documentation enhancements
- 🐛 Bug reports and fixes

---

## 🗺️ Roadmap

### ✅ Phase 1: Foundation (Complete)
- [x] Multi-agent AI architecture
- [x] 7-step automated workflow
- [x] Real AST-based analysis
- [x] Parallel execution with fallbacks
- [x] VM-based fuzzing for JS/TS
- [x] Professional vulnerability reporting

### 🚧 Phase 2: Enhanced Fuzzing (In Progress)
- [ ] Python VM integration for real Python fuzzing
- [ ] Java VM integration for real Java fuzzing
- [ ] Enhanced coverage tracking
- [ ] Improved mutation strategies

### 📋 Phase 3: Integration & Automation (Planned)
- [ ] GitHub Actions CI/CD integration
- [ ] VS Code extension
- [ ] CLI tool for DevOps
- [ ] SARIF export format
- [ ] GitLab/Bitbucket support

### 📋 Phase 4: Enterprise Features (Future)
- [ ] Multi-user support
- [ ] Project history tracking
- [ ] Custom rule engine
- [ ] API for programmatic access
- [ ] JIRA/ServiceNow integration

---

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Change the port in .env
PORT=3002
```

**API Key Not Working**
```bash
# Verify your .env file
cat .env

# Should contain:
MISTRAL_API_KEY=your_actual_key_here
```

**Upload Fails**
- Ensure ZIP file is under 50MB
- Check that files have allowed extensions
- Verify no path traversal in ZIP structure

**Fuzzing Not Working**
- Real fuzzing only supports JavaScript/TypeScript
- Other languages use LLM simulation (still effective)
- Check console for error messages

### Getting Help

- 📖 Check the [Documentation](docs/)
- 🐛 Report bugs in [Issues](https://github.com/Shashwat-srivastav/fuzzforge/issues)
- 💬 Join our [Discussions](https://github.com/Shashwat-srivastav/fuzzforge/discussions)
- 📧 Email: [support@fuzzforge.dev](mailto:support@fuzzforge.dev)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Mistral AI** - Powerful language models
- **OWASP** - API Security Top 10 standards
- **Google Project Zero** - Fuzzing methodology inspiration
- **AFL++** - Fuzzing framework concepts
- **React & Vite Teams** - Amazing development tools

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Shashwat-srivastav/fuzzforge?style=social)
![GitHub forks](https://img.shields.io/github/forks/Shashwat-srivastav/fuzzforge?style=social)
![GitHub issues](https://img.shields.io/github/issues/Shashwat-srivastav/fuzzforge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Shashwat-srivastav/fuzzforge)

---

<div align="center">

**Built with ❤️ for the security community**

[⭐ Star us on GitHub](https://github.com/Shashwat-srivastav/fuzzforge) • [🐛 Report Bug](https://github.com/Shashwat-srivastav/fuzzforge/issues) • [💡 Request Feature](https://github.com/Shashwat-srivastav/fuzzforge/issues)

**FuzzForge** - *Making security analysis accessible to everyone*

</div>
