package BAMProject.magazineApp.mapper;

import BAMProject.magazineApp.model.DTO.Product.EditProductDTORequest;
import BAMProject.magazineApp.model.DTO.Product.ProductDTORequest;
import BAMProject.magazineApp.model.DTO.Product.ProductDTOResponse;
import BAMProject.magazineApp.model.Product;
import BAMProject.magazineApp.model.User;
import BAMProject.magazineApp.repository.ProductRepository;
import BAMProject.magazineApp.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;

@Component
@AllArgsConstructor
public class ProductMapper {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public Product mapDTOToEntity(ProductDTORequest productDTORequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();

        User loggedUser = userRepository.findUserModelByUsername(loggedInUsername).orElseThrow(() -> new UsernameNotFoundException("Nie ma usera"));

        return Product.builder()
                .productName(productDTORequest.getProductName())
                .price(productDTORequest.getPrice())
                .weight(productDTORequest.getWeight())
                .user(loggedUser)
                .build();
    }

    public ProductDTOResponse mapEntityToDTO(Product product) {
        return ProductDTOResponse.builder()
                .id(product.getId())
                .weight(product.getWeight())
                .price(product.getPrice())
                .productName(product.getProductName())
                .userName(product.getUser().getUsername())
                .build();
    }

    public Product mapEditDTOToEntity(EditProductDTORequest editProductDTORequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();

        User loggedUser = userRepository.findUserModelByUsername(loggedInUsername).orElseThrow(() -> new UsernameNotFoundException("Nie ma usera"));

        Product product = productRepository.findById(editProductDTORequest.getId()).orElseThrow(() -> new NoSuchElementException("Nie ma"));

        product.setProductName(editProductDTORequest.getProductName());
        product.setPrice(editProductDTORequest.getPrice());
        product.setWeight(editProductDTORequest.getWeight());
        product.setUser(loggedUser);

        return product;
    }
}
