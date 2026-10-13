
package com.hospital.resource.hospital_resource_system.service;

import com.hospital.resource.hospital_resource_system.entity.Admission;
import com.hospital.resource.hospital_resource_system.entity.Bed;
import com.hospital.resource.hospital_resource_system.entity.Patient;
import com.hospital.resource.hospital_resource_system.repository.AdmissionRepository;
import com.hospital.resource.hospital_resource_system.repository.BedRepository;
import com.hospital.resource.hospital_resource_system.repository.PatientRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdmissionService {

    private final AdmissionRepository admissionRepository;
    private final PatientRepository patientRepository;
    private final BedRepository bedRepository;

    public AdmissionService(
            AdmissionRepository admissionRepository,
            PatientRepository patientRepository,
            BedRepository bedRepository) {
        this.admissionRepository = admissionRepository;
        this.patientRepository = patientRepository;
        this.bedRepository = bedRepository;
    }

    public List<Admission> getAllAdmissions() {
        return admissionRepository.findAll();
    }

    public Admission getAdmissionById(Long id) {
        return admissionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Admission not found with id: " + id));
    }

    @Transactional
    public Admission createAdmission(Long patientId, Long bedId) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Patient not found with id: " + patientId));

        Bed bed = bedRepository.findById(bedId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Bed not found with id: " + bedId));


        if (admissionRepository.existsByPatient_IdAndStatus(
                patientId, "ACTIVE")) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Patient already has an active admission"
            );
        }


        if (!"AVAILABLE".equalsIgnoreCase(bed.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Bed is not available");
        }

        bed.setStatus("OCCUPIED");
        bedRepository.save(bed);

        Admission admission = new Admission();
        admission.setPatient(patient);
        admission.setBed(bed);
        admission.setStatus("ACTIVE");
        admission.setAdmissionDate(LocalDateTime.now());

        return admissionRepository.save(admission);
    }


//    public void deleteAdmission(Long id) {
//        Admission admission = admissionRepository.findById(id)
//                .orElseThrow(() -> new ResponseStatusException(
//                        HttpStatus.NOT_FOUND,
//                        "Admission not found with id: " + id
//                ));
//
//        admissionRepository.delete(admission);
//    }


    @Transactional
    public Admission dischargeAdmission(Long id) {

        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Admission not found with id: " + id
                ));

        if (!"ACTIVE".equalsIgnoreCase(admission.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Admission is not active"
            );
        }

        Bed bed = admission.getBed();

        bed.setStatus("AVAILABLE");
        admission.setStatus("DISCHARGED");

        return admissionRepository.save(admission);
    }


}
