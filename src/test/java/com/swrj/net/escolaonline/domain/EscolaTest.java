package com.swrj.net.escolaonline.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.swrj.net.escolaonline.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EscolaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Escola.class);
        Escola escola1 = new Escola();
        escola1.setId(1L);
        Escola escola2 = new Escola();
        escola2.setId(escola1.getId());
        assertThat(escola1).isEqualTo(escola2);
        escola2.setId(2L);
        assertThat(escola1).isNotEqualTo(escola2);
        escola1.setId(null);
        assertThat(escola1).isNotEqualTo(escola2);
    }
}
