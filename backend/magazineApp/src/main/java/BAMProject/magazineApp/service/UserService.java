package BAMProject.magazineApp.service;
import BAMProject.magazineApp.model.UserModel;
import BAMProject.magazineApp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;


    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public UserModel createUser(UserModel user) {
        return userRepository.save(user);
    }

}
