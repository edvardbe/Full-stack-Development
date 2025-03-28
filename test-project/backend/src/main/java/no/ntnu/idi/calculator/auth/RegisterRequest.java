package no.ntnu.idi.calculator.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String username;

    private String password;

    public String getUsername(){
        return this.username;
    }
    public String getPassword(){
        return this.password;
    }

}
