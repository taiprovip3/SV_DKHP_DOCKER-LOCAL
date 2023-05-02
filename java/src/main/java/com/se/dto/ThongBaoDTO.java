package com.se.dto;

import lombok.Data;

@Data
public class ThongBaoDTO {
	private String title;
	private String message;
	private String linking;
	private boolean isRead;
	private long studentId;
}
