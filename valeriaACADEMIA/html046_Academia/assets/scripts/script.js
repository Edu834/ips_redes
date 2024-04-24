//let as_cur_id = null;

function fInicio(){
    fGeneraCombo("#as_curso", "as_cur_id");
    fGeneraCombo("#al_curso", "al_cur_id");
}
function fMostrarForm(formulario){
   // Ocultar todos los formularios
   let formularios = document.querySelectorAll("#div_modal > div");
   formularios.forEach(item => {
       item.style.display = 'none';
   });
   
    // Mostrar el que quiero
    document.querySelector(formulario).style.display = 'block';
        
    // Mostrar la modal
    document.querySelector("#div_modal").style.display = 'flex';
}

function fOCultarModal(){

    document.querySelector("#div_modal").style.display = 'none';

}
function fMostrarCursos(){
    // Sacar clientes en el section
    let URL = 'assets/php/servidor.php?peticion=CargarCursos';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Cursos", data);    
            let html = "<h2> ";
            html += "CURSOS (";
            // span es un elemento de linea que no rompe bloques
            //i no admite onclick
            //span si adite onclick 
            html +=`<span title="añadir cursos" onclick="fPrepararFormCurso('a',0,'')">`;
            html += `<i class="fas fa-plus" title="Añadir"></i>`;
            html += "</span> )";
            html += "</h2>";
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            html += "   <th>ID</th>";
            html += "   <th>Nombre</th>"; 
            html += "   <th>Acciones</th>";            
            html += "</tr>";
            // Datos
            data.datos.forEach(item => {
                html+= "<tr>";                
                html+= `    <td>${item.cur_id}</td>`;                
                html+= `    <td>${item.cur_nombre}</td>`;          
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormCurso('e', ${item.cur_id} , '${item.cur_nombre}')">`;
                html+= `                <i class="fas fa-trash" title="Borrar ${item.cur_nombre}"></i>`;
                html+= "            </div>";                
                html+= `               <div onclick="fPrepararFormCurso('m', ${item.cur_id} , '${item.cur_nombre}')">`;
                html+= `                <i class="fas fa-edit" title="Modificar ${item.cur_nombre}"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })

        
       
}
// tengo que recibir que operacion quiero hacer y el id excepto en la alta que no necesito un id 
function fPrepararFormCurso(operacion, id , nombre){
    // aqui estoy guradando el id afuera en el index en donde lo necesito cur_id
document.querySelector("#cur_id").value = id;
 // inner porque es parrafo y estoy limpinado el campo por si tiene algo escrito 
document.querySelector("#cur_error").innerHTML = "";
document.querySelector("#cur_nombre").value=nombre;

if(operacion == 'a'){
    document.querySelector("#cur_nombre").innerHTML = "";

    document.querySelector("#boton_curso_grabar").style.display = 'block';
    document.querySelector("#boton_curso_eliminar").style.display = 'none';
    document.querySelector("#boton_curso_modificar").style.display = 'none';


}

if(operacion == 'e'){
    document.querySelector("#cur_nombre").innerHTML = "";

    document.querySelector("#boton_curso_grabar").style.display = 'none';
    document.querySelector("#boton_curso_eliminar").style.display = 'block';
    document.querySelector("#boton_curso_modificar").style.display = 'none';


}

if(operacion == 'm'){
    document.querySelector("#cur_nombre").innerHTML = "";

    document.querySelector("#boton_curso_grabar").style.display = 'none';
    document.querySelector("#boton_curso_eliminar").style.display = 'none';
    document.querySelector("#boton_curso_modificar").style.display = 'block';


}

    fMostrarForm("#div_form_cursos");

}

function fCursosCRUD(operacion){
    // como es imput necesito usar el value para coger su contenido 
let id = document.querySelector("#cur_id").value;
let nombre = document.querySelector("#cur_nombre").value;
let devolucion = "";
let sql = "";

if(operacion == 'a'){
sql = `INSERT INTO cursos VALUES (null,'${nombre}')`;
devolucion = "i";
}
if(operacion == 'e'){
    sql = `DELETE FROM cursos WHERE cur_id =${id}`;
    
    }
    if(operacion == 'm'){
        sql = `UPDATE cursos SET cur_nombre = '${nombre}' WHERE cur_id =${id}`; 
        
        }

        console.log(sql);

        let URL = 'assets/php/servidor.php?peticion=EjecutarCRUD';
        URL += "&sql=" + sql;
        URL += "&devolucion="  + devolucion;
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                console.log("crud cursos ", data); 
                
 


            })

            .finally( ()=>{
                fGeneraCombo("#as_curso");
                fGeneraCombo("#al_curso");
                fOCultarModal();
                fMostrarCursos();


            });
}

function fMostrarAlumnos(){
    let URL = 'assets/php/servidor.php?peticion=CargarAlumnos';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Alumnos", data);    
            let html = "<h2>";
            html += "ALUMNOS (";
            html +=`<span title="añadir alumnos" onclick="fPrepararFormAlumnos('a',0,'','',0)">`;
            html += `<i class="fas fa-plus" title="Añadir"></i>`;
            html += "</span> )";
            html += "</h2>"
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            html += "   <th>CURSO</th>";
            html += "   <th>ID</th>";
            html += "   <th>Nombre</th>"; 
            html += "   <th>Apellidos</th>"; 
            html += "   <th>Acciones</th>";            
            html += "</tr>";
            // Datos
            data.datos.forEach(item => {
                html+= "<tr>";      
                if (item.al_id == null) item.al_id = ""; 
                if (item.al_nombre == null) item.al_nombre = "";
                if (item.al_apellidos == null) item.al_apellidos = "";                
                html+= `    <td>${item.cur_nombre}</td>`;     
                html+= `    <td>${item.al_id}</td>`;            
                html+= `    <td>${item.al_nombre}</td>`;
                html+= `    <td>${item.al_apellidos}</td>`;
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormAlumnos('e',${item.al_id},'${item.al_nombre}','${item.al_apellidos}',${item.al_cur_id})">`;
                html+= `                <i class="fas fa-trash" title="Borrar"></i>`;
                html+= "            </div>";                
                html+= `            <div onclick="fPrepararFormAlumnos('m',${item.al_id},'${item.al_nombre}','${item.al_apellidos}',${item.al_cur_id})">`;
                html+= `                <i class="fas fa-edit"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })
}

function fPrepararFormAlumnos(operacion, id , nombre, apellido ,curso){
    // aqui estoy guradando el id afuera en el index en donde lo necesito cur_id
document.querySelector("#al_id").value = id;
 // inner porque es parrafo y estoy limpinado el campo por si tiene algo escrito 
document.querySelector("#al_error").innerHTML = "";
document.querySelector("#al_nombre").value=nombre;
document.querySelector("#al_apellido").value=apellido;
document.querySelector("#al_cur_id").value=curso;
// DEJAR EL CURSO CORRECTO
//document.querySelector("#as_cur_id").selectedValue =curso;
//selectedvalue,selected index, selected




console.log("viendo el id del as curso id",curso);

if(operacion == 'a'){
    document.querySelector("#al_nombre").innerHTML = "";
    document.querySelector("#al_apellido").innerHTML = "";

    document.querySelector("#boton_Alumno_grabar").style.display = 'block';
    document.querySelector("#boton_Alumno_eliminar").style.display = 'none';
    document.querySelector("#boton_Alumno_modificar").style.display = 'none';


}

if(operacion == 'e'){
    document.querySelector("#al_nombre").innerHTML = ""
    document.querySelector("#al_apellido").innerHTML = "";

    document.querySelector("#boton_Alumno_grabar").style.display = 'none';
    document.querySelector("#boton_Alumno_eliminar").style.display = 'block';
    document.querySelector("#boton_Alumno_modificar").style.display = 'none';


}

if(operacion == 'm'){
    document.querySelector("#al_nombre").innerHTML = "";
    document.querySelector("#al_apellido").innerHTML = "";

    document.querySelector("#boton_Alumno_grabar"    ).style.display = 'none';
    document.querySelector("#boton_Alumno_eliminar"  ).style.display = 'none';
    document.querySelector("#boton_Alumno_modificar" ).style.display = 'block';


}

    fMostrarForm("#div_form_alumnos");

}

function fAlumnoCRUD(operacion){
    // como es imput necesito usar el value para coger su contenido 
let id = document.querySelector("#al_id").value;
let nombre = document.querySelector("#al_nombre").value;
let apellido = document.querySelector("#al_apellido").value;
let al_cur_id = document.querySelector("#al_cur_id").value; 

let devolucion = "";
let sql = "";

if(operacion == 'a'){
sql = `INSERT INTO alumnos VALUES (null,'${nombre}','${apellido}', ${al_cur_id})`;
devolucion = "i";
}
if(operacion == 'e'){
    sql = `DELETE FROM alumnos WHERE al_id=${id}`;
    
    }
    if(operacion == 'm'){
        sql = `UPDATE alumnos SET al_nombre = '${nombre}' , 
                                    al_apellidos = '${apellido}',
                                       al_cur_id = ${al_cur_id} 
                                       WHERE al_id =${id} `; 
        
        }

        console.log(sql);

        let URL = 'assets/php/servidor.php?peticion=EjecutarCRUD';
        URL += "&sql=" + sql;
        URL += "&devolucion="  + devolucion;
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                console.log("crud alumnos ", data); 

            })

            .finally( ()=>{
                
                fOCultarModal();
                fMostrarAlumnos();
                fGeneraCombo("#as_curso", "as_cur_id");
                fGeneraCombo("#al_curso", "al_cur_id");

            });
}

function fMostrarAsignaturas(){
    let URL = 'assets/php/servidor.php?peticion=CargarAsignaturas';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Asignaturas", data);    
            // `as_id`, `as_nombre`, `as_cur_id`

            let html = "<h2> ";
            html += "Asignaturas (";
            // span es un elemento de linea que no rompe bloques
            //i no admite onclick
            //span si adite onclick 
            html +=`<span title="añadir asignaturas" onclick="fPrepararFormAsignaturas('a',0,'',0)">`;
            html += `<i class="fas fa-plus" title="Añadir"></i>`;
            html += "</span> )";
            html += "</h2>";
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            html += "   <th>CURSO</th>";
            html += "   <th>ID</th>";
            html += "   <th>Nombre</th>"; 
            html += "   <th>Acciones</th>";            
            html += "</tr>";
            // Datos
            data.datos.forEach(item => {
                html+= "<tr>";    
                if (item.as_id == null) {
                    item.as_id = '';
                }
                if (item.as_nombre == null) {
                    item.as_nombre = '';
                }               
                html+= `    <td>${item.cur_nombre}</td>`; 
                html+= `    <td>${item.as_id}</td>`;           
                html+= `    <td>${item.as_nombre}</td>`;
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormAsignaturas('e', ${item.as_id},'${item.as_nombre}',${item.as_cur_id})">`;
                html+= `                <i class="fas fa-trash" title="Borrar"></i>`;
                html+= "            </div>";                
                html+= `            <div onclick="fPrepararFormAsignaturas('m', ${item.as_id} , '${item.as_nombre}',${item.as_cur_id})">`;
                html+= `                <i class="fas fa-edit" title="modificar"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })

        
}



function fPrepararFormAsignaturas(operacion, id , nombre, curso){
    // aqui estoy guradando el id afuera en el index en donde lo necesito cur_id
document.querySelector("#as_id").value = id;
 // inner porque es parrafo y estoy limpinado el campo por si tiene algo escrito 
document.querySelector("#as_error").innerHTML = "";
document.querySelector("#as_nombre").value=nombre;
document.querySelector("#as_cur_id").value=curso;
// DEJAR EL CURSO CORRECTO
//document.querySelector("#as_cur_id").selectedValue =curso;
//selectedvalue,selected index, selected




console.log("viendo el id del as curso id",curso);

if(operacion == 'a'){
    document.querySelector("#as_nombre").innerHTML = "";

    document.querySelector("#boton_Asignaturas_grabar").style.display = 'block';
    document.querySelector("#boton_Asignaturas_eliminar").style.display = 'none';
    document.querySelector("#boton_Asignaturas_modificar").style.display = 'none';


}

if(operacion == 'e'){
    document.querySelector("#as_nombre").innerHTML = "";

    document.querySelector("#boton_Asignaturas_grabar").style.display = 'none';
    document.querySelector("#boton_Asignaturas_eliminar").style.display = 'block';
    document.querySelector("#boton_Asignaturas_modificar").style.display = 'none';


}

if(operacion == 'm'){
    document.querySelector("#as_nombre").innerHTML = "";

    document.querySelector("#boton_Asignaturas_grabar").style.display = 'none';
    document.querySelector("#boton_Asignaturas_eliminar").style.display = 'none';
    document.querySelector("#boton_Asignaturas_modificar").style.display = 'block';


}

    fMostrarForm("#div_form_asignaturas");

}

function fAsignaturasCRUD(operacion){
    // como es imput necesito usar el value para coger su contenido 
let id = document.querySelector("#as_id").value;
let nombre = document.querySelector("#as_nombre").value;
let as_cur_id = document.querySelector("#as_cur_id").value; 

let devolucion = "";
let sql = "";

if(operacion == 'a'){
sql = `INSERT INTO asignaturas VALUES (null,'${nombre}',${as_cur_id})`;
devolucion = "i";
}
if(operacion == 'e'){
    sql = `DELETE FROM asignaturas WHERE as_id =${id}`;
    
    }
    if(operacion == 'm'){
        sql = `UPDATE asignaturas SET as_nombre = '${nombre}' , 
                                       as_cur_id = ${as_cur_id} 
                                       WHERE as_id =${id} `; 
        
        }

        console.log(sql);

        let URL = 'assets/php/servidor.php?peticion=EjecutarCRUD';
        URL += "&sql=" + sql;
        URL += "&devolucion="  + devolucion;
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                console.log("crud asiganaturas ", data); 
                
 


            })

            .finally( ()=>{
                fGeneraCombo("#as_curso", "as_cur_id");
                fGeneraCombo("#al_curso", "al_cur_id");
                fOCultarModal();
                fMostrarAsignaturas();

            });
}
function fGeneraCombo(donde , con_que_nombre){
    // Generar combo de cursos DONDE tú digas
    let URL = 'assets/php/servidor.php?peticion=CargarCursos';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("Cursos", data); 
            //dentro de esa variable me llega con que id quiere que se llame
            let html = `<select name='sel_cursos' id='${con_que_nombre}'>`;
            for (i=0; i<data.datos.length; i++) {
                    html += `<option value="${data.datos[i].cur_id}">${data.datos[i].cur_nombre}</option>`;
                   
            };
            html+="</select>";
            document.querySelector(donde).innerHTML = html;
            
        })
        .finally(function () {
        })
}

/* 




1- creamos formularios dentro de la modal 
para mostrar un formulario , dime el nombre
ocultar todos 
mostrar el que me digas 
mostrar la modal 

2- para cada tabla de la base de datos hemos creado funciones de mostrar
para cada registro puedo modificar o eliminar luego CRUD create read update delete 

3- CUANDO PULSAN EN UN + ,          sacar formulario de alta y preparar los botones correspodientes 
4- CUANDO PULSAN EN UN modificar ,  sacar formulario de modificacion y preparar los botones correspodientes
5- CUANDO PULSAN EN UN - ,          sacar formulario de eliminar  y preparar los botones correspodientes

6- los botones llaman a una funcion crud 
    que genera los sqls oportunos y los ejecuta 
    cuando acabe , oculto pantalla y refresco pantalla= recargar registro 

*/

// function fCombo(){
//     let valor = document.querySelector("#lista_cursos").value;
//     let posicion = document.querySelector("#lista_cursos").selectedIndex;
//     console.log (valor, posicion);
// }