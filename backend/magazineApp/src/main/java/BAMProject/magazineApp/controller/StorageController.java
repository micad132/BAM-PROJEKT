package BAMProject.magazineApp.controller;
import BAMProject.magazineApp.model.Storage;
import BAMProject.magazineApp.service.StorageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/storage")
public class StorageController {
    private final StorageService storageService;


    @GetMapping
    public List<Storage> getAllStorages() {
        return storageService.getAllStorages();
    }

    @PostMapping
    public Storage createStorage(@RequestBody Storage storage) {
        return storageService.createStorage(storage);
    }
}
