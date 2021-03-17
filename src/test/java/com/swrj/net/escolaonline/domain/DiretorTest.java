package com.swrj.net.escolaonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.swrj.net.escolaonline.web.rest.TestUtil;

public class DiretorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Diretor.class);
        Diretor diretor1 = new Diretor();
        diretor1.setId(1L);
        Diretor diretor2 = new Diretor();
        diretor2.setId(diretor1.getId());
        assertThat(diretor1).isEqualTo(diretor2);
        diretor2.setId(2L);
        assertThat(diretor1).isNotEqualTo(diretor2);
        diretor1.setId(null);
        assertThat(diretor1).isNotEqualTo(diretor2);
    }
}
