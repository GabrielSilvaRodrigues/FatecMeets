# FatecMeets

## Como rodar

- Suba com Docker Compose:
  - cd FatecMeets/backend
  - docker compose up -d --build

- URLs locais:
  - App (Frontend + Backend via /api): http://localhost:8080
  - phpMyAdmin: http://localhost:8082 (Host: db, Usuário: fatec, Senha: secret)

- Codespaces (exemplo):
  - App: https://<seu-subdominio>-8080.app.github.dev/
  - Backend direto (debug): https://<seu-subdominio>-8083.app.github.dev/ (exposto temporariamente)

- Abrir no navegador do host:
  - "$BROWSER" http://localhost:8080
  - "$BROWSER" http://localhost:8082