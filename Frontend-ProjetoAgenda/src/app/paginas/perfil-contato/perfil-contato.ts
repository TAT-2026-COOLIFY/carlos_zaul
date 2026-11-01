import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Container } from '../../componentes/container/container';
import { ContatoService } from '../../services/contato-service';
import { Contato } from '../../interfaces/contato';

@Component({
  selector: 'app-perfil-contato',
  imports: [
    Container,
    RouterLink,
  ],
  templateUrl: './perfil-contato.html',
  styleUrl: './perfil-contato.css',
})
export class PerfilContato implements OnInit {
  contato: Contato = {
    id: 0,
    nome: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: '',
    observacoes: '',
    avatar: '',
  };

  constructor(
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscarPorId(+id).subscribe(contato => {
        this.contato = contato;
      });
    }
  }

  excluir(): void {
    this.contatoService.excluirContato(this.contato.id).subscribe(() => {
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  editar(): void {
    this.router.navigate(['/formulario', this.contato.id]);
  }
}
