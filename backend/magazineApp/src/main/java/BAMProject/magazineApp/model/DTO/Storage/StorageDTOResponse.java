package BAMProject.magazineApp.model.DTO.Storage;

import BAMProject.magazineApp.model.DTO.Product.ProductDTOResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class StorageDTOResponse {
    private Long id;
    private String storageName;
    private Double storageCapacity;
    private List<ProductDTOResponse> products;
}
