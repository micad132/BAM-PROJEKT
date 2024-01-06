package BAMProject.magazineApp.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@Table(name = "storage")
@AllArgsConstructor
public class Storage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "storage_name")
    private String storageName;

    @Column(name = "storage_capacity")
    private Double storageCapacity;

    @ManyToMany
    @JoinTable(name = "storage_products",
            joinColumns = @JoinColumn(name = "storage_id"),
            inverseJoinColumns = @JoinColumn(name = "products_id"))
    private List<Product> products = new ArrayList<>();



}
