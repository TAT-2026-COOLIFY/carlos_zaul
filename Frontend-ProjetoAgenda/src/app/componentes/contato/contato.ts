import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contato',
  imports: [RouterLink],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class ContatoComponent {
  @Input() id: number = 0;
  @Input() nome: string = '';
  @Input() telefone: string = '';
  @Input() avatar: string | ArrayBuffer = '';
}
