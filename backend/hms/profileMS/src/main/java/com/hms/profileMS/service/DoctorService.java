package com.hms.profileMS.service;

import com.hms.profileMS.dto.DoctorDTO;
import com.hms.profileMS.exception.HmsException;

public interface DoctorService {
    public Long addDoctor(DoctorDTO doctorDTO) throws HmsException;

    public DoctorDTO getDoctorById(Long id) throws HmsException;

    public DoctorDTO updateDoctor(DoctorDTO doctorDTO) throws HmsException;

    public Boolean doctorExists(Long id) throws HmsException;

    public List<DoctorDropdown> getDoctorDropdowns() throws HmsException;

    public List<DoctorDTO> getAllDoctors() throws HmsException;

    public List<DoctorDropdown> getDoctorsById(List<Long> ids) throws HmsException;
}
