package com.se.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.se.dto.ThongBaoDTO;
import com.se.entity.ThongBao;
import com.se.service.ThongBaoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:19006")
public class ThongBaoController {
	
	@Autowired
	private ThongBaoService thongBaoService;
	
	@PostMapping("/announcement")
	public ThongBao createNotification(@RequestBody ThongBaoDTO thongBaoDTO) {
		return thongBaoService.createNotification(thongBaoDTO);
	}
	
	@GetMapping("/announcement/getNotificationsByStudentId/{studentId}")
	public List<ThongBao> getNotificationsByStudentId(@PathVariable long studentId) {
		return thongBaoService.getNotificationsByStudentId(studentId);
	}
	
	@GetMapping("/announcement/getNotificationById/{notificationId}")
	public ThongBao getNotificationById(@PathVariable long notificationId) {
		return thongBaoService.getNotificationById(notificationId);
	}
}
