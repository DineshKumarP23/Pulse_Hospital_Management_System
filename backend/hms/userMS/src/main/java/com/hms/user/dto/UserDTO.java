package com.hms.user.dto;

import com.hms.user.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;
    @NotBlank(message = "Password is mandatory")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_]).+$", message = "Password should contain atleast 1 Uppercase, 1 Lowercase, 1 Digit and 1 Special Character")
    private String password;
    private Roles role;

    public User toEntity() {
        return new User(this.id, this.name, this.email, this.password, this.role);
    }
}
