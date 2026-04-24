import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registros.html',
  styleUrl: './registros.css',
})
export class Registros {

  formAluno: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {
    this.formAluno = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefones: this.fb.array([
        this.criarTelefone()
      ]),
    });
  }

  cadastrar() {
    if (this.formAluno.valid) {
      this.enviado = true;
    }
  }

  criarTelefone(): FormGroup {
    return this.fb.group({
      numero: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ]
      ]
    });
  }

  get telefones(): FormArray {
    return this.formAluno.get('telefones') as FormArray;
  }

  adicionarTelefone() {
    this.telefones.push(this.criarTelefone());
  }

  removerTelefone(index: number) {
    if (this.telefones.length > 1) {
      this.telefones.removeAt(index);
    }
  }
}
