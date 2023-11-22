package BAMProject.magazineApp.service;

import BAMProject.magazineApp.model.StorageModel;

import java.util.List;

import BAMProject.magazineApp.repository.StorageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
@AllArgsConstructor
@Service
public class StorageService {
    private final StorageRepository storageRepository;

    public List<StorageModel> getAllStorages() {
        return storageRepository.findAll();
    }

    public StorageModel createStorage(StorageModel storage) {
        return storageRepository.save(storage);
    }
}