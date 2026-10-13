package com.hospital.resource.hospital_resource_system.controller;
import org.springframework.web.bind.annotation.PatchMapping;
import com.hospital.resource.hospital_resource_system.entity.Admission;
import com.hospital.resource.hospital_resource_system.service.AdmissionService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admissions")
public class AdmissionController {

    private final AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService) {
        this.admissionService = admissionService;
    }

    @GetMapping
    public List<Admission> getAllAdmissions() {
        return admissionService.getAllAdmissions();
    }

    @GetMapping("/{id}")
    public Admission getAdmissionById(@PathVariable Long id) {
        return admissionService.getAdmissionById(id);
    }

    @PostMapping
    public Admission createAdmission(@Valid @RequestBody  AdmissionRequest request) {

        return admissionService.createAdmission(
                request.patientId(),
                request.bedId());
    }

//    @DeleteMapping("/{id}")
//    public String deleteAdmission(@PathVariable Long id) {
//        admissionService.deleteAdmission(id);
//        return "Admission deleted successfully";
//    }


    @PatchMapping("/{id}/discharge")
    public Admission dischargeAdmission(@PathVariable Long id) {
        return admissionService.dischargeAdmission(id);
    }


    public record AdmissionRequest(
            @NotNull(message = "Patient ID is required")
            @Positive(message = "Patient ID must be positive")
            Long patientId,

            @NotNull(message = "Bed ID is required")
            @Positive(message = "Bed ID must be positive")
            Long bedId
    ) {}
}
