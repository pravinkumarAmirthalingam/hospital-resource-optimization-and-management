
package com.hospital.resource.hospital_resource_system.exception;

public record ApiError(
        int status,
        String error,
        String message,
        String path
) {}
