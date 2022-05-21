using AppContato.BancoDados;
using AppContato.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace AppContato.Repositorio
{
    public class ContatoRepositorio : IContatoRepositorio
    {
        private readonly BancoContext _bancoContext;

        private IConfiguration _configuration;

        public ContatoRepositorio(BancoContext banco, IConfiguration configuration)
        {
            _bancoContext = banco;
            _configuration = configuration;

        }

        public ContatoModel Adicionar(ContatoModel contato)
        {

            _bancoContext.Contatos.Add(contato);
            _bancoContext.SaveChanges();
            return contato;

        }
        
        public ContatoModel Alterar(ContatoModel contato)
        {

            _bancoContext.Contatos.Update(contato);
            _bancoContext.SaveChanges();
            return contato;

        }

        public ContatoModel Excluir(ContatoModel contato)
        {

            _bancoContext.Contatos.Remove(contato);
            _bancoContext.SaveChanges();
            return contato;

        }
        public List<ContatoModel> BuscarContato()
        {
            return _bancoContext.Contatos.ToList();

        }
        
        public List<ContatoModel> BuscarContatoFiltro(ContatoModel contato)
        {
            List<ContatoModel> contatos = _bancoContext.Contatos.Where(c => c.Name.Contains(contato.Name) &&
                                                                       c.TelefonePessoal.Contains(contato.TelefonePessoal) &&
                                                                       c.TelefoneComercial.Contains(contato.TelefoneComercial) &&
                                                                       c.Empresa.Contains(contato.Empresa)).ToList();
            return contatos;

        }

        public EmailContatoModel AdicionarEmail(EmailContatoModel emailContato)
        {
            _bancoContext.EmailContato.Add(emailContato);
            _bancoContext.SaveChanges();
            return emailContato;
        }

        public EmailContatoModel ExcluirEmail(EmailContatoModel emailContato)
        {
            _bancoContext.EmailContato.Remove(emailContato);
            _bancoContext.SaveChanges();
            return emailContato;
        }

        public List<EmailContatoModel> BuscarListaEmail(int IdContato)
        {            
            var sql = "Select Email from EmailContato where id = " + IdContato;

            var conn = new SqlConnection(_configuration.GetConnectionString("DataBase"));

            var cmd = new SqlCommand(sql, conn);

            List<EmailContatoModel> lista = new List<EmailContatoModel>();

            EmailContatoModel email = null;

            try
            {
                conn.Open();
                
                using (var reader = cmd.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    while (reader.Read())
                    {
                        email = new EmailContatoModel();
                        email.Email = (string)reader["Email"];                        
                        lista.Add(email);
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
             
            return lista;
        }

        public ContatoModel BuscarContatoId(int id)
        {
            ContatoModel contatos = _bancoContext.Contatos.Where(c => c.Id == id).FirstOrDefault();
            
            return contatos;
        }

        public void ExcluirEmailPorId(int id)
        {
            var sql = "delete from EmailContato where id = " + id;

            var conn = new SqlConnection(_configuration.GetConnectionString("DataBase"));

            var cmd = new SqlCommand(sql, conn);
                        
            try
            {
                conn.Open();
                cmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ContatoModel> BucarPorEmail(EmailContatoModel emailContato)
        {


            List<ContatoModel> contato = new List<ContatoModel>();

            List<EmailContatoModel> emailContatos = new List<EmailContatoModel>();

            ContatoModel contatoEmail = new ContatoModel();

            emailContatos = _bancoContext.EmailContato.Where(c => c.Email.Contains(emailContato.Email)).ToList();

            if(emailContato.Email != "")
            {
                for (int i = 0; i < emailContatos.Count; i++)
                {
                    contatoEmail = _bancoContext.Contatos.Where(c => c.Id == emailContatos[i].Id).FirstOrDefault();

                    contato.Add(contatoEmail);

                }
            }

            
           
            return contato;

        }
    }

}
