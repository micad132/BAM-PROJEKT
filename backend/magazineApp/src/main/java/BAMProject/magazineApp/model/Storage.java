package BAMProject.magazineApp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "storage")
public class Storage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "storage_name")
    private String storageName;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
