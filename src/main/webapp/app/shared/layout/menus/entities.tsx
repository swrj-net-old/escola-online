import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/cidade">
      <Translate contentKey="global.menu.entities.cidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/escola">
      <Translate contentKey="global.menu.entities.escola" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pessoa">
      <Translate contentKey="global.menu.entities.pessoa" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/diretor">
      <Translate contentKey="global.menu.entities.diretor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/unidade">
      <Translate contentKey="global.menu.entities.unidade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/serie">
      <Translate contentKey="global.menu.entities.serie" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/materia">
      <Translate contentKey="global.menu.entities.materia" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/grade">
      <Translate contentKey="global.menu.entities.grade" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/turma">
      <Translate contentKey="global.menu.entities.turma" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/professor">
      <Translate contentKey="global.menu.entities.professor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/chamada">
      <Translate contentKey="global.menu.entities.chamada" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/conteudo">
      <Translate contentKey="global.menu.entities.conteudo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/aluno">
      <Translate contentKey="global.menu.entities.aluno" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/matricula">
      <Translate contentKey="global.menu.entities.matricula" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/debito">
      <Translate contentKey="global.menu.entities.debito" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/historico-debito">
      <Translate contentKey="global.menu.entities.historicoDebito" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/detalhe-usuario">
      <Translate contentKey="global.menu.entities.detalheUsuario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-solicitacao">
      <Translate contentKey="global.menu.entities.tipoSolicitacao" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/solicitacao">
      <Translate contentKey="global.menu.entities.solicitacao" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
