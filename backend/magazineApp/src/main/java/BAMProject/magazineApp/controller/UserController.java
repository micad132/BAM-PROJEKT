package BAMProject.magazineApp.controller;
import BAMProject.magazineApp.model.UserModel;
import BAMProject.magazineApp.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;


    @GetMapping
    public List<UserModel> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public UserModel createUser(@RequestBody UserModel user) {
        return userService.createUser(user);
    }
}
