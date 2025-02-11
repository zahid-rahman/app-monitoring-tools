# Application Monitoring Tools (PLG stack)

This is a basic POC of implmenting app monitoring tools for (node api) using Grafana, Prometheus, Loki (PLG stack)

## Prerequisites
- Basic knowledge of nodejs and express framework
- Basic knowledge of Docker

## Tools
  - Grafana - visualization
  - Prometheus - Metrics
  - Loki - Log collection

## Basic setup

Installing all dependencies
```
npm i --save
```

start the project 
```
npm start
```

Start prometheus server using docker compose

```
docker compose up -d
```

Running grafana using docker
```
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
```

Running Loki using docker
```
docker run -d --name=loki -p 3100:3100 grafana/loki
```

## Final outlook
![screencapture-localhost-8000-d-PTSqcpJWk-nodejs-application-dashboard-2025-02-11-18_37_21](https://github.com/user-attachments/assets/4b3a795c-c1cf-48e5-91d5-128a81415a68)


