package com.epi.jhipster.web.rest;


import com.epi.jhipster.domain.Product;
import com.epi.jhipster.domain.Product_Module;
import com.epi.jhipster.repository.ProductModuleRepository;
import com.epi.jhipster.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @RequestMapping("/test/getListOfProducts")
    public List<Product> findAll(){
        return  productRepository.findAll();
    }

}
