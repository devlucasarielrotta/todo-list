import {Tarea} from './tarea.js';
import colors from 'colors';
class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log('');
    const tareas = this.listadoArr;
    tareas.forEach((tarea, index) => {
      console.log(`${colors.green(index + 1)}. ${tarea.desc}  ${'::'.brightWhite} ${tarea.completadoEn ? colors.green('Completada') : colors.red('Pendiente')}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let done = '';
    let pending = '';
    let contador = 0;

    this.listadoArr.forEach((tarea) => {
      const {desc, completadoEn} = tarea;
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
      if (completadoEn) {
        contador += 1;
        done += `${contador.toString().green}. ${desc.white} ${'::'.brightWhite} Completada el: ${completadoEn.green}\n`.brightWhite;
      } else {
        contador += 1;
        pending += `${contador.toString().green}. ${desc} ${'::'.brightWhite} ${estado}\n`;
      }
    });

    if (completadas) {
      return console.log(done);
    } else {
      return console.log(pending);
    }
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  borrarTodo() {
    this._listado = [];
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        
        let horaActual = new Date();

       
        let horaUTC = horaActual.getTime() + horaActual.getTimezoneOffset() * 60000;

        
        let horaArgentina = new Date(horaUTC + 3600000 * -3);

        tarea.completadoEn = `${horaArgentina}`;
       
      }

    });

    this.listadoArr.forEach(tarea => {
        if(!ids.includes(tarea.id)){
            const task = this._listado[tarea.id];
            task.completadoEn = null;
        }
    })
  }
}

export {Tareas};
