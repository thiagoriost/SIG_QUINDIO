# SIG QUINDÍO – CMS Directus

Sistema de gestión de contenidos basado en **Directus** para la administración de información del proyecto **SIG Quindío**.

El sistema permite gestionar:

- Mapoteca
- Archivos
- Configuración del visor geográfico
- Información alfanumérica asociada a capas SIG

El CMS se conecta a una base de datos **Oracle** y se despliega mediante **Docker**.

---

# Arquitectura del sistema

El sistema utiliza una arquitectura basada en contenedores:

```
Usuario
   ↓
NGINX (Reverse Proxy)
   ↓
DIRECTUS (CMS Headless)
   ↓
ORACLE DATABASE
```

Componentes principales:

- **NGINX**: Proxy inverso que expone el sistema por HTTP/HTTPS.
- **Directus**: CMS headless utilizado para la gestión de contenido.
- **Oracle Database**: Base de datos donde se almacenan los datos del sistema.
- **Docker**: Orquestación de contenedores.

---

# Estructura del proyecto

```
sig_quindio_2026
│
├── README.md
│
├── directus
│   ├── extensions
│   │   ├── displays
│   │   ├── endpoints
│   │   ├── hooks
│   │   ├── interfaces
│   │   ├── layouts
│   │   ├── modules
│   │   ├── operations
│   │   └── panels
│   │
│   └── uploads
│
└── docker
    ├── docker-compose.yml
    ├── .env
    │
    ├── directus
    │   └── Dockerfile
    │
    └── nginx
        └── nginx.conf
```

Descripción de carpetas:

| Carpeta | Descripción |
|-------|-------------|
| `directus/extensions` | Extensiones personalizadas del CMS |
| `directus/uploads` | Archivos subidos al sistema |
| `docker` | Infraestructura Docker |
| `docker/nginx` | Configuración de Nginx |
| `docker/directus` | Dockerfile de Directus |

---

# Requisitos

Para ejecutar el proyecto se requiere:

- Docker
- Docker Compose
- Acceso a una base de datos Oracle

---

# Configuración

Las variables de entorno se encuentran en:

```
docker/.env
```

Ejemplo de configuración:

```
# ===== DIRECTUS =====

KEY=
SECRET=

ADMIN_EMAIL=
ADMIN_PASSWORD=

PUBLIC_URL=http://localhost


# ===== ORACLE =====

DB_CLIENT=oracledb

DB_HOST=
DB_PORT=
DB_SERVICE=

DB_USER=
DB_PASSWORD=*****

# ===== CONEXION =====

DB_CONNECT_STRING=xxx.xxx.xx:1521/SIGQUINDIO
```

---

# Levantar el sistema

Desde la carpeta `docker` ejecutar:

```
docker compose up -d --build
```

Verificar contenedores:

```
docker compose ps
```

Ver logs del sistema:

```
docker compose logs -f
```

---

# Acceso al sistema

Una vez levantado el sistema, el CMS estará disponible en:

```
http://localhost
```

Credenciales iniciales:

```
Usuario: admin@sigquindio.dip.co
Contraseña: Admin12345!
```

---

# Extensiones Directus

Las extensiones del sistema se encuentran en:

```
directus/extensions
```

Tipos de extensiones soportadas:

- Hooks
- Endpoints
- Interfaces
- Módulos
- Layouts
- Panels
- Displays
- Operations

Estas extensiones permiten personalizar el comportamiento del CMS y agregar lógica específica del proyecto.

---

# Personalización del sistema

El sistema permite personalizar:

- Colores institucionales
- Logos
- Favicon
- Pantalla de inicio de sesión
- Hooks personalizados
- Endpoints personalizados

Las personalizaciones se encuentran principalmente en:

```
directus/extensions
```

---

# Despliegue en servidor sin internet

Para desplegar el sistema en un servidor sin acceso a internet se deben seguir los siguientes pasos:

### 1. Construir la imagen Docker

```
docker compose build
```

### 2. Exportar la imagen

```
docker save -o directus-sigquindio.tar sig_quindio_2026-directus
```

### 3. Copiar archivos al servidor

Copiar al servidor:

```
docker/
directus/
directus-sigquindio.tar
```

### 4. Importar imagen en el servidor

```
docker load -i directus-sigquindio.tar
```

### 5. Levantar el sistema

Desde la carpeta `docker`:

```
docker compose up -d
```

---

# Integración con visor geográfico

El CMS está preparado para integrarse con visores SIG como:

- ArcGIS Experience Builder

El CMS permite gestionar:

- Capas
- Metadatos
- Archivos asociados
- Configuración del visor

---

# Autor

Proyecto desarrollado para:

**Corpotación Autónoma regional del Quindio - Instituto Geográfico Agustín Codazzi – IGAC**

Proyecto:

**Sistema de Información Geográfica del Quindío**