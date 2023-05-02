package com.se.dao;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.dto.ThongBaoDTO;
import com.se.entity.SinhVien;
import com.se.entity.ThongBao;
import com.se.repo.SinhVienRepository;
import com.se.repo.ThongBaoRepository;
import com.se.service.ThongBaoService;
@Service
public class ThongBaoImpl implements ThongBaoService {
	
	@Autowired
	private ThongBaoRepository thongBaoRepository;
	@Autowired
	private SinhVienRepository sinhVienRepository;
	
	@Override
	public ThongBao createNotification(ThongBaoDTO thongBaoDTO) {
		SinhVien sinhVien = sinhVienRepository.findById(thongBaoDTO.getStudentId()).orElse(null);
		ThongBao thongBao = ThongBao
				.builder()
				.title(thongBaoDTO.getTitle())
				.message(thongBaoDTO.getMessage())
				.linking(thongBaoDTO.getLinking())
				.isRead(false)
				.sinhVien(sinhVien)
				.build();
		return thongBaoRepository.save(thongBao);
	}

	@Override
	public List<ThongBao> getNotificationsByStudentId(long studentId) {
		try {
			return thongBaoRepository.getNotificationsByStudentId(studentId);
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<ThongBao>();
		}
	}

	@Override
	public ThongBao getNotificationById(long notificationId) {
		return thongBaoRepository.findById(notificationId).orElse(null);
	}

}
