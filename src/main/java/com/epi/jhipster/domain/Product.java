package com.epi.jhipster.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table( name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 112321L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String productName;
    private String type;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Product_Module> productModules = new HashSet<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<UserProduct> userProduct= new HashSet<>();


    public Set<Product_Module> getProductModules() {
        return productModules;
    }

    public void setProductModules(Set<Product_Module> productModules) {
        this.productModules = productModules;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Set<UserProduct> getUserProduct() {
        return userProduct;
    }

    public void setUserProduct(Set<UserProduct> userProduct) {
        this.userProduct = userProduct;
    }
}
