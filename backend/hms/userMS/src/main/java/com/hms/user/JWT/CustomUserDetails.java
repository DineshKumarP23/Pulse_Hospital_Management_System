package com.hms.user.JWT;

import com.hms.user.dto.Roles;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Roles role;
    private String name;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Long id, @NotBlank(message = "Email is mandatory") @Email(message = "Email should be valid") String email, @NotBlank(message = "Password is mandatory") @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_]).+$", message = "Password should contain atleast 1 Uppercase, 1 Lowercase, 1 Digit and 1 Special Character") String password, Roles role, @NotBlank(message = "Name is mandatory") String name, Object o) {
    }
}
