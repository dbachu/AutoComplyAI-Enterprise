# 🔐 AutoComplyAI 

AI-driven phishing detection and compliance intelligence platform\
Built with Agentic AI orchestration, MITRE ATT&CK mapping, and executive
analytics dashboard.

------------------------------------------------------------------------

## 👩‍💻 Author

**Deepika Kothamasu**\
URN: PES2PGE24DS012\
Project Guide: Mr. Mahesh Ramegowda

------------------------------------------------------------------------

## 🧠 Overview

AutoComplyAI Enterprise is a multi-engine phishing detection and
compliance intelligence system integrating:

-   Rule-based heuristics
-   Machine Learning classifier (Base Paper Inspired)
-   Hybrid scoring engine
-   LLM-based semantic reasoning
-   MITRE ATT&CK mapping
-   ISO 27001 & NIST-CSF compliance mapping
-   Executive SOC-style dashboard
-   Risk trend analytics
-   PDF / JSON / CSV export
-   Containerized deployment (Podman/Docker)

------------------------------------------------------------------------

## 🏗 Architecture

Frontend (React + Vite)\
→ FastAPI Backend\
→ Agent Orchestrator\
→ Detection Engines (Rule \| ML \| Hybrid \| LLM \| OpenAI)\
→ MITRE & Compliance Mapper\
→ PostgreSQL Database

------------------------------------------------------------------------

## 📊 Features

### 🔍 Detection Modes

-   Rule-Based Detection
-   ML-Based Detection
-   Hybrid Mode
-   LLM Mock Mode
-   OpenAI Mode

### 📈 Dashboard Analytics

-   KPI metrics
-   Detection distribution charts
-   Risk trend visualization
-   MITRE ATT&CK frequency donut
-   Executive narrative summary

### 📑 Intelligence Reports

-   Expandable threat reports
-   MITRE mapping
-   ISO/NIST compliance mapping
-   Remediation guidance
-   PDF export

###   Architecture Summary
Frontend (React) communicates with a FastAPI backend. An agentic AI orchestrator selects the
appropriate detection engine. Results are processed for risk scoring and mapped to MITRE and
compliance controls. All scan results are stored in PostgreSQL for reporting and analytics.

### Conclusion
The project demonstrates the integration of AI-driven threat detection with compliance intelligence
and executive reporting. The modul

------------------------------------------------------------------------

## 🐳 Deployment

``` bash
podman-compose up --build
```

or

``` bash
docker-compose up --build
```

Frontend: http://localhost:5173\
Backend Docs: http://localhost:8000/docs

------------------------------------------------------------------------
-  What problem does your project solve?
It detects phishing using AI and maps threats to compliance frameworks.
-  Why hybrid model?
Combines deterministic rules with probabilistic ML for better accuracy.
-  How is MITRE mapping useful?
Aligns detection with structured adversary techniques.
-  How is it enterprise-ready?
Containerized deployment and modular architecture.
------------------------------------------------------------------------
<img width="1081" height="976" alt="image" src="https://github.com/user-attachments/assets/6282ed55-7594-47ef-ab77-cd6ea6bf1403" />


## 📜 License

Educational / Academic Personal Project
