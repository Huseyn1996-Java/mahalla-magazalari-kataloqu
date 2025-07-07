package az.yeniproyekt.mahalla_magazalari_kataloqu.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@Data // Lombok Getter&Setter
@Document(collection = "shops") // @Document annotasiyası Spring Data MongoDB-də istifadə olunur
public class Shop {

    @Id // (primary key) göstərmək üçün istifadə olunur Data Bazada
    private String id; // id
    private String name; // ad
    private String address; // unvan
    private double latitude; // xerite
    private double longitude; // xerite

    @DBRef // Bu sahə başqa bir kolleksiyadakı sənədə istinad edir. Mongo DB-de
    private List<Product> products;

}
