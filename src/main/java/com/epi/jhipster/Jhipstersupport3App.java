package com.epi.jhipster;

import com.epi.jhipster.config.ApplicationProperties;
import com.epi.jhipster.config.DefaultProfileUtil;

import com.epi.jhipster.domain.*;
import com.epi.jhipster.repository.CompanyRepository;
import com.epi.jhipster.repository.DepartmentRepository;
import com.epi.jhipster.service.ProductService;
import io.github.jhipster.config.JHipsterConstants;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@EnableConfigurationProperties({LiquibaseProperties.class, ApplicationProperties.class})
@EnableDiscoveryClient
public class Jhipstersupport3App implements CommandLineRunner {

    @Autowired
    private ProductService productService;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private DepartmentRepository departmentRepository;

    private static final Logger log = LoggerFactory.getLogger(Jhipstersupport3App.class);

    private final Environment env;

    public Jhipstersupport3App(Environment env) {
        this.env = env;
    }

    /**
     * Initializes jhipstersupport3.
     * <p>
     * Spring profiles can be configured with a program argument --spring.profiles.active=your-active-profile
     * <p>
     * You can find more information on how profiles work with JHipster on <a href="https://www.jhipster.tech/profiles/">https://www.jhipster.tech/profiles/</a>.
     */
    @PostConstruct
    public void initApplication() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_PRODUCTION)) {
            log.error("You have misconfigured your application! It should not run " +
                "with both the 'dev' and 'prod' profiles at the same time.");
        }
        if (activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(JHipsterConstants.SPRING_PROFILE_CLOUD)) {
            log.error("You have misconfigured your application! It should not " +
                "run with both the 'dev' and 'cloud' profiles at the same time.");
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Jhipstersupport3App.class);
        DefaultProfileUtil.addDefaultProfile(app);
        Environment env = app.run(args).getEnvironment();
        logApplicationStartup(env);
    }

    private static void logApplicationStartup(Environment env) {
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        String serverPort = env.getProperty("server.port");
        String contextPath = env.getProperty("server.servlet.context-path");
        if (StringUtils.isBlank(contextPath)) {
            contextPath = "/";
        }
        String hostAddress = "localhost";
        try {
            hostAddress = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.warn("The host name could not be determined, using `localhost` as fallback");
        }
        log.info("\n----------------------------------------------------------\n\t" +
                "Application '{}' is running! Access URLs:\n\t" +
                "Local: \t\t{}://localhost:{}{}\n\t" +
                "External: \t{}://{}:{}{}\n\t" +
                "Profile(s): \t{}\n----------------------------------------------------------",
            env.getProperty("spring.application.name"),
            protocol,
            serverPort,
            contextPath,
            protocol,
            hostAddress,
            serverPort,
            contextPath,
            env.getActiveProfiles());
    }

    @Override
    public void run(String... args) throws Exception {
        Product p1 = new Product();
        p1.setProductName("Branchless Banking");
        p1.setType("SOFTWARE");


        Product p2 = new Product();
        p2.setProductName("Mobile Wallet");
        p2.setType("SOFTWARE");

        Product p3 = new Product();
        p3.setProductName("SMS Banking");
        p3.setType("SOFTWARE");


        Module m1 = new Module();
        m1.setModuleName("eSwitch");
        m1.setType("SOFTWARE");

        Module m2 = new Module();
        m2.setModuleName("Admin");
        m2.setType("SOFTWARE");

        Module m3 = new Module();
        m3.setModuleName("Middleware");
        m3.setType("SOFTWARE");

        Module m4 = new Module();
        m4.setModuleName("DB");
        m4.setType("SOFTWARE");


        Module m5 = new Module();
        m5.setModuleName("M-Server");
        m5.setType("SOFTWARE");

        Module m6 = new Module();
        m6.setModuleName("WAM");
        m6.setType("SOFTWARE");

        Module m7 = new Module();
        m7.setModuleName("TSP");
        m7.setType("SOFTWARE");

        Company c1 = new Company();
        c1.setCompanyName("NSB");
        companyRepository.save(c1);

        Company c2 = new Company();
        c2.setCompanyName("NTB");
        companyRepository.save(c2);

        Company c3 = new Company();
        c3.setCompanyName("RDB");
        companyRepository.save(c3);

        Company c4 = new Company();
        c4.setCompanyName("EPIC_LANKA");
        companyRepository.save(c4);

        Department d1 = new Department();
        d1.setDepartmentName("Support");
        departmentRepository.save(d1);

        Department d2 = new Department();
        d2.setDepartmentName("QA");
        departmentRepository.save(d2);

        Department d3 = new Department();
        d3.setDepartmentName("Dev");
        departmentRepository.save(d3);

        Department d4 = new Department();
        d4.setDepartmentName("Compliance");
        departmentRepository.save(d4);

        Set<Product_Module> productModule = new HashSet<>();
        productModule.add(new Product_Module(p1,m1));
        productModule.add(new Product_Module(p1,m2));
        productModule.add(new Product_Module(p1,m3));
        productModule.add(new Product_Module(p1,m4));
        productService.createProduct(p1, productModule);

        Set<Product_Module> productModule1 = new HashSet<>();
        productModule1.add(new Product_Module(p2,m5));
        productModule1.add(new Product_Module(p2,m6));
        productModule1.add(new Product_Module(p2,m2));
        productModule1.add(new Product_Module(p2,m4));
        productService.createProduct(p2, productModule1);

    }
}
