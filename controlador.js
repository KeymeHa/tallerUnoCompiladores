const regex = /\d{4}-07-(0[1-9]|(1|2)[0-9]|3(0|1));[A-Z]{3}(\d{3}|\d{2}[A-Z]);[A-Z]+;[A-Za-z ]+;\d{2};(FATAL|NO FATAL);FEMALE/;


/* 

PENDIENTE


REQUISITOS FUNCIONALES
1) capturar el archivo ingresado al input.
2) Validar que el archivo si sea de extensión .txt
    - Mostrar mensaje cuando el archivo no sea valido.
3) Guardar el archivo en la raiz de la carpeta.
4) Abrir el archivo guardado.
5) Validar que tenga contenido el archivo.
    - Mostrar mensaje en caso que este vacio el archivo.
6) Almacenar el contenido del archivo en una variable.
7) Comparar la variable con la expresión regular.
    - Mostrar mensaje en caso de no haber encontrado al menos 1 coincidencia
8) Almacenar las coincidencias en un array.
9) recorrer el array e imprimirlo en elemento div con id preview_file.

REQUISITOS NO FUNCIONALES
1) Usar aletas suaves para los mensajes de error o advertencia.
2) Refrescar los elementos una vez se necesite mostrar la información en pantalla.

MEJORAS
1) Crear un div donde muestre un resumen de alguna información de los registros ejemplo:
    - Cantidad de registros.
    - Cantidad de victimas según el genero (MALE | FEMALE)
    - Cantidad según Vehiculo (MOTOCICLETA | AUTOMOVIL | CAMION)
    - Cantidad de Registros según el periodo.
2) Establecer un input donde seleccióne el mes a consultar.





*/