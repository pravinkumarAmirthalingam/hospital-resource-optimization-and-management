
package com.hospital.resource.hospital_resource_system.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@SuppressWarnings("deprecation")
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Temporary local development only.
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**")
                        .permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/hospitals/**")
                        .hasAnyRole("SUPER_ADMIN", "HOSPITAL_ADMIN", "PUBLIC_USER")

                        .requestMatchers(HttpMethod.GET, "/api/beds/**")
                        .hasAnyRole("SUPER_ADMIN", "HOSPITAL_ADMIN", "PUBLIC_USER")

                        .requestMatchers(HttpMethod.GET, "/api/patients/**",
                                "/api/admissions/**", "/api/ambulances/**")
                        .hasAnyRole("SUPER_ADMIN", "HOSPITAL_ADMIN")

                        .requestMatchers("/api/**")
                        .hasAnyRole("SUPER_ADMIN", "HOSPITAL_ADMIN")

                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .formLogin(form -> form.disable());

        return http.build();
    }
}
