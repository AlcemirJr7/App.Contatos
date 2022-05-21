using AppContato.Models;
using AppContato.Repositorio;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace AppContato.Controllers
{
    public class ContatoController : Controller
    {

        private readonly IContatoRepositorio _contatoRepositorio;
        public ContatoController(IContatoRepositorio contatoRepositorio)
        {
            _contatoRepositorio = contatoRepositorio;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Cadastrar()
        {
            ContatoModel contatoModel = new ContatoModel()
            {
                Id = 0,
                Empresa = "",
                Name = "",
                TelefoneComercial = "",
                TelefonePessoal = ""
            }; 

            return View(contatoModel);
        }
        
        [HttpPost]
        public JsonResult Alterar([FromBody] ContatoModel contato)
        {
            ContatoModel contatoAlterado = new ContatoModel();

            contatoAlterado = _contatoRepositorio.Alterar(contato);

            return Json(contato.Id);
        }
        

        public IActionResult Excluir()
        {
            return View();
        }

        public IActionResult Consultar()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ConsultarContato([FromBody] ContatoModel contato)
        {
            List<ContatoModel> contatos = _contatoRepositorio.BuscarContatoFiltro(contato);
            return Json(contatos);
        }

        [HttpPost]
        public JsonResult ConsultarListaEmails([FromBody] int IdContato)
        {
            List<EmailContatoModel> listaEmail = _contatoRepositorio.BuscarListaEmail(IdContato);
            return Json(listaEmail);
        }


        public ActionResult _ListaEmail()
        {
            return PartialView();
        }

      
        [HttpPost]
        public JsonResult CadastrarContato([FromBody] ContatoModel contato)
        {
            _contatoRepositorio.Adicionar(contato);
            return Json(contato.Id);
        }

        [HttpPost]
        public JsonResult EditarContato([FromBody] ContatoModel contato)
        {
            _contatoRepositorio.Adicionar(contato);
            return Json(contato.Id);
        }

        [HttpPost]
        public JsonResult ExcluirContato([FromBody] ContatoModel contato)
        {
            _contatoRepositorio.Excluir(contato);
            return Json(contato.Id);
        }

        [HttpPost]
        public JsonResult ConsultarPorEmail([FromBody] EmailContatoModel email)
        {
            List<ContatoModel> contatos = _contatoRepositorio.BucarPorEmail(email);

            return Json(contatos);
        }

        

        [HttpPost]
        public IActionResult ExcluirListaEmail([FromBody] ListaEmail listaEmail)
        {
            EmailContatoModel emailContato = new EmailContatoModel();

            for (int i = 0; i < listaEmail.ListaDeEmail.Count; i++)
            {
                emailContato.Email = listaEmail.ListaDeEmail[i];
                emailContato.Id = listaEmail.Id;
                _contatoRepositorio.ExcluirEmail(emailContato);
            }

            return RedirectToPage("Index");
        }

        [HttpPost]
        public JsonResult ExcluirListaEmailPorId([FromBody] EmailContatoModel emailContato)
        {
            _contatoRepositorio.ExcluirEmailPorId(emailContato.Id);
             
            return Json(emailContato.Id);
        }

        [HttpPost]
        public JsonResult AlterarEmailContato([FromBody] ListaEmail listaEmail)
        {
            _contatoRepositorio.ExcluirEmailPorId(listaEmail.Id);

            EmailContatoModel emailContato = new EmailContatoModel();

            for (int i = 0; i < listaEmail.ListaDeEmail.Count; i++) { 

                emailContato.Email = listaEmail.ListaDeEmail[i];
                emailContato.Id = listaEmail.Id;
            
                _contatoRepositorio.AdicionarEmail(emailContato);    
            }
            
            return Json(emailContato);
        }


        [HttpPost]
        public JsonResult CadastrarListaEmail([FromBody] ListaEmail listaEmail)
        {
            EmailContatoModel emailContato = new EmailContatoModel();    

            for (int i = 0; i < listaEmail.ListaDeEmail.Count; i++)
            {
                emailContato.Email = listaEmail.ListaDeEmail[i];
                emailContato.Id = listaEmail.Id;
                _contatoRepositorio.AdicionarEmail(emailContato);
            }
            
            return Json(listaEmail);
        }
    }
}
