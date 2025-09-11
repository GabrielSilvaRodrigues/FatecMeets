#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Instalar JDK 17 e utilitários
if ! command -v javac >/dev/null 2>&1; then
  sudo apt-get update && sudo apt-get install -y openjdk-17-jdk
fi
# Definir JAVA_HOME para Java 17
if [ -d "/usr/lib/jvm/java-17-openjdk-amd64" ]; then
  export JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
else
  JAVA_HOME_CANDIDATE=$(dirname "$(dirname "$(readlink -f "$(command -v javac)")")")
  export JAVA_HOME="$JAVA_HOME_CANDIDATE"
fi
export PATH="$JAVA_HOME/bin:$PATH"

# Utilitários
if ! command -v unzip >/dev/null 2>&1; then
  sudo apt-get update && sudo apt-get install -y unzip
fi
if ! command -v wget >/dev/null 2>&1; then
  sudo apt-get update && sudo apt-get install -y wget
fi

# Configurar Android SDK (Command-line Tools) sob $ANDROID_HOME
export ANDROID_HOME="$HOME/Android/sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
mkdir -p "$ANDROID_HOME"

CMDLINE_DIR="$ANDROID_HOME/cmdline-tools/latest"
if [ ! -x "$CMDLINE_DIR/bin/sdkmanager" ]; then
  TMP="$(mktemp -d)"
  pushd "$TMP" >/dev/null
  wget -O cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
  mkdir -p "$ANDROID_HOME/cmdline-tools"
  unzip -q cmdline-tools.zip -d "$ANDROID_HOME/cmdline-tools"
  mv "$ANDROID_HOME/cmdline-tools/cmdline-tools" "$CMDLINE_DIR"
  popd >/dev/null
fi
export PATH="$PATH:$ANDROID_HOME/platform-tools:$CMDLINE_DIR/bin"

# Aceitar licenças e instalar pacotes necessários
yes | sdkmanager --sdk_root="$ANDROID_HOME" --licenses >/dev/null || true
sdkmanager --sdk_root="$ANDROID_HOME" "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Garantir diretório android gerado pelo prebuild (se necessário)
if [ ! -d android ]; then
  npx expo prebuild -p android --non-interactive || true
fi

# Escrever local.properties com caminho absoluto do SDK
mkdir -p android
cat > android/local.properties <<EOF
sdk.dir=$ANDROID_HOME
EOF

cd android
chmod +x ./gradlew
./gradlew --version
./gradlew assembleDebug

APK_PATH="$ROOT/android/app/build/outputs/apk/debug/app-debug.apk"
echo "APK gerado: $APK_PATH"