import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './cidade.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CidadeUpdate = (props: ICidadeUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { cidadeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/cidade' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...cidadeEntity,
        ...values,
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
          <h2 id="escolaOnlineApp.cidade.home.createOrEditLabel" data-cy="CidadeCreateUpdateHeading">
            <Translate contentKey="escolaOnlineApp.cidade.home.createOrEditLabel">Create or edit a Cidade</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : cidadeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cidade-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="cidade-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="cidade-nome">
                  <Translate contentKey="escolaOnlineApp.cidade.nome">Nome</Translate>
                </Label>
                <AvField id="cidade-nome" data-cy="nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="ufLabel" for="cidade-uf">
                  <Translate contentKey="escolaOnlineApp.cidade.uf">Uf</Translate>
                </Label>
                <AvInput
                  id="cidade-uf"
                  data-cy="uf"
                  type="select"
                  className="form-control"
                  name="uf"
                  value={(!isNew && cidadeEntity.uf) || 'AC'}
                >
                  <option value="AC">{translate('escolaOnlineApp.UF.AC')}</option>
                  <option value="AL">{translate('escolaOnlineApp.UF.AL')}</option>
                  <option value="AP">{translate('escolaOnlineApp.UF.AP')}</option>
                  <option value="AM">{translate('escolaOnlineApp.UF.AM')}</option>
                  <option value="BA">{translate('escolaOnlineApp.UF.BA')}</option>
                  <option value="CE">{translate('escolaOnlineApp.UF.CE')}</option>
                  <option value="DF">{translate('escolaOnlineApp.UF.DF')}</option>
                  <option value="ES">{translate('escolaOnlineApp.UF.ES')}</option>
                  <option value="GO">{translate('escolaOnlineApp.UF.GO')}</option>
                  <option value="MA">{translate('escolaOnlineApp.UF.MA')}</option>
                  <option value="MT">{translate('escolaOnlineApp.UF.MT')}</option>
                  <option value="MS">{translate('escolaOnlineApp.UF.MS')}</option>
                  <option value="MG">{translate('escolaOnlineApp.UF.MG')}</option>
                  <option value="PA">{translate('escolaOnlineApp.UF.PA')}</option>
                  <option value="PB">{translate('escolaOnlineApp.UF.PB')}</option>
                  <option value="PR">{translate('escolaOnlineApp.UF.PR')}</option>
                  <option value="PE">{translate('escolaOnlineApp.UF.PE')}</option>
                  <option value="PI">{translate('escolaOnlineApp.UF.PI')}</option>
                  <option value="RJ">{translate('escolaOnlineApp.UF.RJ')}</option>
                  <option value="RN">{translate('escolaOnlineApp.UF.RN')}</option>
                  <option value="RS">{translate('escolaOnlineApp.UF.RS')}</option>
                  <option value="RO">{translate('escolaOnlineApp.UF.RO')}</option>
                  <option value="RR">{translate('escolaOnlineApp.UF.RR')}</option>
                  <option value="SC">{translate('escolaOnlineApp.UF.SC')}</option>
                  <option value="SP">{translate('escolaOnlineApp.UF.SP')}</option>
                  <option value="SE">{translate('escolaOnlineApp.UF.SE')}</option>
                  <option value="TO">{translate('escolaOnlineApp.UF.TO')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/cidade" replace color="info">
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
  cidadeEntity: storeState.cidade.entity,
  loading: storeState.cidade.loading,
  updating: storeState.cidade.updating,
  updateSuccess: storeState.cidade.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidadeUpdate);
