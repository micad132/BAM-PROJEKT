package BAMProject.magazineApp.controller;
import BAMProject.magazineApp.model.DTO.Storage.EditStorageDTORequest;
import BAMProject.magazineApp.model.DTO.Storage.StorageDTORequest;
import BAMProject.magazineApp.model.DTO.Storage.StorageDTOResponse;
import BAMProject.magazineApp.model.Storage;
import BAMProject.magazineApp.service.StorageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/storage")
public class StorageController {
    private final StorageService storageService;


    @GetMapping
    public List<StorageDTOResponse> getAllStorages() {
        return storageService.getAllStorages();
    }

    @PostMapping
    public ResponseEntity<String> addStorage(@RequestBody StorageDTORequest storageDTORequest) {
        storageService.addStorage(storageDTORequest);
        return ResponseEntity.ok("Added new storage!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStorage(@PathVariable ("id") Long id) {
        storageService.deleteStorage(id);
        return ResponseEntity.ok("Storage deleted!");
    }

    @PutMapping
    public ResponseEntity<String> editStorage(@RequestBody EditStorageDTORequest editStorageDTORequest) {
        storageService.editStorage(editStorageDTORequest);
        return ResponseEntity.ok("Storage edited!");
    }
}
