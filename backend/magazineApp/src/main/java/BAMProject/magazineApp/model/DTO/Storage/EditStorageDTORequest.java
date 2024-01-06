package BAMProject.magazineApp.model.DTO.Storage;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class EditStorageDTORequest {
    private Long id;
    private String storageName;
    private List<Long> productIds;
}
