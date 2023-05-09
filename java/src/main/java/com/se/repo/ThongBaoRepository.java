package com.se.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.se.entity.ThongBao;

@Repository
public interface ThongBaoRepository extends CrudRepository<ThongBao, Long> {
	@Query(value = "SELECT * FROM thong_bao WHERE ma_sinh_vien = ?1 ORDER BY is_read ASC, id DESC", nativeQuery = true)
	public List<ThongBao> getNotificationsByStudentId(long studentId);
}
