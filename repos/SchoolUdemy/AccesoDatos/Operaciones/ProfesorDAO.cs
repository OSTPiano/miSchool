using AccesoDatos.Context;
using AccesoDatos.Modles;
using System;
using System.Collections.Generic;
using System.Text;

namespace AccesoDatos.Operaciones
{
    public class ProfesorDAO
    {
        public ProyectoContext contexto = new ProyectoContext();
        
        public Profesor login(string usuario, string pass)
        {
             var prof = contexto.Profesors.Where(p => p.Usuario == usuario && p.Pass == pass).FirstOrDefault();
             return prof;
         }
     }
}

