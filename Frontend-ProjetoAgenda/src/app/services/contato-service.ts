import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../interfaces/contato';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {

  private readonly API = 'http://172.100.122.210:8080/contatos';

  constructor(private http: HttpClient) {}

  obterContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.API);
  }

  buscarPorId(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.API}/${id}`);
  }

  salvarContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.API, contato);
  }

  editarContato(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.API}/${contato.id}`, contato);
  }

  excluirContato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  editarOuSalvarContato(contato: Contato): Observable<Contato> {
    if (contato.id) {
      return this.editarContato(contato);
    } else {
      return this.salvarContato(contato);
    }
  }
}
