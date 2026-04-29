import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registros.html',
  styleUrl: './registros.css',
})
export class Registros {

  contatos: any[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.carregarContatos();
  }

  carregarContatos() {
    if (isPlatformBrowser(this.platformId)) {
      const dados = localStorage.getItem('contatos');
      this.contatos = dados ? JSON.parse(dados) : [];
    }
  }

  editar(index: number) {
    this.router.navigate(['/novo-contato'], {
      queryParams: { index: index }
    });
  }

  confirmarRemocao(index: number) {
    const confirmacao = confirm('Tem certeza que deseja excluir este contato?');

    if (confirmacao) {
      this.remover(index);
    }
  }

  remover(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.contatos.splice(index, 1);
      localStorage.setItem('contatos', JSON.stringify(this.contatos));
    }
  }

  irParaNovo() {
    this.router.navigate(['/novo-contato']);
  }
}
