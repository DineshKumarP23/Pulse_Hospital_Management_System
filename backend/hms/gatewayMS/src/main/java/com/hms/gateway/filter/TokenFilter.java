package com.hms.gateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {
    private static final String SECRET = "9ba505ccf397f44cb71170fdd64a5bb2cd0ed795aaac6cf5dc4ea1342c2ab3e2fd7149010e452c662e97f9fc2251a4580defb8cfe18409beab4744c8456a5db7";

    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getPath().toString();
            if(path.equals("/user/login")||path.equals("/user/register")) {
                return chain.filter(exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build());
            }
            HttpHeaders header = exchange.getRequest().getHeaders();
            if(!header.toSingleValueMap().containsKey(HttpHeaders.AUTHORIZATION)){
                throw new RuntimeException("Authorization header is missing");
            }
            String authHeader = header.getFirst(HttpHeaders.AUTHORIZATION);
            if(authHeader == null || !authHeader.startsWith("Bearer")) {
                throw new RuntimeException("Authorization header is invalid");
            }
            String token = authHeader.substring(7);
            try {
                Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
                exchange = exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build();
            } catch(Exception e) {
                throw new RuntimeException("Token is invalid");
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {

    }
}
