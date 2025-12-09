import { useState, useEffect } from "react";
import * as API from './services/data.js';
import { Link } from "react-router-dom";
import { Box, TableRoot, TableHeader, TableBody, TableRow, TableColumnHeader, TableCell, TableScrollArea, useToken } from '@chakra-ui/react';
import { FaEdit } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export function StudentList() {

    let usuario = sessionStorage.getItem('usuario');

    const [students, setStudents] = useState([])

    const [stripedColor, hoverColor] = useToken('colors', ['teal.50', 'teal.100']);

    useEffect(() => {
        if (!usuario) return;
        API.getStudents(usuario)
            .then(setStudents)
            .catch(err => console.error('getStudents error', err));
    }, [usuario]);

    function deleteStudent(id) {
        API.deleteStudent(id).then(result => {
            if (result == "true") {
                Swal.fire({
                    title: "Estudiante eliminado con exito",
                    text: "El estudiante ha sido eliminado correctamente",
                    icon: "success"
                });
                setStudents(students.filter(student => student.id !== id));
            }
            else {
                Swal.fire({
                    title: "Estudiante eliminado con exito",
                    text: "Error al eliminar el estudiante",
                    icon: "error"
                });
            }
        });
    }

    return (
        <>
            <Box m='50px'>
                <TableScrollArea>
                    <TableRoot native size='md' variant='striped' colorScheme='teal'
                        css={{
                            '& tbody tr:nth-of-type(odd)': { backgroundColor: stripedColor || '#E6FFFA' },
                            '& tbody tr:hover': { backgroundColor: hoverColor || '#B2F5EA', transition: 'background-color 150ms' }
                        }}
                    >
                        <TableHeader>
                            <TableRow>
                                <TableColumnHeader>ID</TableColumnHeader>
                                <TableColumnHeader>DNI</TableColumnHeader>
                                <TableColumnHeader>Nombre</TableColumnHeader>
                                <TableColumnHeader>Direccion</TableColumnHeader>
                                <TableColumnHeader>Edad</TableColumnHeader>
                                <TableColumnHeader>Email</TableColumnHeader>
                                <TableColumnHeader>Asignatura</TableColumnHeader>
                                <TableColumnHeader></TableColumnHeader>
                                <TableColumnHeader></TableColumnHeader>
                                <TableColumnHeader></TableColumnHeader>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                students?.map(student => (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.id}</TableCell>
                                        <TableCell>{student.dni}</TableCell>
                                        <TableCell>{student.nombre}</TableCell>
                                        <TableCell>{student.direccion}</TableCell>
                                        <TableCell>{student.edad}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{student.asignatura}</TableCell>
                                        <TableCell><Link to={'/student/' + student.id}><FaEdit /></Link></TableCell>
                                        <TableCell><Link to={'/student/califications/' + student.matriculaId}><FaBook /></Link></TableCell>
                                        <TableCell cursor="pointer" onClick={() => deleteStudent(student.id)}><FaRegTrashAlt /></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </TableRoot>
                </TableScrollArea>
            </Box>
        </>
    )
}