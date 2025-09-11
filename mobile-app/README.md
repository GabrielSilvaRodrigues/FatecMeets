FatecMeets Mobile (Android/iOS)

Pré-requisitos:
- Node 18+ e npm ou pnpm
- Android Studio ou Xcode (para build nativo opcional)

Como rodar:
1) cd mobile-app
2) copie .env.example para .env e ajuste EXPO_PUBLIC_API_BASE_URL
   - Em emulador Android, use http://10.0.2.2:3000 para acessar o localhost da máquina
   - Em dispositivo físico, use o IP da máquina na mesma rede (ex: http://192.168.0.X:3000)
3) npm install
4) npx expo start
   - Pressione "a" para abrir no Android, "i" no iOS

Endpoints esperados:
- POST /auth/login -> { token, user }
- GET /auth/me -> { user }
- GET /meetings -> [] ou { meetings: [] }
- GET /meetings/:id -> { ...meeting }

Variáveis de ambiente:
- EXPO_PUBLIC_API_BASE_URL: base da API (lida no runtime)
