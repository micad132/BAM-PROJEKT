package BAMProject.magazineApp.repository;

import BAMProject.magazineApp.model.StorageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageRepository extends JpaRepository<StorageModel, Long> {
    // Dodatkowe metody, jeśli potrzebujesz niestandardowych zapytań
}
