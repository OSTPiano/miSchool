using AccesoDatos.Operaciones;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Modles; // Ensure this is used for AlumnoProfesor

namespace WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class AlumnoController : ControllerBase
    {
        private AlumnoDAO alumnoDAO = new AlumnoDAO();

        [HttpGet("alumnosProfesor")]
        public List<AccesoDatos.Modles.AlumnoProfesor> alumnosProfesor(string usuario)
        {
            return alumnoDAO.seleccionarAlumnosProfesor(usuario);
        }

        [HttpGet("alumno")]
        public Alumno getAlumno(int id)
        {
            return alumnoDAO.seleccionar(id);
        }

        [HttpPut("alumno")]
        public bool actualizarAlumno([FromBody]Alumno alumno)
        {
            return alumnoDAO.actualizar(alumno.Id, alumno.Dni, alumno.Nombre, alumno.Direccion, alumno.Edad, alumno.Email);
        }

        [HttpPost("alumno")]
        public bool insertarMatricula([FromBody]Alumno alumno, int id_asig)
        {
            return alumnoDAO.insertarYMatricular(alumno.Dni, alumno.Nombre, alumno.Direccion, alumno.Edad, alumno.Email, id_asig);
        }

        [HttpDelete("alumno")]
        public bool eliminarAlumno(int id)
        {
            return alumnoDAO.eliminarAlumno(id);
        }

    }

}
