
## Server-vox
This is the backend for with the following requirements.

##### 1. Importación de data.

##### PROBLEMA:

El siguiente archivo .csv ([resource_accommodation.csv](https://kb.voxdatacomm.com/attachments/14)) contiene una serie de datos relacionados con el comercio inmobiliario. Ejemplo (Dirección del apartamento/piso, Metros cuadrados, Características, entre otros) que deben residir en una tabla en base de datos MySQL.

##### REQUERIMIENTO:

El objetivo principal es crear un API endpoint en NodeJS el cual sea capaz de leer el archivo .csv e importar la data a la tabla de la base de datos.

BONO EXTRA: Proteja el endpoint utilizando JWT

#### 2. Filtrar data.

##### PROBLEMA:

Basado en el ejercicio #1 ya tenemos una base de datos funcional. Ahora necesitamos poder filtrar la data.

##### REQUERIMIENTO:

Se requiere un endpoint método GET el cual permita pasar atributos para poder filtrar el resultado de la data por:

1.  Rango de precio mínimo y máximo.
2.  Número de habitaciones.

BONO EXTRA: Proteja el endpoint utilizando JWT

#### 3. Procesar data.

##### PROBLEMA:

En algunos casos necesitamos saber el precio del alquiler por zona. Para ello necesitamos procesar la información de nuestra base de datos.

##### REQUERIMIENTO:

Se necesita endpoint método GET en el cual se pasen 3 atributos (Latitud, Longitud, Distancia en Kms = X), y esta retorne el precio promedio del metro cuadrado dentro de un radio de X kilómetros de la latitud y longitud indicados. Ver imagen:

[![image-1682011511136.png](https://kb.voxdatacomm.com/uploads/images/gallery/2023-04/scaled-1680-/image-1682011511136.png)](https://kb.voxdatacomm.com/uploads/images/gallery/2023-04/image-1682011511136.png)

BONO EXTRA: Provea un endpoint GET el cual utilice los mismos parámetros del ejercicio, pero devuelva una lista de las propiedades en formato JSON, que se encuentren dentro del área establecida.

#### 4. Reportes.

##### PROBLEMA:

En ocasiones se necesita generar reportes para el área administrativa.

##### REQUERIMIENTO:

Se requiere un endpoint al cual se pasen los atributos de filtro, coordenadas y tipo de reporte (PDF, CSV) y dicho reporte generado se guarde en una carpeta.
  

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
 - Still needs to improve the error messages handling.
