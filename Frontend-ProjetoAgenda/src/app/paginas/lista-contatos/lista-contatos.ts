import { Component, OnInit } from '@angular/core';
import { Container } from '../../componentes/container/container';
import { Cabecalho } from '../../componentes/cabecalho/cabecalho';
import { Separador } from '../../componentes/separador/separador';
import { ContatoComponent } from '../../componentes/contato/contato';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato-service';
import { Contato } from '../../interfaces/contato';

@Component({
  selector: 'app-lista-contatos',
  imports: [
    Container,
    Cabecalho,
    Separador,
    ContatoComponent,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './lista-contatos.html',
  styleUrl: './lista-contatos.css',
})
export class ListaContatos implements OnInit {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  alfabetoFiltrado = this.alfabeto;
  contatos: Contato[] = [];
  filtroPorTexto = '';

  constructor(private contatoService: ContatoService) {}

  public ngOnInit(): void {
    this.contatoService.obterContatos().subscribe(listaContatos => {
      this.contatos = listaContatos;
    });
  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    if (!this.contatos) return [];
    return this.contatos.filter((contato) =>
      contato.nome.toLocaleLowerCase().startsWith(letra),
    );
  }
}
