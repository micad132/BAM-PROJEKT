package BAMProject.magazineApp.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@Table(name = "product")
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "product_name")
    private String productName;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "price")
    private String price;

    @Column(name = "weight")
    private String weight;

}
