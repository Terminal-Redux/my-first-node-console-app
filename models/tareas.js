const Tarea = require("./tarea");

/**
 * _listado:
 * {'uuid-ej': {id: 12, desc: asdadaudafif, completadoEn: 399343} },
 */
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

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => (this._listado[tarea.id] = tarea));
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      console.log(
        `${("" + (i + 1) + ".").green} ${tarea.desc} :: ${
          tarea.completadoEn !== null ? "Completada".green : "Pendiente".red
        }`
      );
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let tareas = this.listadoArr.filter(
      (tarea) => (tarea.completadoEn !== null) === completadas
    );
    tareas.forEach((tarea, i) => {
      console.log(
        `${("" + (i + 1) + ".").green} ${tarea.desc} :: ${
          completadas ? (tarea.completadoEn + "").green : "Pendiente".red
        }`
      );
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id];
        tarea.completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
