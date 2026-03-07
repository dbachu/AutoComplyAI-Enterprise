# 🔐 AutoComplyAI Enterprise
AI-Driven Phishing Detection & Compliance Intelligence Platform

AutoComplyAI Enterprise is an AI-powered cybersecurity platform designed to detect phishing threats, map them to industry frameworks, and generate executive-ready threat intelligence reports.

The system combines Rule Engines, Machine Learning, Large Language Models, and Agentic AI orchestration to create an explainable and enterprise-grade threat detection platform.

---

# 👩‍💻 Author

Deepika Kothamasu  
URN: PES2PGE24DS012  

Project Guide:  
Mr. Mahesh Ramegowda

---

# 🧠 Project Overview

Phishing attacks remain one of the most common cyber threats. Traditional detection systems rely on either rules or machine learning, often leading to false positives or missed threats.

AutoComplyAI solves this by introducing a Hybrid Multi-Agent Detection Architecture combining:

• Rule-based heuristics  
• Machine learning classification  
• LLM semantic reasoning  
• Threat intelligence indicators  
• Compliance and MITRE ATT&CK mapping  
• Explainable AI reasoning timeline  

The platform provides SOC-style dashboards and automated compliance reporting, making it suitable for enterprise security teams.

---

# 🏗 System Architecture

React + Vite Frontend
        │
        ▼
FastAPI Backend (API Layer)
        │
        ▼
Agent Orchestrator
        │
        ├── Rule Engine
        ├── ML Classifier
        ├── LLM Model
        ├── Threat Intelligence Agent
        ├── Compliance Mapping Agent
        └── MITRE ATT&CK Mapper
        │
        ▼
Risk Scoring Engine
        │
        ▼
PostgreSQL Database
        │
        ▼
SOC Dashboard & Reports

---

# ⚙ Technology Stack

| Layer | Technology |
|------|-------------|
Frontend | React + Vite |
Backend | FastAPI |
Database | PostgreSQL |
AI Models | Scikit-learn + HuggingFace Transformers |
Visualization | Recharts |
Deployment | Podman / Docker |
Reporting | ReportLab |
Architecture | Multi-Agent AI |

---

# 🔍 Detection Engines

## Rule-Based Detection
Detects known phishing patterns such as:

• Suspicious URLs  
• Credential harvesting keywords  
• Urgency language  

## Machine Learning Detection

Uses a trained phishing classifier enhanced with security feature engineering.

Features include:

• Link detection  
• Credential request patterns  
• Financial institution references  
• Urgency signals  

## LLM Semantic Detection

Uses transformer models to understand the semantic intent of messages and detect sophisticated phishing attempts.

## Hybrid Detection Engine

Combines:

Rule Engine + ML Model + LLM Model

Hybrid scoring improves accuracy and reduces false negatives.

---

# 🤖 Multi-Agent AI System

AutoComplyAI implements Agentic AI orchestration where specialized agents perform different tasks.

## Detection Agent
Calculates phishing risk score.

## Threat Intelligence Agent
Extracts indicators such as:

• Suspicious URLs  
• Credential harvesting patterns  
• Banking phishing indicators  

## MITRE ATT&CK Agent

Maps threats to known adversary techniques.

Example:

T1566.002 – Phishing: Link  
T1204 – User Execution

## Compliance Agent

Maps incidents to security frameworks.

Supported frameworks:

• ISO 27001  
• NIST Cybersecurity Framework  
• GDPR Security Controls  

## Executive Summary Agent

Generates high-level security summaries suitable for SOC analysts or executives.

---

# 📊 SOC Dashboard

The platform includes an enterprise-style Security Operations Center dashboard.

## Key Metrics

• Total scans  
• Phishing detection rate  
• Average risk score  
• Detection confidence  

## Detection Analytics

Interactive visualizations include:

• Detection mode distribution  
• Phishing vs legitimate donut charts  
• Risk trend timeline  
• MITRE ATT&CK heatmap  
• Threat intelligence indicators  

## Explainable AI Visualizations

### Decision Breakdown Chart

Shows how each engine contributed to the final decision.

Example:

Rule Engine → 80  
ML Model → 72  
LLM Model → 94  
Hybrid Final → 94  

### Agent Reasoning Timeline

Displays how each AI agent processed the threat.

Example flow:

Detection Agent → risk score calculated  
Threat Intelligence Agent → suspicious link detected  
MITRE Agent → mapped to phishing technique  
Compliance Agent → mapped to ISO/NIST controls  
Report Agent → executive summary generated  

---

# 📑 Intelligence Reports

Each scan generates a structured threat report.

Report includes:

• Risk Score  
• Confidence Level  
• Detection Mode  
• Executive Summary  
• MITRE ATT&CK Mapping  
• Compliance Mapping  
• Remediation Guidance  

### Export Formats

Reports can be exported as:

• PDF  
• JSON  
• CSV  

---

# 🐳 Deployment

Run using Podman:

podman-compose up --build

Run using Docker:

docker-compose up --build

---

# 🌐 Access

Frontend Dashboard  
http://localhost:5173

Backend API Docs  
http://localhost:8000/docs

---

# 🧪 Sample Phishing Test

Security Alert from Bank of America

We detected unusual activity on your account.

Please verify your credentials immediately:  
http://secure-bank-verification-login.com

Failure to comply within 24 hours will result in account suspension.

Expected result:

Verdict: PHISHING  
Risk Score: High  
MITRE Mapping: Phishing Link  

---

# 🎯 Project Contributions

This project demonstrates:

• Hybrid AI phishing detection  
• Explainable AI decision analysis  
• Automated compliance mapping  
• SOC-style threat intelligence dashboards  
• Agentic AI orchestration architecture  

---

# 🚀 Future Enhancements

• Real-time threat feeds  
• Domain reputation integration  
• Email header analysis  
• Graph-based attack visualization  
• SIEM integration  

---

# 📜 License

Educational / Academic Project
