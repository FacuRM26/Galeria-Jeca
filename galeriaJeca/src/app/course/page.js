// pages/course.js
"use client"

import Link from 'next/link';
import SingletonDAO from '../../../Backend/DAO/singletonDAO';
import "./course.css"
import React, { useState, useEffect } from 'react';

//courses= SingletonDAO.listaCursos


function Course() {
    const [cursos, setCursos] = useState([]);

    useEffect(() => {
      // Obtener la lista de cursos al cargar el componente
      setCursos(SingletonDAO.getCursos());
    }, []);
    function handleDelete(id) {
            if (window.confirm("¿Desea eliminar la publicación?")) {
              // Lógica para eliminar el curso con el identificador 'id'
              SingletonDAO.deleteCurso(id);
              // Actualizar el estado para reflejar los cambios
              setCursos(SingletonDAO.getCursos());
            }
        }
    return (
        <div className="courseContainer">    
            <h2>
            <p style={{ fontSize: '2rem', marginBottom: '1.5rem', marginTop: '5rem' }}>
                Cursos Disponibles:
            </p>
            </h2>

            <table className="courseTable">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Fecha de inicio</th>
                        <th>Horario</th>
                        <th>Etiquetas</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {SingletonDAO.listaCursos.map((course, index) => (
                        <tr key={index}>
                            <td>{course.name}</td>
                            <td>{course.desc}</td>
                            <td>{course.price}</td>
                            <td>{course.date_begin}</td>
                            <td>{course.schedule}</td>
                            <td>{course.tags}</td>
                            <td>{course.state}</td>
                            <td>
                                <div className="actionButtons">
                                <Link href={`/admin?id=${course.id}`}>
                                    <button className="editButton" style={{ padding: '5px 10px' }}>✎</button>
                                </Link> 
                                <button
                                    className="deleteButton"
                                    style={{ padding: '5px 10px' }}
                                    onClick={() => handleDelete(course.id)}
                                >
                                    ×
                                </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Course;
