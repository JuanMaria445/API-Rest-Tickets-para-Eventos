<h1>
  Sistema de reserva Tickets para Eventos

  ![TicketsWhoNeedsTicketsGIF](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/0710124e-e7fe-4753-8f7b-13484ed68e82)

<h1>

  
<h4>
Esta Api es para manejar la gestion de los usuarios, los eventos a los cuales podrán reservar sus tickets para verlo los usuarios. Y la gestión para las reservas que hacen los usuarios para ver un evento,  como la fecha en la que lo quieren ver, el lugar, etc.
</h4>

<h3>
  Entidades que manejaremos:
</h3>

![image](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/3a9ef810-8de6-49ed-9421-85f9f5b4f292)


<h2>
  Instalacion de las librerías que se usarán en la api
  
  ![AlwaysKeepAFullBookcaseGIF](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/932aa86b-8e46-42ec-89b4-fb4ca30d810e)


</h2>


<p>
  Para las librerías copiamos la siguiente línea y la ejecutamos en la terminal:

  
 npm install express typescript -D ts-node-dev -D morgan cors @types/morgan typeorm reflect-metadata @types/node --save-dev mysql --save --save jsonwebtoken bcrypt passport-jwt -D @types/passport @types/passport-jwt @types/jsonwebtoken @types/bcrypt @types/express
</p>

<h2>
Instalación de la Base de Datos
</h2>
<p>
Deberemos bajar Docker-Desktop desde su página web: https://docs.docker.com/desktop/

![image](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/bc51bd69-f0df-4e2b-a587-6377585e4841)

Y si vemos al final de la página dice install Docker Desktop, allí seleccionaremos según el Sistema Operativo que estemos usando.

![image](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/167c5f70-6181-407c-a55c-2303105b635a)

Una vez instalado lo procederemos a abrir.

Ahora nos movemos a la carpeta mysql usando:

cd docker-compose/mysql

Una vez posicionados allí ejecutamos lo siguiente:

docker-compose up -d

**Aviso!**

![WarningAlarmGIF](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/fcfa16b2-f524-4348-b5cc-f328de676fe8)


Si ya se tiene una base de datos en el puerto 3306:3306 pueden llegarse a perder los datos anteriormente cargados si hay coincidencias con los nombres de las Entidades usadas en esta Api. Al momento que se proceda a ejecutar el programa.
</p>
<h3>
Ejecución del sistema

![ComputerOnWarriorsSongGIF](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/18c0005e-389c-4113-9e0b-672eeddad7c2)

  
</h3>
<p>
Se debe ejecutar en la terminal del proyecto el siguiente comando:
  
npm run dev
</p>

<h4>
Gracias por usar la Api!
  Que tengas un lindo dia :D
</h4>

😊😁👍![MuaKissGIF](https://github.com/JuanMaria445/Api-Rest-de-Tickets-para-Eventos/assets/69771376/a8eae7bb-975a-4c8a-9b40-7fef7592a643)

