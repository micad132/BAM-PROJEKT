package BAMProject.magazineApp.model.DTO.Storage;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class StorageDTORequest {
    private String storageName;
    private Double storageCapacity;
    private List<Long> productsIds;
}
