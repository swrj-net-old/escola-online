package com.swrj.net.escolaonline.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.swrj.net.escolaonline.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ChamadaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Chamada.class);
        Chamada chamada1 = new Chamada();
        chamada1.setId(1L);
        Chamada chamada2 = new Chamada();
        chamada2.setId(chamada1.getId());
        assertThat(chamada1).isEqualTo(chamada2);
        chamada2.setId(2L);
        assertThat(chamada1).isNotEqualTo(chamada2);
        chamada1.setId(null);
        assertThat(chamada1).isNotEqualTo(chamada2);
    }
}
