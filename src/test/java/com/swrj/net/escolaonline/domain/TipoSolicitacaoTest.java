package com.swrj.net.escolaonline.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.swrj.net.escolaonline.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TipoSolicitacaoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoSolicitacao.class);
        TipoSolicitacao tipoSolicitacao1 = new TipoSolicitacao();
        tipoSolicitacao1.setId(1L);
        TipoSolicitacao tipoSolicitacao2 = new TipoSolicitacao();
        tipoSolicitacao2.setId(tipoSolicitacao1.getId());
        assertThat(tipoSolicitacao1).isEqualTo(tipoSolicitacao2);
        tipoSolicitacao2.setId(2L);
        assertThat(tipoSolicitacao1).isNotEqualTo(tipoSolicitacao2);
        tipoSolicitacao1.setId(null);
        assertThat(tipoSolicitacao1).isNotEqualTo(tipoSolicitacao2);
    }
}
