package com.se.service;

import java.util.List;

import com.se.dto.CapNhatIPNThanhToanGiaoDichDTO;
import com.se.dto.ThanhToanGiaoDich2DTO;
import com.se.dto.ThanhToanGiaoDichDTO;
import com.se.dto.UpdateMomoIpnDTO;
import com.se.entity.ThanhToanGiaoDich;

public interface ThanhToanGiaoDichService {
    public String createTransaction(long studentId, double balance, String unDebtIds, String maIPN);
    public ThanhToanGiaoDich getPaymentById(String id);
	public ThanhToanGiaoDich updatePaymentToPassById(ThanhToanGiaoDichDTO thanhToanGiaoDichDTO);
	public String createTransaction(ThanhToanGiaoDich2DTO thanhToanGiaoDich2DTO);
    public String getTokenByPaymentAndStudentId(String paymentId, long studentId);
    public ThanhToanGiaoDich getStudentPayedDebtByDebtId(long debtId, long studentId);
	public ThanhToanGiaoDich updatePaymentIPN(CapNhatIPNThanhToanGiaoDichDTO capNhatIPNThanhToanGiaoDichDTO);
	public List<ThanhToanGiaoDich> getInputPaymentsByStudentId(long studentId);
	public List<ThanhToanGiaoDich> getOutputPaymentsByStudentId(long studentId);
	public ThanhToanGiaoDich updateMomoIpn(UpdateMomoIpnDTO updateMomoIpnDTO);
}
