using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace AccesoDatos.Modles
{
    public class AlumnoProfesor
    {
        public int Id { get; set; } 
        public string Dni { get; set; } 
        public string Nombre { get; set; }
        public string Direccion { get; set; } 
        public int Edad { get; set; }
        public string Email { get; set; } 
        public string Asignatura { get; set; }

        public int MatriculaId { get; set; }
    }
}
