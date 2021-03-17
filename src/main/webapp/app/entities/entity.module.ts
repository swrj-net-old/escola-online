import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.EscolaOnlinePessoaModule),
      },
      {
        path: 'escola',
        loadChildren: () => import('./escola/escola.module').then(m => m.EscolaOnlineEscolaModule),
      },
      {
        path: 'diretor',
        loadChildren: () => import('./diretor/diretor.module').then(m => m.EscolaOnlineDiretorModule),
      },
      {
        path: 'unidade',
        loadChildren: () => import('./unidade/unidade.module').then(m => m.EscolaOnlineUnidadeModule),
      },
      {
        path: 'turma',
        loadChildren: () => import('./turma/turma.module').then(m => m.EscolaOnlineTurmaModule),
      },
      {
        path: 'professor',
        loadChildren: () => import('./professor/professor.module').then(m => m.EscolaOnlineProfessorModule),
      },
      {
        path: 'aluno',
        loadChildren: () => import('./aluno/aluno.module').then(m => m.EscolaOnlineAlunoModule),
      },
      {
        path: 'matricula',
        loadChildren: () => import('./matricula/matricula.module').then(m => m.EscolaOnlineMatriculaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EscolaOnlineEntityModule {}
