package BAMProject.magazineApp.controller;
import BAMProject.magazineApp.model.StorageModel;
import BAMProject.magazineApp.service.StorageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/storages")
public class StorageController {
    private final StorageService storageService;


    @GetMapping
    public List<StorageModel> getAllStorages() {
        return storageService.getAllStorages();
    }

    @PostMapping
    public StorageModel createStorage(@RequestBody StorageModel storage) {
        return storageService.createStorage(storage);
    }
}
