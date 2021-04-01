package com.swrj.net.escolaonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.swrj.net.escolaonline.web.rest.TestUtil;

public class MatriculaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Matricula.class);
        Matricula matricula1 = new Matricula();
        matricula1.setId(1L);
        Matricula matricula2 = new Matricula();
        matricula2.setId(matricula1.getId());
        assertThat(matricula1).isEqualTo(matricula2);
        matricula2.setId(2L);
        assertThat(matricula1).isNotEqualTo(matricula2);
        matricula1.setId(null);
        assertThat(matricula1).isNotEqualTo(matricula2);
    }
}
