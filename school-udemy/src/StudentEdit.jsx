import { useParams } from 'react-router-dom'
import { Header } from './Header.jsx'
import { useEffect, useState } from 'react';
import * as API from './services/data';
import { Box, Center, Field, FieldLabel, FieldRoot, Heading, Input } from '@chakra-ui/react';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'


export function StudentEdit() {

    let params = useParams();

    const [student, setStudent] = useState([]);

    useEffect(() => {
        API.getStudentDetails(params.studentId).then(setStudent);
    }, [params.studentId]);

    function handleSubmit(e) {
        e.preventDefault();
        API.editStudent(student).then(result => {
            if (result == "true") {
                Swal.fire({
                    title: "Estudiante editado con exito",
                    text: "El estudiante ha sido editado correctamente",
                    icon: "success"
                });
            }
            else {
                Swal.fire({
                    title: "Error al editar el estudiante",
                    text: "El estudiante no pudo ser editado",
                    icon: "error"
                });
            }
        });
    }


    return (
        <>
            <Header></Header>
            <Center>
                <Box m='50px' boxShadow='xl' borderRadius='md' width='40%' id='caja'>
                    <Box textAlign="center" >
                        <Heading>Editar Estudiante</Heading>
                    </Box>
                    <Box p='20px'>
                        <form id='formulario' onSubmit={handleSubmit}>
                            <FieldRoot mt='4'>
                                <FieldLabel>DNI</FieldLabel>
                                <Input type='text' id='dni' required disabled value={student.dni} />
                            </FieldRoot>
                            <FieldRoot mt='4'>
                                <FieldLabel>Nombre</FieldLabel>
                                <Input type='text' id='nombre' required defaultValue={student.nombre} onChange={event => setStudent({ ...student, nombre: event.target.value })} />
                            </FieldRoot>
                            <FieldRoot mt='4'>
                                <FieldLabel>Direccion</FieldLabel>
                                <Input type='text' id='direccion' required defaultValue={student.direccion} onChange={event => setStudent({ ...student, direccion: event.target.value })} />
                            </FieldRoot>
                            <FieldRoot mt='4'>
                                <FieldLabel>Edad</FieldLabel>
                                <Input type='number' id='edad' required defaultValue={student.edad} onChange={event => setStudent({ ...student, edad: event.target.value })} />
                            </FieldRoot>
                            <FieldRoot mt='4'>
                                <FieldLabel>Email</FieldLabel>
                                <Input type='email' id='email' required defaultValue={student.email} onChange={event => setStudent({ ...student, email: event.target.value })} />
                            </FieldRoot>
                            <FieldRoot >
                                <Input type='submit' mt='4' mr='4' id='editar' borderColor='teal' value='Guardar cambios' />
                            </FieldRoot>
                        </form >
                    </Box>
                </Box>
            </Center>
        </>
    )
}