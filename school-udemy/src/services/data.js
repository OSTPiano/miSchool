const URL = 'https://localhost:7037/api/';

export function login(usuario, pass) {
    let datos = { usuario: usuario, pass: pass };

    return fetch(URL + 'autenticacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(data => data.text())
}

export function getStudents(usuario) {

    return fetch(URL + 'alumnosProfesor?usuario=' + usuario, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json());
}

export function createStudent(student) {

    let data = {
        dni: student.dni,
        nombre: student.nombre,
        direccion: student.direccion,
        edad: student.edad,
        email: student.email,
    };
    return fetch(URL + 'Alumno?id_asig=' + student.asignatura, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.text());
}

export function deleteStudent(id) {

    return fetch(URL + 'Alumno?id=' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.text());
}

export function getStudentDetails(id) {

    return fetch(URL + 'Alumno?id=' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json());
}

export function editStudent(student) {

    return fetch(URL + 'alumno', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
        .then(data => data.text());
}

export function getCalificaciones(id) {

    return fetch(URL + 'calificaciones?idMatricula=' + id, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(data => data.json());
}

export function createCalificacion(calificacion,id) {

    let data = {descripcion: calificacion.descripcion, nota: calificacion.nota, porcentaje: calificacion.porcentaje, matriculaId: id};

    return fetch(URL + 'calificacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.text());
}

export function deleteCalificacion(id) {

    return fetch(URL + 'calificacion?id=' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.text());
}