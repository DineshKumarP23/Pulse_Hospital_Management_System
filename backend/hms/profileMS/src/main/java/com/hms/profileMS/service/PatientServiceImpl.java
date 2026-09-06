package com.hms.profileMS.service;

import com.hms.profileMS.dto.PatientDTO;
import com.hms.profileMS.entity.Patient;
import com.hms.profileMS.exception.HmsException;
import com.hms.profileMS.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Long addPatient(PatientDTO patientDTO) throws HmsException {
        System.out.println(patientDTO);
        if (patientDTO.getEmail() != null && patientRepository.findByEmail(patientDTO.getEmail()).isPresent()) {

            throw new HmsException("PATIENT_ALREADY_EXISTS");
        }
        if (patientDTO.getAadharNo() != null
                && patientRepository.findByAadharNo(patientDTO.getAadharNo()).isPresent()) {
            throw new HmsException("PATIENT_ALREADY_EXISTS");
        }
        return patientRepository.save(patientDTO.toEntity()).getId();

    }

    @Override
    public PatientDTO getPatientById(Long id) throws HmsException {
        return patientRepository.findById(id).orElseThrow(() -> new HmsException("PATIENT_NOT_FOUND")).toDTO();
    }

    @Override
    public PatientDTO updatePatient(PatientDTO patientDTO) throws HmsException {
        patientRepository.findById(patientDTO.getId()).orElseThrow(() -> new HmsException("PATIENT_NOT_FOUND"));
        return patientRepository.save(patientDTO.toEntity()).toDTO();
    }

    @Override
    public Boolean patientExists(Long id) throws HmsException {
        return patientRepository.existsById(id);
    }

    @Override
    public List<DoctorDropdown> getPatientsById(List<Long> ids) throws HmsException {
        return patientRepository.findAllPatientDropdownsByIds(ids);
    }

    @Override
    public List<PatientDTO> getAllPatients() throws HmsException {
        return ((List<Patient>) patientRepository.findAll()).stream().map(patient -> patient.toDTO()).toList();
    }
}
