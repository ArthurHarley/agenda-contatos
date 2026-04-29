import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-novo-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './novo-contato.html',
  styleUrl: './novo-contato.css',
})
export class NovoContato {

  formAluno: FormGroup;
  indexEdicao: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    // FORMULÁRIO
    this.formAluno = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
    });

    // VERIFICAR SE É EDIÇÃO
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParams.subscribe(params => {

        if (params['index'] !== undefined) {
          this.indexEdicao = +params['index'];

          const contatos = JSON.parse(localStorage.getItem('contatos') || '[]');
          const contato = contatos[this.indexEdicao];

          if (contato) {
            this.formAluno.patchValue(contato);
          }
        }

      });
    }
  }

  cadastrar() {
    if (this.formAluno.valid) {

      if (isPlatformBrowser(this.platformId)) {

        const contatos = JSON.parse(localStorage.getItem('contatos') || '[]');

        if (this.indexEdicao !== null) {
          // ✏️ EDITAR
          contatos[this.indexEdicao] = this.formAluno.value;
        } else {
          // ➕ NOVO
          contatos.push(this.formAluno.value);
        }

        localStorage.setItem('contatos', JSON.stringify(contatos));
      }

      // VOLTA PRA LISTA
      this.router.navigate(['/registros']);
    }
  }

}