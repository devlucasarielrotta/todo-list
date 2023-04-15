import colors from 'colors'
import {inquirerMenu,pausa,leerInput,menuBorrar,confirmar,completarTareas} from './helpers/inquirer.js'
import { guardarDB,leerDB } from './helpers/guardarArchivo.js';
import {Tareas} from './models/tareas.js';

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    
    const tareasDB =  await leerDB();
    
    if(tareasDB){
        
        tareas.cargarTareasFromArray(tareasDB);
      
    }
    
    do {
       
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                const desc = await leerInput('Ingrese la descripcion de la tarea:\n ');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await completarTareas(tareas.listadoArr)
                if(!ids.includes('0')){
                    tareas.toggleCompletadas(ids);
                }
                
            break;

            case '6':
                const id = await menuBorrar(tareas.listadoArr);
                
                if(id !== '0'){
                    const confirm = await confirmar('¿Desea eliminar esta tarea?')
                    if(confirm){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.green)
                        
                    }
                }
               
            break;

            case '7':
               
                const confirm = await confirmar ('¿Desea eliminar todas las tareas ?')
                if(confirm){
                    tareas.borrarTodo();
                    console.log('Tarea borradas'.green)
                    
                }

            break;
        }

        await guardarDB(tareas.listadoArr);

        if(opt !== '0' ) await pausa()

       
       
    }while(opt !== '0')
    
    
}

main();