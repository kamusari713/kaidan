package ru.kaidan.backend.modules.user.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Document(collection = "users")
public class UserEntity implements UserDetails {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String role;
    @JsonIgnore
    @Transient
    private List<String> authorities;

    @JsonIgnore
    @Transient
    private boolean accountNonLocked;

    @JsonIgnore
    @Transient
    private boolean accountNonExpired;

    @JsonIgnore
    @Transient
    private boolean credentialsNonExpired;

    @JsonIgnore
    @Transient
    private boolean enabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}