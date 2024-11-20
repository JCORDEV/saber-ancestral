# 🌿Saber ancestral
Es una plataforma web desarrollada para preservar y divulgar el conocimiento ancestral de las plantas medicinales en la región de Salahonda, Colombia. Este proyecto busca conectar generaciones mediante la digitalización de saberes, promoviendo el acceso global a sus usos, beneficios y preparaciones tradicionales.

![Portada principal](img/PortadaPrincipal.jpg)

## 📚 Tabla de contenidos
- [🎯 Objetivo](#-objetivo)
- [⚙️ Tecnologías utilizadas](#️-tecnologías-utilizadas)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [🖼️ Vista previa](#️-vista-previa)
- [🛠️ Instalación y configuración](#️-instalación-y-configuración)
- [✨ Características](#-características)
- [📌 Próximas funcionalidades](#-próximas-funcionalidades)
- [🖋️ Créditos](#️-créditos)

## 🎯 Objetivo

- `Preservar el conocimiento ancestral:` Documentar los usos y beneficios de las plantas medicinales de Salahonda.
- `Facilitar el acceso:` Proveer una plataforma amigable para consultar información sobre plantas, expertos y métodos de preparación.
- `Promover la colaboración:` Fomentar el aprendizaje y la participación activa de la comunidad local.

## ⚙️ Tecnologías utilizadas

### **Backend**
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize%20(ORM%20para%20base%20de%20datos)-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT%20(Autenticación)-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FE8A71?style=for-the-badge&logo=files&logoColor=white)
![Dotenv](https://img.shields.io/badge/Dotenv-22313F?style=for-the-badge&logo=dotenv&logoColor=white)

### **Frontend**
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) <br/>
`Diseño` centrado en la experiencia del usuario (UX/UI)

## 🖼️ Vista previa

![Home](img/home.png)
![Explorar plantas](img/explorar-plantas.png)
![Expertos](img/expertos.png)
![Login](img/login.png)
![CRUD](img/crud.png)

## 🛠️ Instalación y configuración

1. Clona el repositorio:
   
    ```bash
    git clone https://github.com/JCORDEV/saber-ancestral.git
    ```

2. Accede al proyecto:
   
    ```bash
    cd saber-ancestral
    ```


3. Instala las dependencias:
    
    ```bash
    npm install
    ```

4. Configura las variables en el archivo `config/config.json` del backend:

    
    ```json
    {
        "development": {
            "username": "usuario",
            "password": "contraseña",
            "database": "base-de-datos",
            "host": "127.0.0.1",
            "dialect": "postgres"
        },
        "test": {
            "username": "usuario",
            "password": "contraseña",
            "database": "base-de-datos",
            "host": "127.0.0.1",
            "dialect": "postgres"
        },
        "production": {
            "username": "usuario",
            "password": "contraseña",
            "database": "base-de-datos",
            "host": "127.0.0.1",
            "dialect": "postgres"
        }
    }
    ```

5. Inicia el servidor:
   
    ```bash
    nodemon
    ```

## ✨ Características
- 📖`Base de datos`: Información detallada sobre plantas medicinales.
- ⚙️`CRUD`: Gestión completa de información de plantas y curanderos.
- 💻📱`Multiplataforma`: Compatible con dispositivos móviles y de escritorio.

## 📌 Próximas funcionalidades
- 🗺️`Mapa interactivo`: Para ubicar plantas medicinales y expertos locales.
- 🌐`Integración con API`: Obtener información adicional de plantas en tiempo real.
- 🔒`Mejoras en autenticación`: Proteger datos sensibles y garantizar la privacidad.

## 🖋️ Créditos
Proyecto desarrollado por **[JCORDEV](https://github.com/JCORDEV)**.