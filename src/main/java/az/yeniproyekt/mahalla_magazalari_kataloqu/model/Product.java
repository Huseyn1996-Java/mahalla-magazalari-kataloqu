package az.yeniproyekt.mahalla_magazalari_kataloqu.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data // Lombok Getter&Setter
public class Product {

    @Id // (primary key) göstərmək üçün istifadə olunur Data Bazada
    private String id; // id
    private String name; // ad
    private double price; // qiymet

}
