package com.swrj.net.escolaonline.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.swrj.net.escolaonline.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class HistoricoDebitoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoricoDebito.class);
        HistoricoDebito historicoDebito1 = new HistoricoDebito();
        historicoDebito1.setId(1L);
        HistoricoDebito historicoDebito2 = new HistoricoDebito();
        historicoDebito2.setId(historicoDebito1.getId());
        assertThat(historicoDebito1).isEqualTo(historicoDebito2);
        historicoDebito2.setId(2L);
        assertThat(historicoDebito1).isNotEqualTo(historicoDebito2);
        historicoDebito1.setId(null);
        assertThat(historicoDebito1).isNotEqualTo(historicoDebito2);
    }
}
