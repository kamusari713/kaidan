package ru.kaidan.backend.modules.auth.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "tokens")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TokenEntity {

    @Id
    private String id;
    private String token;
    private Boolean revoked;
    private TokenType type;
    private String userId;
}
