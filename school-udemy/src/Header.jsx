import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Flex, HStack, Box, Image } from "@chakra-ui/react";
import logo from './assets/GreyLogo-removebg-preview.png';

export function Header() {

    const navigate = useNavigate();

    function cerrarSesion() {
        localStorage.removeItem("usuario");
        navigate("/");
    }

    return (
        <>
            <Flex w='100%' h='70px' bg='teal' color='white' p='10px' fontSize='20px' justifyContent='space-between' alignItems='center'>
                <HStack as='nav' spacing='24px'>
                    <Image src={logo} h='50px' objectFit='contain' alt='logo' ml='6' />
                    <Link to={'/dashboard'}><Box _hover={{ color: 'gray.300' }}>Listado</Box></Link>
                    <Link to={'/student'}><Box _hover={{ color: 'gray.300' }}>Nuevo</Box></Link>
                </HStack>
                <HStack>
                <Box mr='4' cursor='pointer' _hover={{ color: 'gray.300' }} onClick={() => cerrarSesion()}>Cerrar sesion</Box>
                </HStack>
            </Flex>
        </>
    )
}