package BAMProject.magazineApp.model.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ProductDTORequest {

    private String productName;
    private String price;
    private String weight;
}
