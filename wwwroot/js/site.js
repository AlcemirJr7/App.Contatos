const { Alert } = require("../lib/bootstrap/dist/js/bootstrap");


function ExcluirContato() {
    
    var _id = $("#idExcluir",'#modalExcluir').val();
    var _nome = $("#nomeExcluir",'#modalExcluir').val();
    var _empresa = $("#empresaExcluir", '#modalExcluir').val();
    var _telefonePessoal = $("#telefonePessoalExcluir", '#modalExcluir').val();
    var _telefoneComercial = $("#telefoneComercialExcluir", '#modalExcluir').val();
    
   

    if (_nome.trim() == '') {
        return false;
    }

    var jsonContato = {
        Id : _id,
        Empresa: _empresa,
        Name: _nome,
        TelefonePessoal: _telefonePessoal,
        TelefoneComercial: _telefoneComercial
    }

    var IdContato = 0;
    $.ajax({
        type: "POST",
        url: "/Contato/ExcluirContato/",
        data: JSON.stringify(jsonContato),
        contentType: "application/json",
        dataType: "JSON",
        async: false,
        success: function (response) {
            IdContato = JSON.stringify(response);
        },
        failure: function (response) {
            alert("Falha: " + response.responseText);
        },
        error: function (response) {
            alert("Erro: " + response.responseText);
        }
    });

    var jsonListaEmail = {
        Id: _id,
        Email : null
    }

    $.ajax({
        type: "POST",
        url: "/Contato/ExcluirListaEmailPorId/",
        data: JSON.stringify(jsonListaEmail),
        contentType: "application/json",
        dataType: "JSON",
        async: true,
        success: function (response) {
            alert("Exclusão feita com sucesso!");


            const tabelaContato = document.querySelectorAll('#TabelaConsultaContato>tbody');

            for (let i = 0; i < tabelaContato.length; i++) {

                let id = tabelaContato[i].children[0].children[0].textContent;

                if (parseInt(id) == parseInt(_id)) {
                    tabelaContato[i].children[0].remove();
                }
            }
            

        },
        failure: function (response) {
            alert("Falha: " + response.responseText);
        },
        error: function (response) {
            alert("Erro: " + response.responseText);
        }
    });

                     
}

function CadastrarContato() {
    
        
    const _listaEmail = new Array();

    var _nome = $("#nome", "#frmCadastroContato").val();
    var _empresa = $("#empresa", "#frmCadastroContato").val();
    var _telefonePessoal = $("#TelefonePessoal", "#frmCadastroContato").val();
    var _telefoneComercial = $("#TelefoneComercial", "#frmCadastroContato").val();   

    if (_nome == "") {
        alert("Nome é um campo obregatório!");
        return false;
    }
    const tabela = document.querySelector('#ListaEmail>tbody');


    const listaEmail = document.querySelectorAll('#ListaEmail>tbody tr');

    for (let i = 0; i < listaEmail.length; i++) {

        let email = listaEmail[i].children[0].textContent;
        _listaEmail.push(email);
                        
    }

 
           
    var jsonContato = {

        Empresa: _empresa,
        Name: _nome,        
        TelefonePessoal: _telefonePessoal,
        TelefoneComercial: _telefoneComercial        
    }

 

    var IdContato = 0;
    $.ajax({
        type: "POST",
        url: "/Contato/CadastrarContato/",
        data: JSON.stringify(jsonContato),
        contentType: "application/json",
        dataType: "JSON",        
        async: false,
        success: function (response) {
            IdContato = JSON.stringify(response);
            
        },
        failure: function (response) {
            alert("Falha: " + response.responseText);
        },
        error: function (response) {
            alert("Erro: " + response.responseText);
        }
    });

    var jsonListaEmail = {
        Id: IdContato,
        ListaDeEmail: _listaEmail
    }

    $.ajax({
        type: "POST",
        url: "/Contato/CadastrarListaEmail/",
        data: JSON.stringify(jsonListaEmail),
        contentType: "application/json",
        dataType: "JSON",
        async: false,
        success: function (response) {
            alert("Cadastro feito com sucesso!");
        },
        failure: function (response) {
            alert("Falha: " + response.responseText);
        },
        error: function (response) {
            alert("Erro: " + response.responseText);
        }
    });


    
}

function ConsultarContato() {


    $("#TabelaConsultaContato>tbody tr").remove();

    var _nome = $("#nome", "#frmConsultaContato").val();
    var _empresa = $("#empresa", "#frmConsultaContato").val();
    var _telefonePessoal = $("#TelefonePessoal", "#frmConsultaContato").val();
    var _telefoneComercial = $("#TelefoneComercial", "#frmConsultaContato").val();
    var _email = $("#email", "#frmConsultaContato").val();


    var jsonContato = {

        Empresa: _empresa,
        Name: _nome,
        TelefonePessoal: _telefonePessoal,
        TelefoneComercial: _telefoneComercial,        
    }

    var data = {}

    $.ajax({
        type: "POST",
        url: "/Contato/ConsultarContato/",
        data: JSON.stringify(jsonContato),        
        contentType: "application/json",
        dataType: "JSON",
        async: false,
        success: function (response) {
            data = JSON.stringify(response);
            data = JSON.parse(data);
        },
        failure: function (response) {
            alert("Falha: " + response.responseText);
        },
        error: function (response) {
            alert("Erro: " + response.responseText);
        }
    });

    if (data.length > 0) {
        PopularTabelaConsulta(data);
    }

    

    var jsonEmail = {
        Email: _email
    };

    $.ajax({
        type: "POST",
        url: "/Contato/ConsultarPorEmail/",
        data: JSON.stringify(jsonEmail),
        contentType: "application/json",
        dataType: "JSON",
        async: false,
        success: function (response) {
            data = JSON.stringify(response);
            data = JSON.parse(data);
                    
        },
        failure: function (response) {
            alert("Falha: " + response.responseText);
        },
        error: function (response) {
            alert("Erro: " + response.responseText);
        }
    });

    if (data.length > 0) {
        PopularTabelaConsulta(data);
    }

    

}

function MostrarListaEmails(){
    $('#ListaModalEmails').on('shown.modal', function () {
        $('#BtEmails').trigger('focus')
    })
}

function BuscarListaEmails(id) {

     $.ajax({
        type: "POST",
        url: "/Contato/ConsultarListaEmails/",
        data: JSON.stringify(id),
        contentType: "application/json",
        dataType: "JSON",
        async: false,
         success: function (response) {
             data = response;
        },
        failure: function (response) {
            alert("Falha: " + response.responseText);
        },
        error: function (response) {
            alert("Erro: " + response.responseText);
        }
    });

    return data;

}

function EditarCadastro(idContato) {
    
    $.ajax({
        type: "GET",
        url: "/Contato/Alterar",
        data: { id: idContato },        
        success: function (response) {
            
            window.location.replace("/Contato/CadastrarEditar/" + idContato);
                                               
        }
    });

                        
}

function AlteararContato() {

    const _listaEmail = new Array();

    var _id = $("#id", '#modalAlterar').val();
    var _nome = $("#nome", '#modalAlterar').val();
    var _empresa = $("#empresa", '#modalAlterar').val();
    var _telefonePessoal = $("#telefonePessoal", '#modalAlterar').val();
    var _telefoneComercial = $("#telefoneComercial", '#modalAlterar').val();

     
    const listaEmail = document.querySelectorAll('#ListaEmail>tbody tr');

    for (let i = 0; i < listaEmail.length; i++) {

        let email = listaEmail[i].children[0].textContent;
        _listaEmail.push(email);

    }



    var jsonContato = {
        Id : _id,
        Empresa: _empresa,
        Name: _nome,
        TelefonePessoal: _telefonePessoal,
        TelefoneComercial: _telefoneComercial
    }



    var IdContato = 0;
    $.ajax({
        type: "POST",
        url: "/Contato/Alterar/",
        data: JSON.stringify(jsonContato),
        contentType: "application/json",
        dataType: "JSON",
        async: false,
        success: function (response) {
            IdContato = JSON.stringify(response);

        },
        failure: function (response) {
            alert("Falha: " + response.responseText);
        },
        error: function (response) {
            alert("Erro: " + response.responseText);
        }
    });
    

    var jsonListaEmail = {
        Id: IdContato,
        ListaDeEmail: _listaEmail
    }
    
    $.ajax({
        type: "POST",
        url: "/Contato/AlterarEmailContato/",
        data: JSON.stringify(jsonListaEmail),
        contentType: "application/json",
        dataType: "JSON",
        async: false,
        success: function (response) {
            alert("Registro alterado com sucesso!");
            window.location.replace("/Contato/Index");
        },
        failure: function (response) {
            alert("Falha: " + response.responseText);
        },
        error: function (response) {
            alert("Erro: " + response.responseText);
        }
    });

}

function PopularTabelaEmail(id) {

    $("#ListaModalEmails>tbody").empty();

    var listaEmailObj = new Object();

    listaEmail = BuscarListaEmails(id);

    listaEmail = JSON.stringify(listaEmail);
    
    listaEmailObj = JSON.parse(listaEmail);

    for (var i = 0; i < listaEmailObj.length; i++) {
        $("#ListaEmail>tbody").append("<tr><td scope='row'>" + listaEmailObj[i].email + "</td> <td class='text-center'> <button type='button' onclick='ExcluirLinha(this)' class='btn btn-danger ml-sm-1'>x</button></td></tr>");        
    }
}

function PassarDadosModalExcluir(e) {

    var id = 0;
    var nome = '';
    var empresa = '';
    var telefonePessoal = '';
    var telefoneComercial = '';

    $('#modalExcluir').on('show.bs.modal', function () {

        var linha = $(e).closest("tr");
        id = linha.find("td:eq(0)").text().trim(); 
        nome = linha.find("td:eq(1)").text().trim(); 
        empresa = linha.find("td:eq(2)").text().trim(); 
        telefonePessoal = linha.find("td:eq(3)").text().trim(); 
        telefoneComercial = linha.find("td:eq(4)").text().trim();
        

        $('#modalExcluir').find("#idExcluir").val(id);
        $('#modalExcluir').find("#nomeExcluir").val(nome);
        $('#modalExcluir').find("#empresaExcluir").val(empresa);
        $('#modalExcluir').find("#telefonePessoalExcluir").val(telefonePessoal);
        $('#modalExcluir').find("#telefoneComercialExcluir").val(telefoneComercial);
        
    });

    $('#modalExcluir').modal('show');




}

function PassarDadosModalEditar(evn) {

    var id = 0;
    var nome = '';
    var empresa = '';
    var telefonePessoal = '';
    var telefoneComercial = '';
    
    $('#modalAlterar').on('show.bs.modal', function (){
            
        var linha = $(evn).closest("tr");
        id = linha.find("td:eq(0)").text().trim(); 
        nome = linha.find("td:eq(1)").text().trim(); 
        empresa = linha.find("td:eq(2)").text().trim(); 
        telefonePessoal = linha.find("td:eq(3)").text().trim(); 
        telefoneComercial = linha.find("td:eq(4)").text().trim(); 

        $("#ListaEmail>tbody tr").remove();

        $('#modalAlterar').find("#id").val(id);
        $('#modalAlterar').find("#nome").val(nome);
        $('#modalAlterar').find("#empresa").val(empresa);
        $('#modalAlterar').find("#telefonePessoal").val(telefonePessoal);
        $('#modalAlterar').find("#telefoneComercial").val(telefoneComercial);

        PopularTabelaEmail(id);

    });

    $('#modalAlterar').modal('show');

    

                     
}

function PopularTabelaConsulta(data) {

    $("#TabelaConsultaContato>tbody").empty();

    $("#ListaModalEmails>tbody").empty();

    var contato = new Object();

    contato = data;

    

    for (var i = 0; i < contato.length; i++) {


        var rowContato = "<tr>" +
            "<td scope ='row'> " + contato[i].id + "</td> " +
            "<td scope='row'>" + contato[i].name + "</td>" +
            "<td scope='row'>" + contato[i].empresa + "</td>" +
            "<td scope='row'>" + contato[i].telefonePessoal + "</td>" +
            "<td scope='row'>" + contato[i].telefoneComercial + "</td>" +
            "<td scope='row'><button type='button' id='BtEmails' onClick='CarregarListaEmail(this)' class='btn btn-primary'>Emails</button></td>" +
            "<td scope='row'><a  role='button' onClick='PassarDadosModalEditar(this)' class='btn btn-warning' id='EditarCadastro'>Editar</a></td>" +
            "<td scope='row'> <a role='button' onClick='PassarDadosModalExcluir(this)' class='btn btn-danger'>Excluir</a></td>" +
            "</tr>";    

               
        $("#TabelaConsultaContato>tbody").append(rowContato);
        
    }

        

}


function CarregarListaEmail(e) {

    
    var objListaEmail = new Object();

    $('#ListaModalEmails').on('show.bs.modal', function () {

        $("#ListaModalEmails>tbody tr").remove();

        var linha = $(e).closest("tr");
        id = linha.find("td:eq(0)").text().trim(); // texto da primeira coluna
              
        var ListaEmail = BuscarListaEmails(id);

        ListaEmail = JSON.stringify(ListaEmail);

        objListaEmail = JSON.parse(ListaEmail);


        for (var i = 0; i < objListaEmail.length; i++) {
            var rowListaEmail = "<tr>" +
                "<td scope ='row'> " + objListaEmail[i].email + "</td> " +
                "</tr>"
            $("#ListaModalEmails>tbody").append(rowListaEmail);
        }
        ListaEmail = "";
        objListaEmail = null;

    });

    $('#ListaModalEmails').modal('show');




}

function LimparCamposModal() {

    $('#modalAlterar').find("#id").val('');
    $('#modalAlterar').find("#nome").val('');
    $('#modalAlterar').find("#empresa").val('');
    $('#modalAlterar').find("#telefonePessoal").val('');
    $('#modalAlterar').find("#telefoneComercial").val('');
    $("#ListaEmail>tbody tr").remove();
}

function LimparCampos(){

    $("#nome", "#frmCadastroContato").val('');
    $("#empresa", "#frmCadastroContato").val('');
    $("#TelefonePessoal", "#frmCadastroContato").val('');
    $("#TelefoneComercial", "#frmCadastroContato").val('');
    $("#email", "#frmCadastroContato").val('');        
    $("#ListaEmail>tbody tr").remove();
    
}

