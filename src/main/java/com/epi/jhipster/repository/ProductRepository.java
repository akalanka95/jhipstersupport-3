package com.epi.jhipster.repository;



import com.epi.jhipster.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductName(String name);
}
