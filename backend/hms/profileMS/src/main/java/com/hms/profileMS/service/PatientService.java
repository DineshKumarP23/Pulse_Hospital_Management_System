package com.hms.profileMS.service;

import com.hms.profileMS.dto.PatientDTO;
import com.hms.profileMS.exception.HmsException;

public interface PatientService {
    public Long addPatient(PatientDTO patientDTO) throws HmsException;
    public PatientDTO getPatientById(Long id) throws HmsException;
}
