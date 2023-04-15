require('colors');

const mostrarMenu = () => {
  return new Promise((resolve, reject) => {
    

    console.log('\n=========================='.green);
    console.log('    Seleccione una opción    '.green);
    console.log('==========================\n'.green);

    console.log(`${'1.'.green} Crear tarea`);
    console.log(`${'2.'.green} Listar tareas`);
    console.log(`${'3.'.green} Listar tareas completadas`);
    console.log(`${'4.'.green} Listar tareas pendientes`);
    console.log(`${'5.'.green} Completar tarea(s)`);
    console.log(`${'6.'.green} Borrar tarea`);
    console.log(`${'7.'.green} Borrar todas las tareas`);
    console.log(`${'0.'.green} Salir\n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Seleccione una opción: ', (respuesta) => {

      readline.close();
      resolve(respuesta);
    });
  });
};

const pausa = () => {

  return new Promise( resolve => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
      });
    
      readline.question(`Presione ${'Enter'.green} para continuar...`, (respuesta) => {
        
        readline.close();
        resolve();
      });
  })
  
};

module.exports = {
  mostrarMenu,
  pausa,
};
