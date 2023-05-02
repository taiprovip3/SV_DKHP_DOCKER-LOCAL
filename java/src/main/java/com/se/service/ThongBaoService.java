package com.se.service;

import java.util.List;

import com.se.dto.ThongBaoDTO;
import com.se.entity.ThongBao;

public interface ThongBaoService {
	public ThongBao createNotification(ThongBaoDTO thongBaoDTO);
	public List<ThongBao> getNotificationsByStudentId(long studentId);
	public ThongBao getNotificationById(long notificationId);
}
