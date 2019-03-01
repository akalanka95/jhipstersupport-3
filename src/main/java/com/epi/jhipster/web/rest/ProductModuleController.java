package com.epi.jhipster.web.rest;

import com.epi.jhipster.domain.Product_Module;
import com.epi.jhipster.domain.User;
import com.epi.jhipster.repository.ProductModuleRepository;
import com.epi.jhipster.repository.UserRepository;
import com.epi.jhipster.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductModuleController {
    @Autowired
    private ProductModuleRepository productModuleRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/test/getList")
    public List<Product_Module> findAll(){
        return (List<Product_Module>) productModuleRepository.findAll();
    }


    @RequestMapping("/test/getListOfProductsModulesByProductId/{id}")
    public List<Product_Module> findOne(@PathVariable("id") Long id){
        return  productModuleRepository.findByProductId(id);
    }
}
