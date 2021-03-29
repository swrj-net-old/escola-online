import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cidade',
        loadChildren: () => import('./cidade/cidade.module').then(m => m.EscolaOnlineCidadeModule),
      },
      {
        path: 'escola',
        loadChildren: () => import('./escola/escola.module').then(m => m.EscolaOnlineEscolaModule),
      },
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.EscolaOnlinePessoaModule),
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
        path: 'serie',
        loadChildren: () => import('./serie/serie.module').then(m => m.EscolaOnlineSerieModule),
      },
      {
        path: 'materia',
        loadChildren: () => import('./materia/materia.module').then(m => m.EscolaOnlineMateriaModule),
      },
      {
        path: 'grade',
        loadChildren: () => import('./grade/grade.module').then(m => m.EscolaOnlineGradeModule),
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
        path: 'chamada',
        loadChildren: () => import('./chamada/chamada.module').then(m => m.EscolaOnlineChamadaModule),
      },
      {
        path: 'conteudo',
        loadChildren: () => import('./conteudo/conteudo.module').then(m => m.EscolaOnlineConteudoModule),
      },
      {
        path: 'aluno',
        loadChildren: () => import('./aluno/aluno.module').then(m => m.EscolaOnlineAlunoModule),
      },
      {
        path: 'matricula',
        loadChildren: () => import('./matricula/matricula.module').then(m => m.EscolaOnlineMatriculaModule),
      },
      {
        path: 'debito',
        loadChildren: () => import('./debito/debito.module').then(m => m.EscolaOnlineDebitoModule),
      },
      {
        path: 'historico-debito',
        loadChildren: () => import('./historico-debito/historico-debito.module').then(m => m.EscolaOnlineHistoricoDebitoModule),
      },
      {
        path: 'detalhe-usuario',
        loadChildren: () => import('./detalhe-usuario/detalhe-usuario.module').then(m => m.EscolaOnlineDetalheUsuarioModule),
      },
      {
        path: 'tipo-solicitacao',
        loadChildren: () => import('./tipo-solicitacao/tipo-solicitacao.module').then(m => m.EscolaOnlineTipoSolicitacaoModule),
      },
      {
        path: 'solicitacao',
        loadChildren: () => import('./solicitacao/solicitacao.module').then(m => m.EscolaOnlineSolicitacaoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EscolaOnlineEntityModule {}
