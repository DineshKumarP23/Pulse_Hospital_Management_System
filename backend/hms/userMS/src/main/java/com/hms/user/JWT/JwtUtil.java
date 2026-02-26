package com.hms.user.JWT;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private static final Long JWT_TOKEN_VALIDITY = 5*60*60L;
    private static final String SECRET = "9ba505ccf397f44cb71170fdd64a5bb2cd0ed795aaac6cf5dc4ea1342c2ab3e2fd7149010e452c662e97f9fc2251a4580defb8cfe18409beab4744c8456a5db7";

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails user = (CustomUserDetails) userDetails;
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("name", user.getName());
        return doGenerateToken(claims, user.getUsername());
    }
    public String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY*1000 )).signWith(SignatureAlgorithm.HS512, SECRET).compact();
    }
}
