import { Header } from './Header.jsx'
import { useState } from 'react';
import * as API from './services/data.js';
import { Box, Center, Heading, Input, FieldLabel, FieldRoot, NativeSelectRoot, NativeSelectField, NativeSelectIndicator } from '@chakra-ui/react';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'


export function StudentNew() {

    const [student, setStudent] = useState({
        dni: '',
        nombre: '',
        direccion: '',
        edad: '',
        email: '',
        asignatura: '1'
    });

    function handleSubmit(e) {
        e.preventDefault();
        API.createStudent(student).then(result => {
            if (result == "true") {
                Swal.fire({
                    title: "Estudiante creado con exito",
                    text: "El estudiante ha sido creado correctamente",
                    icon: "success"
                });
                document.getElementById("formulario").reset();
            }
            else {
                Swal.fire({
                    title: "Error al crear el estudiante",
                    text: "El estudiante no pudo ser creado",
                    icon: "error"
                });
                document.getElementById("formulario").reset();
            }
        });
    }


    return (
        <>
            <Header />
            <Center>
                <Box m='50px' boxShadow='xl' borderRadius='md' width='40%' id='caja'>
                    <Box textAlign="center" >
                        <Heading>Nuevo Estudiante</Heading>
                    </Box>
                    <Box p='20px'>
                        <form id='formulario' onSubmit={handleSubmit}>
                            <FieldRoot mt='4'>
                                <FieldLabel>DNI</FieldLabel>
                                <Input type='text' id='dni' required width='100%' onChange={event => setStudent({ ...student, dni: event.target.value })} />
                            </FieldRoot>
                            <FieldRoot mt='4'>
                                <FieldLabel>Nombre</FieldLabel>
                                <Input type='text' id='nombre' required width='100%' onChange={event => setStudent({ ...student, nombre: event.target.value })} />
                            </FieldRoot>
                            <FieldRoot mt='4'>
                                <FieldLabel>Direccion</FieldLabel>
                                <Input type='text' id='direccion' required width='100%' onChange={event => setStudent({ ...student, direccion: event.target.value })} />
                            </FieldRoot>
                            <FieldRoot mt='4'>
                                <FieldLabel>Edad</FieldLabel>
                                <Input type='number' id='edad' required width='100%' onChange={event => setStudent({ ...student, edad: event.target.value })} />
                            </FieldRoot>
                            <FieldRoot mt='4'>
                                <FieldLabel>Email</FieldLabel>
                                <Input type='email' id='email' required width='100%' onChange={event => setStudent({ ...student, email: event.target.value })} />
                            </FieldRoot>
                            <FieldRoot mt='4'>
                                <FieldLabel>Asignatura</FieldLabel>
                                <NativeSelectRoot>
                                    <NativeSelectField id='asignatura' required width='100%' onChange={event => setStudent({ ...student, asignatura: event.target.value })}>
                                        <option value='1'>Matemáticas</option>
                                        <option value='2'>Informática</option>
                                        <option value='3'>Inglés</option>
                                        <option value='4'>Literatura</option>
                                    </NativeSelectField>
                                    <NativeSelectIndicator />
                                </NativeSelectRoot>
                            </FieldRoot>
                            <FieldRoot>
                                <Input type='submit' mt='4' mr='4' value='Crear estudiante' id='editar' borderColor='teal.500' />
                            </FieldRoot>
                        </form>
                    </Box>
                </Box>
            </Center>
        </>
    )
}