package BAMProject.magazineApp.model.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTORequest {

    private String username;
    private String password;
    private String city;
    private String postalCode;
}
