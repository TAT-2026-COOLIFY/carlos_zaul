import { Component, OnInit } from '@angular/core';
import { Container } from '../../componentes/container/container';
import { Separador } from '../../componentes/separador/separador';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato-service';
import { MensagemErro } from '../../componentes/mensagem-erro/mensagem-erro';

@Component({
  selector: 'app-formulario-contato',
  imports: [
    Container,
    Separador,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MensagemErro
],
  templateUrl: './formulario-contato.html',
  styleUrl: './formulario-contato.css',
})
export class FormularioContato implements OnInit {
  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarContato();
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      avatar: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl(''),
    });
  }

  carregarContato() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe(contato => {
        this.contatoForm.patchValue(contato);
      });
    }
  }

  obterControle(nome: string): FormControl {
    const control = this.contatoForm.get(nome);
    if (!control) {
      throw new Error('Controle de formulário não encontrado: ' + nome);
    }
    return control as FormControl;
  }

  salvarContato() {
    const novoContato = this.contatoForm.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    novoContato.id = id ? parseInt(id) : null;
    this.contatoService.editarOuSalvarContato(novoContato).subscribe(() => {
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  aoSelecionarArquivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const arquivo = input.files[0];
      this.lerArquivo(arquivo);
    }
  }

  lerArquivo(arquivo: File) {
    const leitor = new FileReader();
    leitor.onload = () => {
      if (leitor.result) {
        this.contatoForm.get('avatar')?.setValue(leitor.result);
      }
    };
    leitor.readAsDataURL(arquivo);
  }

  public cancelar(): void {
    this.contatoForm.reset();
  }
}
