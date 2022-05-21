using AppContato.Models;
using System.Collections.Generic;

namespace AppContato.Repositorio
{
    public interface IContatoRepositorio
    {
        ContatoModel Adicionar(ContatoModel contato);

        ContatoModel Alterar(ContatoModel contato);

        ContatoModel Excluir(ContatoModel contato);

        List<ContatoModel> BuscarContato();


        EmailContatoModel AdicionarEmail(EmailContatoModel emailContato);

        List<ContatoModel> BuscarContatoFiltro(ContatoModel contato);

        ContatoModel BuscarContatoId(int id);        

        List<EmailContatoModel> BuscarListaEmail(int IdContato);

        List<ContatoModel> BucarPorEmail(EmailContatoModel emailContato);

        EmailContatoModel ExcluirEmail(EmailContatoModel emailContato);

        void ExcluirEmailPorId(int id);


    }
}
