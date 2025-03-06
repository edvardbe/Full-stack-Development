package no.ntnu.idi.calculator.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import no.ntnu.idi.calculator.model.User;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JWTService {

    private static final String SECRET_KEY =  "6c6f6e67756e6472656c616c6c79d2b6f5e8e5c1a2cb8b4b7c0e88a2bbf7c4a3";
    private final Duration tokenAge = Duration.ofMinutes(5);


    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    public String generateToken(
        Map<String, Object> extraClaims,
        UserDetails userDetails
    ) {
        return Jwts
        .builder()
        .claims(extraClaims)
        .subject(userDetails.getUsername())
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + tokenAge.get(ChronoUnit.SECONDS) * 1000))
        .signWith(getSigningKey())
        .compact();

    }

    public String generateExpiredToken(
    ) {
        return Jwts
        .builder()
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + 0))
        .signWith(getSigningKey())
        .compact();
    }

    public Boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    } 

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration); 
    }

    public Claims extractAllClaims(String token){
        return Jwts
        .parser()
        .verifyWith(getSigningKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();

    }
    private SecretKey getSigningKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes); 
    }
}