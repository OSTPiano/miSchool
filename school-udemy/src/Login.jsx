import * as API from './services/data';
import imagen from './assets/DisableLoginPageIcon.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input, FieldRoot, FieldLabel, Field, Center, Image } from '@chakra-ui/react';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'



export function Login() {
  const [teacher, setTeacher] = useState({ usuario: '', password: '' });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await API.login(teacher.usuario, teacher.password);
    if (response.length != 0) {
      sessionStorage.setItem("usuario", response);
      navigate('/dashboard');
    }
    else {
      Swal.fire({
        title: "Error",
        text: "Error al realizar el login",
        icon: "error"
      });
    }
  }

  return (
    <>
      <Box mt='30'>
        <Center>
          <Image mt='4' src={imagen} boxSize='150px' objectFit='contain' alt='logo' />
        </Center>
        <Center>
          <Box m='2%' boxShadow='xl' borderRadius='md' width='40%' id='caja'>
            <Box textAlign='center' >
              <Heading>Iniciar sesion</Heading>
            </Box>
            <Box p='20px'>
              <form id='formulario' onSubmit={handleSubmit}>
                <FieldRoot mt='4'>
                  <FieldLabel>Usuario</FieldLabel>
                  <Input required type='text' id='usuario' onChange={event => setTeacher({ ...teacher, usuario: event.target.value })} />
                </FieldRoot>
                <FieldRoot mt='4'>
                  <FieldLabel>Password</FieldLabel>
                  <Input required type='password' id='pass' onChange={event => setTeacher({ ...teacher, password: event.target.value })} />
                </FieldRoot>
                <FieldRoot mt='4'>
                  <Input type='submit' mb='3' id='enviar' borderColor='teal' value='login' />
                </FieldRoot>
              </form>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  )
}