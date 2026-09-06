package com.hms.profileMS.repository;

import com.hms.profileMS.entity.Doctor;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface DoctorRepository extends CrudRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);

    Optional<Doctor> findByLicenseNo(String licenseNo);

    @Query("SELECT d.id AS id, d.name AS name FROM Doctor d")
    List<DoctorDropdown> findAllDoctorDropdowns();

    @Query("SELECT d.id AS id, d.name AS name FROM Doctor d WHERE d.id in ?1")
    List<DoctorDropdown> findAllDoctorDropdownsByIds(List<Long> ids);
}
