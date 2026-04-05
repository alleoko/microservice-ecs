# webapp – API Gateway

Node.js gateway service that proxies requests to all microservices.

## Port: 3000

## Routes
| Route | Proxies To |
|---|---|
| /api/auth/* | users-api |
| /api/users/* | users-api |
| /api/patients/* | patient-api |
| /api/facilities/* | facility-api |
| /api/guarantors/* | guarantor-api |
| /api/inventory/* | inventory-api |
| /api/reports/* | reports-api |

## Local Setup
```bash
cp .env.example .env
npm install
npm run dev
```
