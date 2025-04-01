const regex_primary = /20\d{2}-07-(0[1-9]|(1|2)[0-9]|3(0|1));[A-Z]{3}(\d{3}|\d{2}[A-Z]);[A-Z]+;[A-Za-z ]+;\d{2};(FATAL|NO FATAL);FEMALE/gm;
const regex_file = /.+\.txt/;

//      ELEMENT
const formFile = document.getElementById('formFile');
const btn_upload = document.getElementById('btn_upload');
const div_content = document.getElementById('div_content');
const div_match = document.getElementById('div_match');
const select_gender = document.getElementById('select_gender');
const date_filter_start = document.getElementById('date_filter_start');
const date_filter_end = document.getElementById('date_filter_end');

//      VARIABLES   
var math_file;
var content_file;

//      EVENTS

select_gender.addEventListener('change', () =>{
    var select = select_gender;
    errorAlert("Seleccionado "+select.value);
});


date_validate()
{
    /*
        1) Tomar el valor de date start.
        2) Tomar el valor de date end.
        3) Tomar el valor de select_gender.
        3) Validar que date start sea menor a start.
        4) Validar que date start y end sean del año 2023.
        5) invertir los formatos de la fecha en caso que no sea Y-m-d
        6) Concatenar los valores date start, date end y select_gender.
        7) Tomar el array content file y validarlo segun las fechas start y end, al igual con el género.
    
    
    */
}
 
btn_upload.addEventListener('click', () => {
    const file_upload = formFile.files[0];

    if (file_upload) {
        if (!regex_file.test(file_upload.name)) {
            errorAlert("Ingresar archivo con extensión .txt");
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const lines = e.target.result.split('\n');
            if (lines.length > 0) 
            {
                div_content.innerHTML = lines.map(line => `<p>${line}</p>`).join('');

                content_file = e.target.result;

                math_file = content_file.match(regex_primary);

                if(math_file.length > 0)
                {
                    div_match.innerHTML = math_file.map(line => `<p>${line}</p>`).join('');
                }
                else
                {
                    errorAlert("No se encontraron datos.");
                    return;
                }
            }
            else
            {
                errorAlert("No se encontraron datos.");
                return;
            }  

        };
        reader.readAsText(file_upload);
    } else {
        errorAlert("Debe adjuntar primero un archivo valido.")
    }
});


function errorAlert(title_sw)
{
    Swal.fire({
        icon: "error",
        title: title_sw,
        showConfirmButton: false,
        timer: 1500
      });
}

/* 

PENDIENTE


REQUISITOS FUNCIONALES
1) capturar el archivo ingresado al input. OK
2) Validar que el archivo si sea de extensión .txt OK
    - Mostrar mensaje cuando el archivo no sea valido. OK
3) Guardar el archivo en la raiz de la carpeta.
4) Abrir el archivo guardado. OK
5) Validar que tenga contenido el archivo. OK
    - Mostrar mensaje en caso que este vacio el archivo. OK
6) Almacenar el contenido del archivo en una variable. OK
7) Comparar la variable con la expresión regular. OK
    - Mostrar mensaje en caso de no haber encontrado al menos 1 coincidencia OK
8) Almacenar las coincidencias en un array. OK
9) recorrer el array e imprimirlo en elemento div. OK

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