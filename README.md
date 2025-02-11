### Application Monitoring Tools.

This is a basic POC of implmenting app monitoring tools for (node api) using Grafana, Prometheus, Loki

## Prerequisites
- Basic knowledge of nodejs and express framework
- Basic knowledge of Docker

## Tools
  - docker run -d --name=loki -p 3100:3100 grafana/loki - visualization
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



