package az.yeniproyekt.mahalla_magazalari_kataloqu.service;

import az.yeniproyekt.mahalla_magazalari_kataloqu.dto.ProductDTO;
import az.yeniproyekt.mahalla_magazalari_kataloqu.dto.ShopDTO;
import az.yeniproyekt.mahalla_magazalari_kataloqu.model.Product;
import az.yeniproyekt.mahalla_magazalari_kataloqu.model.Shop;
import az.yeniproyekt.mahalla_magazalari_kataloqu.repository.ProductRepository;
import az.yeniproyekt.mahalla_magazalari_kataloqu.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service // Bu class məlumatları emal edir, qaydaları tətbiq edir, yəni əsas işləri görür.
public class ShopServiceImpl implements ShopService {


    @Autowired // bir class-ın içində avtomatik olaraq başqa bir class-ı əlavə etmək
    private ShopRepository shopRepository;
    @Autowired // bir class-ın içində avtomatik olaraq başqa bir class-ı əlavə etmək
    private ProductRepository productRepository;

    @Override // bir metodun üst sinifdən (superclass) və ya interfeys-dən gəldiyini göstərir.
    public ShopDTO addShop(ShopDTO shopDTO) {
        // Product-ları bazaya əlavə edirik
        List<Product> products = shopDTO.getProducts().stream()
                .map(this::dtoToEntity)
                .map(product -> productRepository.save(product)) // Burada Product bazaya əlavə edilir
                .collect(Collectors.toList());

        Shop shop = dtoToEntity(shopDTO);
        shop.setProducts(products); // Bazaya əlavə edilmiş Product-ları mağazaya əlavə et
        Shop savedShop = shopRepository.save(shop);
        return entityToDto(savedShop);
    }

    @Override // bir metodun üst sinifdən (superclass) və ya interfeys-dən gəldiyini göstərir.
    public List<ShopDTO> getAllShops() {
        return shopRepository.findAll()
                .stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Override // bir metodun üst sinifdən (superclass) və ya interfeys-dən gəldiyini göstərir.
    public ShopDTO getShopById(String id) {
        return shopRepository.findById(id)
                .map(this::entityToDto)
                .orElse(null);
    }

    @Override // bir metodun üst sinifdən (superclass) və ya interfeys-dən gəldiyini göstərir.
    public void deleteShop(String id) {
        shopRepository.deleteById(id);
    }

    @Override // bir metodun üst sinifdən (superclass) və ya interfeys-dən gəldiyini göstərir.
    public ShopDTO updateShop(String id, ShopDTO shopDTO) {
        // Shop'u id ile buluyoruz
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        // Güncellenmesi gereken alanları set ediyoruz
        shop.setName(shopDTO.getName());
        shop.setAddress(shopDTO.getAddress());
        shop.setLatitude(shopDTO.getLatitude());
        shop.setLongitude(shopDTO.getLongitude());

        // ProductDTO'ları Product nesnelerine dönüştürüp set ediyoruz
        List<Product> updatedProducts = dtoToEntity(shopDTO.getProducts());
        shop.setProducts(updatedProducts);

        // Güncellenen Shop'u kaydediyoruz
        Shop updatedShop = shopRepository.save(shop);

        // Güncellenen Shop'u DTO'ya çevirip döndürüyoruz
        return entityToDto(updatedShop);
    }


    @Override // bir metodun üst sinifdən (superclass) və ya interfeys-dən gəldiyini göstərir.
    public ShopDTO updateShopName(String id, String name) {
        Shop shop = shopRepository.findById(id).orElseThrow(() -> new RuntimeException("Shop not found"));
        shop.setName(name);
        Shop updatedShop = shopRepository.save(shop);
        return entityToDto(updatedShop);
    }

    private Shop dtoToEntity(ShopDTO dto) {
        Shop shop = new Shop();
        shop.setId(dto.getId());
        shop.setName(dto.getName());
        shop.setAddress(dto.getAddress());
        shop.setLatitude(dto.getLatitude());
        shop.setLongitude(dto.getLongitude());
        shop.setProducts(dtoToEntity(dto.getProducts())); // Convert List<ProductDTO> to List<Product>
        return shop;
    }

    private List<Product> dtoToEntity(List<ProductDTO> productDTOs) {
        return productDTOs.stream()
                .map(this::dtoToEntity) // Convert each ProductDTO to Product
                .collect(Collectors.toList());
    }

    private Product dtoToEntity(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        return product;
    }

    private ShopDTO entityToDto(Shop shop) {
        ShopDTO dto = new ShopDTO();
        dto.setId(shop.getId());
        dto.setName(shop.getName());
        dto.setAddress(shop.getAddress());
        dto.setLatitude(shop.getLatitude());
        dto.setLongitude(shop.getLongitude());
        dto.setProducts(entityToDto(shop.getProducts())); // Convert List<Product> to List<ProductDTO>
        return dto;
    }

    private List<ProductDTO> entityToDto(List<Product> products) {
        return products.stream()
                .map(this::entityToDto) // Convert each Product to ProductDTO
                .collect(Collectors.toList());
    }

    private ProductDTO entityToDto(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        return dto;
    }
}
