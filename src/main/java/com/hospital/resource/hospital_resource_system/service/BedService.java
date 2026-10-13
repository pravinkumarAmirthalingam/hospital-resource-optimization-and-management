
package com.hospital.resource.hospital_resource_system.service;

import com.hospital.resource.hospital_resource_system.entity.Bed;
import com.hospital.resource.hospital_resource_system.repository.BedRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BedService {

    private final BedRepository bedRepository;

    public BedService(BedRepository bedRepository) {
        this.bedRepository = bedRepository;
    }

    public List<Bed> getAllBeds() {
        return bedRepository.findAll();
    }

    public Bed getBedById(Long id) {
        return bedRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Bed not found with id: " + id));
    }

    public Bed createBed(Bed bed) {
        return bedRepository.save(bed);
    }
}
