
## Server-vox
This is the backend for with the following requirements.
##### 1. Autenticación de Usuarios

##### PROBLEMA:

Se debe contar con una tabla en la base de datos con los usuarios y contraseñas para autenticación del uso de la GUI.

##### REQUERIMIENTO:

Crear una tabla con los usuarios y sus respectivas contraseñas y hacer una página de inicio de sesión para proteger todas las páginas subsiguientes en la GUI.

##### 2. Despliegue de GUI

##### REQUERIMIENTO:

Crear una GUI en donde el usuario que inició sesión exitosa pueda realizar las siguientes tareas:

-   Cargar un archivo .csv para alimentar la lista de propiedades
-   Ver una lista completa de propiedades y filtrarlas basado en los siguientes campos:
    -   Cantidad de habitaciones
    -   Rango de precio (mínimo y máximo)
    -   Ubicación basada en rangos de kilómetros de un punto de referencia (zona perimetral)
    -   Metraje de la propiedad
    -   Posee balcón
    -   Pet friendly
    -   Piscina
    -   Jardin
-   Descargar un CSV o PDF con los resultados aplicados en el filtro
  

## Getting Started

Before running this repo you need to:
1. Install MYSQL Workbench. Run MYSQL Locally to Support Database.
2. Run setup files for MYSQL in directory database/setup.

Documentation of API using postman https://documenter.getpostman.com/view/23584524/2s93Y3wMXm

To run the development server do the following:

yarn install
yarn start

The api is running in localhost:3001
```
Important: This repo is the API for client of [https://github.com/sorozcov/client-vox](https://github.com/sorozcov/client-vox) 
You need to run this repo too.
```

  
## TODO

 - Still needs to improve the pdf generation report.
