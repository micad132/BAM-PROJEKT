package BAMProject.magazineApp.repository;

import BAMProject.magazineApp.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    // Dodatkowe metody, jeśli potrzebujesz niestandardowych zapytań
}
