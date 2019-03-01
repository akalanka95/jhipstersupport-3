package com.epi.jhipster.domain;

import javax.persistence.*;

@Entity
@Table( name = "CompanyProductDetails")
public class CompanyProductDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.MERGE)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.MERGE)
    private Company_Product_Module companyProductModule;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Company_Product_Module getCompanyProductModule() {
        return companyProductModule;
    }

    public void setCompanyProductModule(Company_Product_Module companyProductModule) {
        this.companyProductModule = companyProductModule;
    }
}
