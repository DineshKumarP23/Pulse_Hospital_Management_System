package com.hms.profileMS.service;

import com.hms.profileMS.dto.DoctorDTO;
import com.hms.profileMS.exception.HmsException;

public interface DoctorService {
    public Long addDoctor(DoctorDTO doctorDTO) throws HmsException;
    public DoctorDTO getDoctorById(Long id) throws HmsException;
}
