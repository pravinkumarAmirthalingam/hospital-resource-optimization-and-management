
package com.hospital.resource.hospital_resource_system.controller;

import com.hospital.resource.hospital_resource_system.entity.Bed;
import com.hospital.resource.hospital_resource_system.service.BedService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beds")
public class BedController {

    private final BedService bedService;

    public BedController(BedService bedService) {
        this.bedService = bedService;
    }

    @GetMapping
    public List<Bed> getAllBeds() {
        return bedService.getAllBeds();
    }

    @GetMapping("/{id}")
    public Bed getBedById(@PathVariable Long id) {
        return bedService.getBedById(id);
    }

    @PostMapping
    public Bed createBed(@RequestBody Bed bed) {
        return bedService.createBed(bed);
    }
}
