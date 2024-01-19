package BAMProject.magazineApp.mapper;

import BAMProject.magazineApp.model.DTO.Storage.EditStorageDTORequest;
import BAMProject.magazineApp.model.DTO.Storage.StorageDTORequest;
import BAMProject.magazineApp.model.DTO.Storage.StorageDTOResponse;
import BAMProject.magazineApp.model.Product;
import BAMProject.magazineApp.model.Storage;
import BAMProject.magazineApp.repository.ProductRepository;
import BAMProject.magazineApp.repository.StorageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class StorageMapper {

    private final StorageRepository storageRepository;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public Storage mapDTOToEntity(StorageDTORequest storageDTORequest) {
        List<Product> products = productRepository.findAllById(storageDTORequest.getProductsIds());
        return Storage.
                builder()
                .storageName(storageDTORequest.getStorageName())
                .storageCapacity(storageDTORequest.getStorageCapacity())
                .products(products)
                .build();
    }

    public StorageDTOResponse mapEntityToDTO(Storage storage) {
        return StorageDTOResponse
                .builder()
                .id(storage.getId())
                .storageName(storage.getStorageName())
                .storageCapacity(storage.getStorageCapacity())
                .products(storage.getProducts().stream().map(productMapper::mapEntityToDTO).collect(Collectors.toList()))
                .build();
    }

    public Storage mapEditDTOTOEntity(EditStorageDTORequest editStorageDTORequest) {
        List<Product> products = productRepository.findAllById(editStorageDTORequest.getProductIds());
        Storage storage = storageRepository.findById(editStorageDTORequest.getId()).orElseThrow(() -> new NoSuchElementException("Storage not found!"));
        storage.setStorageName(editStorageDTORequest.getStorageName());
        storage.setProducts(products);
        return storage;
    }
}
