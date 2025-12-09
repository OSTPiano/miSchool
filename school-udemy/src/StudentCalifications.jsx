import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import * as API from './services/data';
import { Header } from "./Header.jsx";
import { Box, Center, TableBody, TableColumnHeader, TableScrollArea, TableCell, Input, TableRoot, TableHeader, TableRow, Badge } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export function StudentCalifications() {

    let params = useParams();

    const matriculaId = params.matriculaId;

    const [calificaciones, setCalificaciones] = useState([]);

    const [calificacion, setCalificacion] = useState({});


    useEffect(() => {
        if (matriculaId) {
            API.getCalificaciones(matriculaId).then(setCalificaciones).catch(err => console.error(err));
        }
    }, [matriculaId]);

    let total = calificaciones?.reduce((acc, c) => acc + (Number(c.nota) || 0) * ((Number(c.porcentaje) || 0) / 100), 0) ?? 0;

    function createCalificacion() {

        let descrField = document.getElementById("descripcion");
        let notaField = document.getElementById("nota");
        let porcentField = document.getElementById("porcentaje");

        let valid = descrField.value.trim() !== "" && notaField.value.trim() !== "" && porcentField.value.trim() !== "";

        if (valid) {
            API.createCalificacion(calificacion, matriculaId).then(result => {
                if (result == "true") {
                    Swal.fire({
                        title: "Calificacion creada con exito",
                        text: "La calificacion ha sido creada correctamente",
                        icon: "success"
                    });
                    document.getElementById("descripcion").value = "";
                    document.getElementById("nota").value = "";
                    document.getElementById("porcentaje").value = "";
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "Error al crear la calificacion",
                        icon: "error"
                    });
                }
            });
        }
    }

    function deleteCalificacion(id) {
        API.deleteCalificacion(id).then(result => {
            if (result == "true") {
                Swal.fire({
                    title: "Calificacion eliminada con exito",
                    text: "La calificacion ha sido eliminada correctamente",
                    icon: "success"
                });
            }
            else {
                Swal.fire({
                    title: "Error",
                    text: "Error al eliminar la calificacion",
                    icon: "error"
                });
            }
        });
    }

    return (
        <>
            <Header></Header>
            <Box m='50px'>
                <TableScrollArea>
                    <TableRoot size='md'>
                        <TableHeader>
                            <TableRow>
                                <TableColumnHeader>Descripción</TableColumnHeader>
                                <TableColumnHeader>Nota</TableColumnHeader>
                                <TableColumnHeader>Ponderación</TableColumnHeader>
                                <TableColumnHeader></TableColumnHeader>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                calificaciones?.map((calificacion, index) => (
                                    <TableRow key={calificacion?.id ?? index}>
                                        <TableCell>{calificacion.descripcion}</TableCell>
                                        <TableCell>{calificacion.nota}</TableCell>
                                        <TableCell>{calificacion.porcentaje}%</TableCell>
                                        <TableCell><FaRegTrashAlt cursor='pointer' onClick={() => deleteCalificacion(calificacion.id)} /></TableCell>
                                    </TableRow>
                                ))
                            }
                            <TableRow>
                                <TableCell><Input type="text" id="descripcion" placeholder="Descripción" onChange={event => setCalificacion({ ...calificacion, descripcion: event.target.value })} /></TableCell>
                                <TableCell><Input type="number" id="nota" placeholder="Nota" onChange={event => setCalificacion({ ...calificacion, nota: event.target.value })} /></TableCell>
                                <TableCell><Input type="number" id="porcentaje" placeholder="Ponderación" onChange={event => setCalificacion({ ...calificacion, porcentaje: event.target.value })} /></TableCell>
                                <TableCell><FaCheckCircle cursor='pointer' id="nueva" onClick={() => createCalificacion()} /></TableCell>
                            </TableRow>
                        </TableBody>
                    </TableRoot>
                </TableScrollArea>
                <Center>
                    <Box mt='4' fontSize='20px' fontWeight='bold'>
                        Nota final:
                        <Badge variant='subtle' colorPalette='teal' ml='2' size='lg'>
                            {total}</Badge>
                    </Box>
                </Center>
            </Box >
        </>
    )
}