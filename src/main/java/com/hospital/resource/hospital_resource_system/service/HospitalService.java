package com.hospital.resource.hospital_resource_system.service;
import com.hospital.resource.hospital_resource_system.entity.Hospital;
import com.hospital.resource.hospital_resource_system.repository.HospitalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    // CREATE
    public Hospital createHospital(Hospital hospital) {
        hospital.setId(null);
        return hospitalRepository.save(hospital);
    }

    // READ ALL
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    // READ ONE
    public Hospital getHospitalById(Long id) {
        return hospitalRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Hospital not found with ID: " + id
                        ));
    }

    // UPDATE
    public Hospital updateHospital(Long id, Hospital updatedHospital) {
        Hospital existingHospital = getHospitalById(id);
        existingHospital.setName(updatedHospital.getName());
        existingHospital.setLocation(updatedHospital.getLocation());
        existingHospital.setPhone(updatedHospital.getPhone());

        return hospitalRepository.save(existingHospital);
    }

    // DELETE
    public void deleteHospital(Long id) {
        Hospital hospital = getHospitalById(id);
        hospitalRepository.delete(hospital);
    }
}
