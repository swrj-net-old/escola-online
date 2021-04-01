package com.swrj.net.escolaonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.swrj.net.escolaonline.web.rest.TestUtil;

public class DebitoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Debito.class);
        Debito debito1 = new Debito();
        debito1.setId(1L);
        Debito debito2 = new Debito();
        debito2.setId(debito1.getId());
        assertThat(debito1).isEqualTo(debito2);
        debito2.setId(2L);
        assertThat(debito1).isNotEqualTo(debito2);
        debito1.setId(null);
        assertThat(debito1).isNotEqualTo(debito2);
    }
}
