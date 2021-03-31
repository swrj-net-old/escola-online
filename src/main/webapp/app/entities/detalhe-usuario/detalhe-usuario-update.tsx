import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './detalhe-usuario.reducer';
import { IDetalheUsuario } from 'app/shared/model/detalhe-usuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDetalheUsuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DetalheUsuarioUpdate = (props: IDetalheUsuarioUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { detalheUsuarioEntity, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/detalhe-usuario' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...detalheUsuarioEntity,
        ...values,
        usuario: users.find(it => it.id.toString() === values.usuarioId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="escolaOnlineApp.detalheUsuario.home.createOrEditLabel" data-cy="DetalheUsuarioCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.detalheUsuario.home.createOrEditLabel">Create or edit a DetalheUsuario</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : detalheUsuarioEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="detalhe-usuario-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="detalhe-usuario-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cpfLabel" for="detalhe-usuario-cpf">
                  <Translate contentKey="escolaOnlineApp.detalheUsuario.cpf">Cpf</Translate>
                </Label>
                <AvField id="detalhe-usuario-cpf" data-cy="cpf" type="text" name="cpf" />
              </AvGroup>
              <AvGroup>
                <Label id="celularLabel" for="detalhe-usuario-celular">
                  <Translate contentKey="escolaOnlineApp.detalheUsuario.celular">Celular</Translate>
                </Label>
                <AvField id="detalhe-usuario-celular" data-cy="celular" type="text" name="celular" />
              </AvGroup>
              <AvGroup>
                <Label for="detalhe-usuario-usuario">
                  <Translate contentKey="escolaOnlineApp.detalheUsuario.usuario">Usuario</Translate>
                </Label>
                <AvInput id="detalhe-usuario-usuario" data-cy="usuario" type="select" className="form-control" name="usuarioId">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/detalhe-usuario" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  detalheUsuarioEntity: storeState.detalheUsuario.entity,
  loading: storeState.detalheUsuario.loading,
  updating: storeState.detalheUsuario.updating,
  updateSuccess: storeState.detalheUsuario.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DetalheUsuarioUpdate);
