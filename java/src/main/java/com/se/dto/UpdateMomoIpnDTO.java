package com.se.dto;

import lombok.Data;

@Data
public class UpdateMomoIpnDTO {
	private String paymentId;
	private String requestId;
	private String orderId;
	private String signature;
	private String lang;
}
