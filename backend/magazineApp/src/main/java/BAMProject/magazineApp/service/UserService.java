package BAMProject.magazineApp.service;
import BAMProject.magazineApp.config.UserWrapper;
import BAMProject.magazineApp.mapper.UserMapper;
import BAMProject.magazineApp.model.DTO.UserDTORequest;
import BAMProject.magazineApp.model.User;
import BAMProject.magazineApp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    private final PasswordEncoder encoder;

    private final UserMapper userMapper;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void createUser(UserDTORequest userDTORequest) {
        User user = userMapper.mapDTOToEntity(userDTORequest);
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserModelByUsername(username).map(UserWrapper::new).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
