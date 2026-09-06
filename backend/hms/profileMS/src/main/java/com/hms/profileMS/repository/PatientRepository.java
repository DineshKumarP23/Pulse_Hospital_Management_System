package com.hms.profileMS.repository;

import com.hms.profileMS.entity.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends CrudRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);

    Optional<Patient> findByAadharNo(String aadharNo);

    @Query("SELECT d.id AS id, d.name AS name FROM Patient d WHERE d.id in ?1")
    List<DoctorDropdown> findAllPatientDropdownsByIds(List<Long> ids);
}
