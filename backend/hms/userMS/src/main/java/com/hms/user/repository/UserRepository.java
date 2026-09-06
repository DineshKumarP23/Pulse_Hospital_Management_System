package com.hms.user.repository;

import com.hms.user.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("Select new com.hms.user.dto.MonthlyRoleCountDTO( CAST(FUNCTION('MONTHNAME', a.createdAt) as String) , COUNT(a)) FROM User a WHERE a.role = ?1 AND YEAR(a.createdAt) = YEAR(CURRENT_DATE) GROUP BY FUNCTION('MONTH', a.createdAt), CAST(FUNCTION('MONTHNAME', a.createdAt) as String) ORDER BY FUNCTION('MONTH', a.createdAt)")
    List<MonthlyRoleCountDTO> countRegistrationsByRoleGroupedByMonth(Roles role);
}
