package com.se.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.se.entity.BaoLoi;

@Repository
public interface BaoLoiRepository extends CrudRepository<BaoLoi, Long> {
}
