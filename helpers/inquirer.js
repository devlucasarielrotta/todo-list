import inquirer from 'inquirer';
import colors from 'colors';


const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?\n',
    choices: [{
            value:'1',
            name: `${'1'.green}. Crear Tarea`
        },{
            value:'2',
            name: `${'2'.green}. Listar tareas`
        },{
            value:'3',
            name: `${'3'.green}. Listar tareas completadas`
        },{
            value:'4',
            name: `${'4'.green}. Listar tareas pendientes`
        },{
            value:'5',
            name: `${'5'.green}. Completar tarea(s)`
        },{
            value:'6',
            name: `${'6'.green}. Borrar tarea`
        },{
            value:'7',
            name: `${'7'.green}. Borrar todas las tareas`
        },{
            value:'0',
            name: `${'0'.green}. Salir\n`
        }
    ]
}];
const inquirerMenu = async() => {
    console.clear();
    console.log('\n=========================='.green);
    console.log('    Seleccione una opción    '.brightWhite);
    console.log('==========================\n'.green);
    
    const {opcion} = await inquirer.prompt(preguntas)
    
    return opcion;
}

const pausa = async () => {
    const pregunta = [{
        type: 'input',
        name:'enter',
        message:`Presione ${'Enter'.green} para continuar...`
    }]

    const {enter} = await inquirer.prompt(pregunta);
    console.log("\n")
    return enter;
}

const leerInput = async(message) => {
    const pregunta = [{
        type:'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length === 0){
                return 'Por favor ingrese un valor'
            }

            return true;
        }
    }]

    const {desc} = await inquirer.prompt(pregunta)
    return desc;
}
const menuBorrar = async (tareas = []) => {
    const choices =  tareas.map( (tarea,index) => {
        const idx = `${index+1}`.green;

        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`
        }
    } )
    choices.unshift({
        value:'0',
        name:'0'.green + ' Cancelar'
    })
    const preguntas = [
     {
        type:'list',
        name:'id',
        message:'Borrar',
        choices: choices
     }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {
    const pregunta = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]
    
    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const completarTareas = async ( tareas = []) => {

    const choices =  tareas.map( (tarea,index) => {
        const idx = `${index+1}`.green;

        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc} :: Estado: ${tarea.completadoEn}`,
            checked: (tarea.completadoEn)  ? true : false
        }
    } )
    
    choices.unshift({
        value:'0',
        name:'0'.green + ' Cancelar'
    })

    const preguntas = [
        {
           type:'checkbox',
           name:'ids',
           message:'Seleccione su tarea por favor: ',
           choices
        }
       ]
       const {ids} = await inquirer.prompt(preguntas);
       return ids;
}

export  {
    inquirerMenu,
    pausa,
    leerInput,
    menuBorrar,
    confirmar,
    completarTareas,

}

