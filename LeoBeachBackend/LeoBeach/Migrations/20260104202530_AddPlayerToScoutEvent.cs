using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeoBeach.Migrations
{
    /// <inheritdoc />
    public partial class AddPlayerToScoutEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PlayerId",
                table: "ScoutEvents",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "BirthDate",
                table: "Players",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.CreateIndex(
                name: "IX_ScoutEvents_PlayerId",
                table: "ScoutEvents",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScoutEvents_Players_PlayerId",
                table: "ScoutEvents",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScoutEvents_Players_PlayerId",
                table: "ScoutEvents");

            migrationBuilder.DropIndex(
                name: "IX_ScoutEvents_PlayerId",
                table: "ScoutEvents");

            migrationBuilder.DropColumn(
                name: "PlayerId",
                table: "ScoutEvents");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "BirthDate",
                table: "Players",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldNullable: true);
        }
    }
}
