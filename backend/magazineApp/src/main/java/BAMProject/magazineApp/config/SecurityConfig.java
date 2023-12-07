package BAMProject.magazineApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;
import java.util.List;

@Configuration
public class SecurityConfig {


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.applyPermitDefaultValues();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
        corsConfiguration.setAllowedMethods(List.of("POST", "GET", "PATCH", "DELETE", "PUT", "OPTIONS", "HEAD"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity httpSecurity,
            CorsConfigurationSource corsConfigurationSource
    ) throws Exception {


        httpSecurity
                .csrf()
                .disable()
                .cors().configurationSource(corsConfigurationSource)
                .and()
                .headers()
                .frameOptions().disable()
                .and()
                .authorizeRequests()
                .antMatchers("/login")
                .permitAll()
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .loginProcessingUrl("/login")
                .failureUrl("http://localhost:3000/failed")
                .defaultSuccessUrl("http://localhost:3000")
                .loginPage("http://localhost:3000/login")
                .permitAll();

        httpSecurity.logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("http://localhost:3000")
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .clearAuthentication(true);

//        httpSecurity.cors().configurationSource(corsConfigurationSource);

        return httpSecurity.build();
    }

}
