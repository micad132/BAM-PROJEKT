package BAMProject.magazineApp.controller;
import BAMProject.magazineApp.config.UserWrapper;
import BAMProject.magazineApp.model.DTO.UserDTORequest;
import BAMProject.magazineApp.model.User;
import BAMProject.magazineApp.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/user")
public class UserController {
    private final UserService userService;


    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserDTORequest userDTORequest) {
        userService.createUser(userDTORequest);
        return ResponseEntity.ok("User registered!");
    }

    @GetMapping("/logged")
    public ResponseEntity<User> getLoggedUser(Authentication authentication) {
        User loggedUser = Optional.ofNullable(authentication)
                .filter(f -> f.getPrincipal() instanceof UserWrapper)
                .map(Authentication::getPrincipal)
                .map(UserWrapper.class::cast)
                .map(UserWrapper::getUser)
                .orElse(null);
        return ResponseEntity.ok(loggedUser);
    }

    @PostMapping("/sql")
    public ResponseEntity<String>  SQLINJ(@RequestBody String query) {
        userService.SQLINJ(query);
        return ResponseEntity.ok("SQL injected!");
    }
}
