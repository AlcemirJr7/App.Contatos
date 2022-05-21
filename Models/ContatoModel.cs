using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AppContato.Models
{
    public class ContatoModel
    {        
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        public string Empresa { get; set; }

        public string TelefonePessoal { get; set; }

        public string TelefoneComercial { get; set; }

       
    }
}
