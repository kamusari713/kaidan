package ru.kaidan.backend.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.kaidan.backend.Enums.RoleType;
import ru.kaidan.backend.Enums.SexType;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPatchDTO {
    private String name;
    private String email;
    private String password;
    private RoleType role;
    private SexType sex;
}
