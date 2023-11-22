package BAMProject.magazineApp.service;
import BAMProject.magazineApp.model.ProductModel;
import BAMProject.magazineApp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductModel> getAllProducts() {
        return productRepository.findAll();
    }

    public ProductModel createProduct(ProductModel product) {
        return productRepository.save(product);
    }
}
