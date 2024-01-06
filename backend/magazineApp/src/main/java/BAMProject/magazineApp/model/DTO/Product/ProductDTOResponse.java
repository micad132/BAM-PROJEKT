package BAMProject.magazineApp.model.DTO.Product;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class ProductDTOResponse {
    private Long id;
    private String productName;
    private String weight;
    private String price;
}
