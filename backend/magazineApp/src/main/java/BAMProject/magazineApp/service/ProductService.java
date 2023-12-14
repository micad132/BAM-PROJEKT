package BAMProject.magazineApp.service;
import BAMProject.magazineApp.mapper.ProductMapper;
import BAMProject.magazineApp.model.DTO.Product.EditProductDTORequest;
import BAMProject.magazineApp.model.DTO.Product.ProductDTORequest;
import BAMProject.magazineApp.model.DTO.Product.ProductDTOResponse;
import BAMProject.magazineApp.model.Product;
import BAMProject.magazineApp.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    public List<ProductDTOResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(productMapper::mapEntityToDTO).collect(Collectors.toList());
    }

    public void addProduct(ProductDTORequest productDTORequest) {
            Product product = productMapper.mapDTOToEntity(productDTORequest);
            productRepository.save(product);
    }

    public void editProduct(EditProductDTORequest editProductDTORequest) {
        Product product = productMapper.mapEditDTOToEntity(editProductDTORequest);
        productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
