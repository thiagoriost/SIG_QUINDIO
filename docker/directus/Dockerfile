FROM node:18-bullseye

WORKDIR /app

# Dependencias necesarias para Oracle driver
RUN apt-get update && apt-get install -y \
    libaio1 \
    ca-certificates \
    python3 \
    make \
    g++ \
    netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

# Inicializar proyecto
RUN npm init -y

# Instalar Directus9 fork + driver Oracle
RUN npm install @wbce-d9/directus9@10.3.15 oracledb

# Copiar archivos públicos (favicon u otros overrides)
COPY directus/extensions/public /app/public

EXPOSE 8055

CMD ["npx","directus","start"]