package BAMProject.magazineApp.service;
import BAMProject.magazineApp.model.User;
import BAMProject.magazineApp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder encoder;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void createUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

}
