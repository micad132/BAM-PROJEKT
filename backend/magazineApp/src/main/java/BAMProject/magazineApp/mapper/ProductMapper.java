package BAMProject.magazineApp.mapper;

import BAMProject.magazineApp.model.DTO.Product.EditProductDTORequest;
import BAMProject.magazineApp.model.DTO.Product.ProductDTORequest;
import BAMProject.magazineApp.model.DTO.Product.ProductDTOResponse;
import BAMProject.magazineApp.model.Product;
import BAMProject.magazineApp.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;

@Component
@AllArgsConstructor
public class ProductMapper {

    private final ProductRepository productRepository;

    public Product mapDTOToEntity(ProductDTORequest productDTORequest) {

        return Product.builder()
                .productName(productDTORequest.getProductName())
                .price(productDTORequest.getPrice())
                .weight(productDTORequest.getWeight())
                .build();
    }

    public ProductDTOResponse mapEntityToDTO(Product product) {
        return ProductDTOResponse.builder()
                .id(product.getId())
                .weight(product.getWeight())
                .price(product.getPrice())
                .productName(product.getProductName())
                .build();
    }

    public Product mapEditDTOToEntity(EditProductDTORequest editProductDTORequest) {

        Product product = productRepository.findById(editProductDTORequest.getId()).orElseThrow(() -> new NoSuchElementException("No such product"));

        product.setProductName(editProductDTORequest.getProductName());
        product.setPrice(editProductDTORequest.getPrice());
        product.setWeight(editProductDTORequest.getWeight());

        return product;
    }
}
