/**
 * Taller #1 de teoría de compiladores.
 * @author Kevin Bolaño
 * @version 1
 */

const regex_primary = /2023-07-(0[1-9]|(1|2)[0-9]|3(0|1));[A-Za-z]{3}([0-9]{3};[A-Za-zÁÉÍÓÚáéíóú]+|[0-9]{2}[A-Za-z];(M|m)(OTOCICLETA|otocicleta));[A-Za-z ÁÉÍÓÚáéíóúñÑ]+;[0-9]{2};((N|n|N)(o|O) (F|f)(ATAL|atal)|(F|f)(ATAL|atal));(F|f)(EMALE|emale)/gm;
const regex_file = /.+\.txt/;

const genders = 
{
    all: '((M|m)(ale|ALE)|(F|f)(emale|EMALE))',
    male: '(M|m)(ale|ALE)',
    female: '(F|f)(emale|EMALE)'
}

const grav = 
{
    all: '((N|n|N)(o|O) (F|f)(ATAL|atal)|(F|f)(ATAL|atal))',
    no: '(N|n|N)(o|O) (F|f)(ATAL|atal)',
    yes: '(F|f)(ATAL|atal)'
}


const formFile = document.getElementById('formFile');
const btn_upload = document.getElementById('btn_upload');
const div_content = document.getElementById('div_content');
const div_match = document.getElementById('div_match');
const select_gender = document.getElementById('select_gender');
const select_grav = document.getElementById('select_gv');
const date_filter_start = document.getElementById('date_filter_start');
const date_filter_end = document.getElementById('date_filter_end');
const btn_filter = document.getElementById('btn_filter');
const p_expression_r = document.getElementById('p_er');
p_expression_r.innerHTML = "E.R: " + regex_primary.toString();
var date_start;
var date_end; 


var math_file;
var content_file;

date_filter_start.addEventListener('change', ()=>{
    date_start = new Date(date_filter_start.value);
    date_end = new Date(date_filter_end.value); 
    validateDate()
})

date_filter_end.addEventListener('change', ()=>{
    date_start = new Date(date_filter_start.value);
    date_end = new Date(date_filter_end.value); 
    validateDate();
})

function validateDate()
{
    var sw = false;
    if(date_start > date_end)
    {
        errorAlert("La fecha Final no puede ser menor a la fecha final");
        date_filter_end.value = date_filter_start.value;
        sw = true;
    }
    if(date_end < date_start)
    {
        errorAlert("La fecha Final no puede ser menor a la fecha final");
        date_filter_start.value = date_filter_end.value;
        sw = true;
    }
    return sw;
}

btn_filter.addEventListener('click', ()=>{
    /*
        1) Tomar el valor de date start. OK
        2) Tomar el valor de date end. OK
        3) Tomar el valor de select_gender. OK
        3) Validar que date start sea menor a start. OK
        4) Validar que date start y end sean del año 2023. OK
        5) invertir los formatos de la fecha en caso que no sea Y-m-d OK
        6) Concatenar los valores date start, date end y select_gender en la expresión regular. OK
        7) Tomar el array content file y validarlo segun las fechas start y end, al igual con el género. OK
    */
    date_start = new Date(date_filter_start.value);
    date_end = new Date(date_filter_end.value); 
    var gender = select_gender.value;
    var gravity = select_grav.value;
    const date_start_formatted = date_start.toISOString().slice(0, 10); 
    const date_end_formatted = date_end.toISOString().slice(0, 10); 

    if(validateDate())
    {
        return;
    }

    if( content_file === undefined )
    {
        errorAlert("No existen datos.");
        return;
    }
    else{

        year = date_start_formatted.slice(0,5);

        //initial date
        d_in = date_start_formatted.slice(-2)//day
        m_in = date_start_formatted.slice(-5, -3)//month

        //final date
        d_out = date_end_formatted.slice(-2)//day
        m_out = date_end_formatted.slice(-5, -3)//month

        var er_completed;

        if(date_start_formatted === date_end_formatted)
        {
            er_completed = date_start_formatted;
        }
        else{
            er_completed = year+creation_ER(m_in, m_out, d_in, d_out);
        }
      
        
        //div_match.innerHTML = er_completed;

        const grav_choice = grav[gravity];

        const gender_choice = genders[gender]

        let regex_filtrer = new RegExp( er_completed+";[A-Za-z]{3}([0-9]{3};[A-Za-zÁÉÍÓÚáéíóú]+|[0-9]{2}[A-Za-z];(M|m)(OTOCICLETA|otocicleta));[A-Za-z ÁÉÍÓÚáéíóúñÑ]+;[0-9]{2};"+grav_choice+";"+gender_choice, "gm");

        let math_filter = content_file.match(regex_filtrer); 
        p_expression_r.innerHTML = "E.R: " + regex_filtrer.toString();

        if(math_filter !== null && math_filter.length > 0)
        {
            div_match.innerHTML = math_filter.map(line => `<p>${line}</p>`).join('');
        }
        else
        {
            div_match.innerHTML = "Sin datos.";
            return;
        }

    }
});

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
                    p_expression_r.innerHTML = "E.R: " + regex_primary.toString();
                }
                else
                {
                    errorAlert("No se encontraron datos.");
                    div_match.innerHTML = "Sin datos.";
                    return;
                }
            }
            else
            {
                errorAlert("No se encontraron datos.");
                div_match.innerHTML = "Sin datos.";
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

function condition_month(month_in, month_out)
{
    var m_start = parseInt(month_in);
    var m_end = parseInt(month_out);
    
    if(m_start < 1 || m_end < 1 || m_start > 12  || m_end > 12)
    {
        return "error";
    }

    dif_month = m_end - (m_start+1);

    switch(true)
    {
        case m_start   === m_end: return "a" 
        case m_start+1 === m_end && m_start !== 9: return "b"
        case m_start+1 === m_end && m_start === 9: return "c"
        case dif_month === 1 && m_start === 8: return "d"
        case dif_month === 1 && m_start === 9: return "e"
        case dif_month === 1 && m_start === 10: return "f"
        case dif_month === 1 : return "g"  
        case m_start  < 10 && m_end  <  10: return "h" 
        case m_start  < 10 && m_end === 10: return "i" 
        case m_start === 8 && m_end === 11: return "j" 
        case m_start  < 10 && m_end === 11: return "k" 
        case m_start === 9 && m_end === 12: return "l"
        case m_start  < 10 && m_start  != 9 && m_end === 12: return "m" 
        default: return "error";   
    }
}


function validateDay(fstart,fday_end,s_start,s_end, type_range = 0 )
{
    var concat_d;
    var dis_day = parseInt(fstart)+1;//distance day
    var date;
    if( fstart === fday_end )
    {
        date = `(${fstart}[${s_start}-${s_end}])`;
    }
    else if(fstart == "3")
    {
        if(type_range !== 1)
        {
            if(s_start === "0")
            {
                date = `(${fstart}[0-1])`;
            }
            else
            {
                date = `${fstart}${s_start}`;
            }
            return date;
        }
        else
        {
            if(s_start === "0")
            {
                date = `${fstart}${s_start}`;
                return date;
            }
            date = `(${fstart}[0-1])`;
        }
    }
    else
    {
        if( dis_day ===  parseInt(fday_end) )
        {
            date = `(${fstart}[${s_start}-9]|${fday_end}[0-${s_end}])`;
        }
        else
        {
            dis_day = parseInt(fstart);
            lim_dia =  parseInt(fday_end)-1;
            concat_d = `${fstart}[${s_start}-9]|`;
            var count = 0;
            if(fday_end !== "0" )
            {
                while( dis_day !== lim_dia && count < 32  )
                {
                    dis_day+=1;
                    concat_d += `${dis_day}[0-9]|`;
                    count++;
                }
                return date = `(${concat_d}${fday_end}[0-${s_end}])`;
            }
            
           date = `(${fday_end}[1-${s_end}])`;
        }
    }
    
    return date;
}

function range_month(s_startm , s_endm)
{
    var f_avan = parseInt(s_startm) ;
    var e_avan = f_avan;
    var s_endma = parseInt(s_endm);
    var sw = true;
    var count = 0;
    var concat = "";
    
    if(s_endma >= 10)
    {
        concat = `[${f_avan+1}-9]`;
    }
    else if(s_startm !== s_endma)
    {
        while(sw && count < 8)
        {
            if( (e_avan+1) !== s_endma )
            {
                e_avan=1+e_avan;
            }
            else
            {
                sw = false;
                concat = `[${f_avan+1}-${e_avan}]`;
            }
            count++;
        }
    }

    return concat;
}

function creation_ER(month_in, month_out, day_in, day_out)
{
    let op = condition_month(month_in, month_out);

    //---------------Individual values
    //f_di = first_day_in
    //s_de = second_day_in
    //days
    f_di = day_in.charAt(0);
    s_di = day_in.charAt(1);
    f_de = day_out.charAt(0);
    s_de = day_out.charAt(1);
    
    //month
    //f_mi = first_month_in
    //s_mi = second_month_in
    f_mi = month_in.charAt(0);
    s_mi = month_in.charAt(1);
    f_me = month_out.charAt(0);
    s_me = month_out.charAt(1);

    //variables
    var r_month = range_month(month_in , month_out);
    var range_days = validateDay(f_di,f_de,s_di,s_de, 1);
    var in_days = validateDay(f_di,3,s_di,1);
    var end_days = validateDay(0,f_de,1,s_de);
    var all_days = validateDay(0,3,1,1);

    console.log("op: ",op);

    let regular_expression = {
        a: `${month_in}-${range_days}`,
        b: `${f_mi}(${s_mi}-${in_days}|${s_me}-${end_days})`,
        c: `(0${s_mi}-${in_days}|${month_out}-${end_days})`,
        d: `(0(${s_mi}-${in_days}|9-${all_days})|${month_out}-${end_days})`,
        e: `(09-${in_days}|1(0-${all_days}|1-${end_days}))`,
        f: `1(0-${in_days}|1-${all_days}|2-${end_days})`,
        g: `0(${s_mi}-${in_days}|${parseInt(s_mi)+1}-${all_days}|${s_me}-${end_days})`,
        h: `0(${s_mi}-${in_days}|${r_month}-${all_days}|${s_me}-${end_days})`,
        i: `(0(${s_mi}-${in_days}|${r_month}-${all_days})|${month_out}-${end_days})`,
        j: `(0(8-${in_days}|9-${all_days})|1(0-${all_days}|1-${end_days}))`,
        k: `(0(${s_mi}-${in_days}|${r_month}-${all_days})|1(0-${all_days}|1-${end_days}))`,
        l: `(${month_in}-${in_days}|1([0-1]-${all_days}|2-${end_days}))`,
        m: `(0(${s_mi}-${in_days}|${r_month}-${all_days})|1([0-1]-${all_days}|2-${end_days}))`
    };
    return regular_expression[op];     
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
1) Usar aletas suaves para los mensajes de error o advertencia. OK
2) Refrescar los elementos una vez se necesite mostrar la información en pantalla. OK

MEJORAS
1) Crear un div donde muestre un resumen de alguna información de los registros ejemplo:
    - Cantidad de registros.
    - Cantidad de victimas según el genero (MALE | FEMALE)
    - Cantidad según Vehiculo (MOTOCICLETA | AUTOMOVIL | CAMION)
    - Cantidad de Registros según el periodo.
2) Establecer un input donde seleccióne la fecha a consultar. OK





*/