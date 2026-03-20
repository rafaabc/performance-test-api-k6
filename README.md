# Performance Test API k6

Performance testing repository for a REST API using k6. The tests cover authentication and bank transfer scenarios, with support for multi-stage load profiles and performance thresholds.

## Introduction

This project is focused on learning performance testing concepts using k6. The tests are built around a fictional API and simulate fictitious load scenarios — such as login and transfers — with the sole purpose of practicing and exploring the tool's features.

## Technologies

- **[k6](https://k6.io/)** — open-source performance testing tool
- **JavaScript (ES6+)** — language used to write the k6 scripts
- **k6 Web Dashboard** — built-in k6 interface for real-time metrics monitoring and HTML report export

## Repository Structure

```
performance-test-api-k6/
├── config/
│   └── config.local.json
├── fixtures/
│   └── postLogin.json
├── helpers/
│   └── auth.js
├── test/
│   ├── login.test.js
│   └── transferencias.test.js
└── utils/
    └── variaveis.js
```

## Purpose of Each File Group

| Directory / File | Description |
|---|---|
| `config/` | Stores environment configuration files, such as the API base URL (`config.local.json`). Used as a fallback when the `BASE_URL` environment variable is not provided. |
| `fixtures/` | Contains static payloads reused across tests, such as login credentials (`postLogin.json`). |
| `helpers/` | Reusable helper functions shared across tests. The `auth.js` file performs the login request and returns the authentication token. |
| `test/` | k6 test scripts. Each file represents a test scenario with its load configuration (`options`) and the HTTP requests to be executed. |
| `utils/` | Support utilities. The `variaveis.js` file exposes the `pegarBaseURL()` function, which returns the base URL from the `BASE_URL` environment variable or from the local config file. |

## Installation and Execution

### Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) installed on your machine

### Prerequisite: API up and running

The tests in this repository depend on the [banco-api-performance](https://github.com/juliodelimas/banco-api-performance) API being up and running. Before executing any test, make sure to follow the setup and startup instructions from that project.

### Installation

Clone the repository:

```bash
git clone https://github.com/rafaabc/performance-test-api-k6.git
cd performance-test-api-k6
```

### Base URL Configuration

Before running the tests, set the API URL in the `config/config.local.json` file:

```json
{
  "baseUrl": "http://localhost:3000"
}
```

### Running the Tests

```bash
k6 run test/login.test.js
```

```bash
k6 run test/transferencias.test.js
```

> **Reminder:** if `config/config.local.json` has not been configured, pass the base URL directly via the command:
> ```bash
> k6 run test/login.test.js -e BASE_URL=http://localhost:3000
> ```

### Running with Real-Time Dashboard and Report Export

You can enable k6's dashboard mode and export the report at the end of the test:

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=html-report.html \
k6 run test/login.test.js \
-e BASE_URL=http://localhost:3000
```

After execution, the report will be saved as `html-report.html`.
