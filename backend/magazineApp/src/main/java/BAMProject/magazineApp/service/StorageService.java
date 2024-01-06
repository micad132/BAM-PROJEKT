package BAMProject.magazineApp.service;

import BAMProject.magazineApp.mapper.StorageMapper;
import BAMProject.magazineApp.model.DTO.Storage.EditStorageDTORequest;
import BAMProject.magazineApp.model.DTO.Storage.StorageDTORequest;
import BAMProject.magazineApp.model.DTO.Storage.StorageDTOResponse;
import BAMProject.magazineApp.model.Storage;

import java.util.List;
import java.util.stream.Collectors;

import BAMProject.magazineApp.repository.StorageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
@AllArgsConstructor
@Service
public class StorageService {
    private final StorageRepository storageRepository;

    private final StorageMapper storageMapper;

    public List<StorageDTOResponse> getAllStorages() {

        List<Storage> storages = storageRepository.findAll();
        return storages.stream().map(storageMapper::mapEntityToDTO).collect(Collectors.toList());
    }

    public void addStorage(StorageDTORequest storageDTORequest) {
        Storage storage = storageMapper.mapDTOToEntity(storageDTORequest);
        storageRepository.save(storage);
    }

    public void deleteStorage(Long id) {
        storageRepository.deleteById(id);
    }

    public void editStorage(EditStorageDTORequest editStorageDTORequest) {
        Storage storage = storageMapper.mapEditDTOTOEntity(editStorageDTORequest);
        storageRepository.save(storage);
    }
}
