
package com.hospital.resource.hospital_resource_system.config;

import com.hospital.resource.hospital_resource_system.entity.AppUser;
import com.hospital.resource.hospital_resource_system.repository.AppUserRepository;
import com.hospital.resource.hospital_resource_system.security.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedUsers(AppUserRepository repository) {
        return args -> {

            createUser(
                    repository,
                    "superadmin",
                    "SuperAdmin123!",
                    Role.SUPER_ADMIN
            );

            createUser(
                    repository,
                    "hospitaladmin",
                    "HospitalAdmin123!",
                    Role.HOSPITAL_ADMIN
            );

            createUser(
                    repository,
                    "publicuser",
                    "PublicUser123!",
                    Role.PUBLIC_USER
            );
        };
    }

    private void createUser(
            AppUserRepository repository,
            String username,
            String password,
            Role role) {

        if (!repository.existsByUsername(username)) {
            AppUser user = new AppUser();
            user.setUsername(username);
            user.setPassword(password);
            user.setRole(role);

            repository.save(user);

            System.out.println(
                    "Created user: " + username + " with role: " + role
            );
        }
    }
}
