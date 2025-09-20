Descripción: Esta tarea es una API REST desarrollada con Node.js y TypeScript que se conecta a la API de [NewsAPI](https://newsapi.org/) para listar noticias y fuentes.
La aplicación maneja peticiones, las autentica con la clave API y las devuelve en formato JSON.

Las caracteristicas de la tarea:
Tiene los siguiente EndPoints
    /api/v1/news/sources (Lista de fuentes)
    /api/v1/news/top-headline` (Titulares principales)
    /api/v1/news/everything (Búsqueda general)
    
Los endpoints soportan parámetros de búsqueda como "q", "country" y "category".
Autenticación Segura: La clave de API se guarda en un archivo ".env" y así se accede de forma segura desde el código.


Tecnologías: 
Se usaron las siguientes tecnologias para desarrollar y que funcione el proyecto
- Node.js
- Express
- TypeScript
- Axios: Para las peticiones HTTP.
- Dotenv: Para gestionar las variables de entorno.
- Nodemon: para que se reinicie el servidor de forma automática con cada cambio en vez de estarlo haciendo manualmente.

Como Ejecutar el proyecto:
1.- Se debe clonar el repositorio con "git clone" y la url del repo.
2.- Se instalan las dependencias con npm install
3.- consigue tu API_KEY: "Crear una cuenta en https://newsapi.org  y generar el API KEY" esta la cambias en el archivo .env 
4.- en la raiz de tu proyecto ejecutas tu proyecto con "npm run dev"

El proyecto se encuentra en la carpeta Tarea1 de la rama main.
