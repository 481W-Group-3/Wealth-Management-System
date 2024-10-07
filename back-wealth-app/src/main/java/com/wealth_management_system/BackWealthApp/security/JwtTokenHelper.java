package com.wealth_management_system.BackWealthApp.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;


import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenHelper {
	public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60; // 5 hours

	// Generate a secure 256-bit key for HMAC-SHA256
	 private final SecretKey secretKey = Keys.hmacShaKeyFor("replace_with_a_secure_32_byte_key".getBytes());



    // Retrieve username from JWT token
//    public String getUsernameFromToken(String token) {
//    	System.out.println("Claims from token: " + claims);
//    	
//        return getClaimFromToken(token, Claims::getSubject);
//    }
   
    public String getUsernameFromToken(String token) {
        Claims claims = extractAllClaims(token);
        System.out.println("Claims from token: " + claims);
        return claims.getSubject(); // Check if claims contain the expected subject
    }


    // Retrieve expiration date from JWT token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
   

    // Keep your original extractAllClaims method
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    // Generate token for user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    // While creating the token
    // 1. Define claims of the token, like Issuer, Expiration, Subject, and the ID
    // 2. Sign the JWT using a secret key.
    // 3. Compact the JWT to a URL-safe string
   
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        // Create a new JwtBuilder instance
        JwtBuilder builder = Jwts.builder()
                .claim("sub", subject) // Set the subject claim
                .claim("iat", System.currentTimeMillis() / 1000) // Set issued at claim
                .claim("exp", (System.currentTimeMillis() / 1000) + JWT_TOKEN_VALIDITY); // Set expiration claim

        // Add all claims from the provided map
        for (Map.Entry<String, Object> entry : claims.entrySet()) {
            builder.claim(entry.getKey(), entry.getValue());
        }

        // Sign the JWT and return it
        return builder.signWith(secretKey) // Sign with the secret key
                      .compact();
    }



    // Validate token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Add your getSignInKey() method here if needed
    private SecretKey getSignInKey() {
        return secretKey; // Use the same key or generate a new one as needed
    }
    

}
