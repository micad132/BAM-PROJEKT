package BAMProject.magazineApp.mapper;

import BAMProject.magazineApp.model.DTO.UserDTORequest;
import BAMProject.magazineApp.model.User;
import BAMProject.magazineApp.model.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@AllArgsConstructor
@Component
public class UserMapper {

    public User mapDTOToEntity(UserDTORequest userDTORequest) {
        return User.builder()
                .username(userDTORequest.getUsername())
                .password(userDTORequest.getPassword())
                .city(userDTORequest.getCity())
                .postalCode(userDTORequest.getPostalCode())
                .role(UserRole.USER)
                .products(new ArrayList<>())
                .storages(new ArrayList<>())
                .build();
    }


}
