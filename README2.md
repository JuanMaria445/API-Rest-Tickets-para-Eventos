<h1>
  Sistema de reserva Tickets para Eventos
<h1>

  
<h4>
Esta api es para manejar la gestion de los usuarios, los eventos a los cuales podrán reserva su ticket para verlo los usuarios. Y la gestion para las reservas que hacen los usuarios para ver un evento,  como la fecha en la que lo quieren ver, el lugar, etc.
</h4>

<h3>
  Entidades que manejaremos:
</h3>

![image](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/3a9ef810-8de6-49ed-9421-85f9f5b4f292)


<h2>
  Instalacion del paquete node y las librerías que se usarán en el sistema
</h2>


<p>
  Instalamos en el siguiente orden lo que necesitamos para utilizar la aplicación:
  
Primero escribimos en la terminal -->  npm init. Para crear el archivo package.json.

Luego instalamos express para poder usar los endPoints -->  npm install express –save

Instalamos typescript: npm i typescript -D

Ahora creamos el tsconifg.json para compilar: npx tsc –init

Luego ejecutamos:

npx tsc   ----> compila el codigo y genera la carpeta /dist con el codigo compilado


Instalamos una dependencia que monitoreará si hay cambios en el código, para que compile actuando similarmente a nodemon: npm i ts-node-dev -D.

Es recomendable que instalemos Morgan para poder ver por la terminal las peticiones que llegan: npm i morgan cors . Cors en este caso es por si deseamos comunicarnos con un servidor externo.

Además instalamos estos modos útiles que nos ayudaran a ver los intentos de acceso en un log : npm i @types/morgan

Instalamos TypeORM para poder hacer uso de los decoradores: --> npm install typeorm –save.

Luego reflect-metada: npm install reflect-metadata –save.

Seguimos con con los typescript de node:  npm install @types/node –save-dev

Y el driver de la BD:  npm install mysql --save

Ahora para poder hacer el Login y asegurar las operaciones con cada usuario instalamos lo siguiente:

Instalamos JWT para manejar de manera mas segura nuestros endPoints:  npm install –save jsonwebtoken.

A continuación instalamos bcrypt para asegurar las contraseñas:  npm install bcrypt

Luego Passport para usar estrategias de autenticación y autorización:  npm install passport-jwt

Y los types de cada uno de estos:  npm i -D @types/passport @types/passport-jwt @types/jsonwebtoken @types/bcrypt


</p>

<h2>
Instalacion de la Base de Datos
</h2>
<p>
Deberemos bajar Docker-Desktop desde su página web: https://docs.docker.com/desktop/

![image](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/bc51bd69-f0df-4e2b-a587-6377585e4841)

Y si vemos al final de la pagina dice install Docker Desktop, allí seleccionaremos segun el Sistema Operativo que estemos usando.

![image](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/167c5f70-6181-407c-a55c-2303105b635a)

Una vez instalado lo procederemos a abrir.

**Aviso!**

Si ya se tiene una base de datos en el puerto 3306:3306 pueden llegarse a perder los datos anteriormente cargados si hay coincidencias con los nombres de las Entidades usadas en esta api. Al momento que se proceda a ejecutar el programa.
</p>
<h3>
Ejecucion
</h3>
<p>
Se debe ejecutar en la terminal del proyecto el siguiente comando:
  
npm run dev
</p>

<h4>
Gracias por usar el proyecto!
</h4>

:tw-1f60a::tw-1f60e:
