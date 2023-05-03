package com.se.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.se.dto.BaoLoiDTO;
import com.se.entity.BaoLoi;
import com.se.service.BaoLoiService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:19006")
public class BaoLoiController {
	
	@Autowired
	private BaoLoiService baoLoiService;

	@PostMapping("/report")
	public BaoLoi createReport(@RequestBody BaoLoiDTO baoLoiDTO) {
		return baoLoiService.createReport(baoLoiDTO);
	}
}
