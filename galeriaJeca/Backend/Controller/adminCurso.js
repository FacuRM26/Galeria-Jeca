import SingletonDAO from "../DAO/singletonDAO";

export class AdminCurso {  
    createCourse(name, desc, price,   date_begin, schedule, state, tags) {
        
        try {
            
        return SingletonDAO.createCurso(name, desc, price,  date_begin, schedule, state, tags);
        } catch(error) {
        console.error("Error al crear el Curso:", error);
        }
    }
    
    editCourse(id, name, desc, price, date_begin,schedule, state, tags) {
        try {
            
        return SingletonDAO.editCurso(id, name, desc, price,  date_begin, schedule, state, tags);
        } catch(error) {
        console.error("Error al editar el Curso:", error);
        }
    }

    deleteCourse(id) {
        try {
        return SingletonDAO.deleteCurso(id);
        } catch(error) {
        console.error("Error al eliminar el Curso:", error);
        }
    }

   getCursoType(id) {
        try {
        return SingletonDAO.getCursoType(id);
        } catch(error) {
        console.error("Error al obtener el tipo de Curso:", error);
        }
    }

    getCourse(id) {
        try {
        return SingletonDAO.getCurso(id);
        } catch(error) {
        console.error("Error al obtener el Curso:", error);
        }
    }

    getAllCursos() {
        try {
        return SingletonDAO.getAllCursos();
        } catch(error) {
        console.error("Error al obtener los Cursos:", error);
        }
    }
}