package BAMProject.magazineApp.repository;

import BAMProject.magazineApp.model.Storage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageRepository extends JpaRepository<Storage, Long> {
    // Dodatkowe metody, jeśli potrzebujesz niestandardowych zapytań
}
