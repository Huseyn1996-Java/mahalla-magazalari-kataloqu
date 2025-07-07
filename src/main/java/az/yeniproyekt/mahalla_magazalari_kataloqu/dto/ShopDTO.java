package az.yeniproyekt.mahalla_magazalari_kataloqu.dto;

import lombok.Data;
import java.util.List;

@Data
public class ShopDTO {

    private String id;
    private String name;
    private String address;
    private double latitude;
    private double longitude;
    private List<ProductDTO> products;

}
