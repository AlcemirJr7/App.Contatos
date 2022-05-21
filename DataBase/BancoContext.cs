using AppContato.Models;
using Microsoft.EntityFrameworkCore;

namespace AppContato.BancoDados
{
    public class BancoContext : DbContext
    {
        public BancoContext(DbContextOptions<BancoContext> options) : base(options)
        {

        }

        public DbSet<ContatoModel> Contatos { get; set; }

        public DbSet<EmailContatoModel> EmailContato { get; set; }
    }
}
