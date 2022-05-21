using Microsoft.EntityFrameworkCore.Migrations;

namespace AppContato.Migrations
{
    public partial class CriaContatos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contatos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Empresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelefonePessoal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelefoneComercial = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contatos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmailContato",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),                        
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                });
               
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contatos");

            migrationBuilder.DropTable(
                name: "EmailContato");
        }
    }
}
