package BAMProject.magazineApp.service;

import BAMProject.magazineApp.model.Storage;

import java.util.List;

import BAMProject.magazineApp.repository.StorageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
@AllArgsConstructor
@Service
public class StorageService {
    private final StorageRepository storageRepository;

    public List<Storage> getAllStorages() {
        return storageRepository.findAll();
    }

    public Storage createStorage(Storage storage) {
        return storageRepository.save(storage);
    }
}
