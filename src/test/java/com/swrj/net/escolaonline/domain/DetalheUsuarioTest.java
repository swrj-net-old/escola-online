package com.swrj.net.escolaonline.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.swrj.net.escolaonline.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DetalheUsuarioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetalheUsuario.class);
        DetalheUsuario detalheUsuario1 = new DetalheUsuario();
        detalheUsuario1.setId(1L);
        DetalheUsuario detalheUsuario2 = new DetalheUsuario();
        detalheUsuario2.setId(detalheUsuario1.getId());
        assertThat(detalheUsuario1).isEqualTo(detalheUsuario2);
        detalheUsuario2.setId(2L);
        assertThat(detalheUsuario1).isNotEqualTo(detalheUsuario2);
        detalheUsuario1.setId(null);
        assertThat(detalheUsuario1).isNotEqualTo(detalheUsuario2);
    }
}
