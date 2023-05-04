package com.se.dao;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.se.dto.CapNhatIPNThanhToanGiaoDichDTO;
import com.se.dto.ThanhToanGiaoDich2DTO;
import com.se.dto.ThanhToanGiaoDichDTO;
import com.se.dto.UpdateMomoIpnDTO;
import com.se.entity.SinhVien;
import com.se.entity.ThanhToanGiaoDich;
import com.se.repo.SinhVienRepository;
import com.se.repo.ThanhToanGiaoDichRepository;
import com.se.service.ThanhToanGiaoDichService;

@Service
public class ThanhToanGiaoDichImpl implements ThanhToanGiaoDichService{
	
	@Value("${momo.partner.code}")
	private String partnerCode;
	private String alpha = "abcdefghijklmnopqrstuvwxyz"; // a-z
    private String alphaUpperCase = alpha.toUpperCase(); // A-Z
    private String digits = "0123456789"; // 0-9
    private String ALPHA_NUMERIC = alpha + alphaUpperCase + digits;
    private Random generator = new Random();

    @Autowired
    private ThanhToanGiaoDichRepository thanhToanGiaoDichRepository;
    @Autowired
    private SinhVienRepository sinhVienRepository;

    @Override
    public String createTransaction(long studentId, double balance, String unDebtIds, String maIPN) {
        SinhVien sv = sinhVienRepository.findById(studentId).orElse(null);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 10);
        Timestamp timestamp = new Timestamp(calendar.getTimeInMillis());
        String randomMaGiaoDich = randomAlphaNumeric(8);
        if(maIPN.equalsIgnoreCase("EMPTY") || maIPN.equalsIgnoreCase("")) {
        	maIPN = randomMaGiaoDich;
        }
        ThanhToanGiaoDich thanhToanGiaoDich = ThanhToanGiaoDich
	        .builder()
	        .maGiaoDich(randomMaGiaoDich)
	        .sinhVien(sv)
	        .balance(balance)
	        .expiredTime(timestamp)
	        .unDebtIds(unDebtIds)
	        .status(false)
	        .ghiChu("")
	        .maIPN(maIPN)
	        .build();
	    thanhToanGiaoDichRepository.save(thanhToanGiaoDich);
        return randomMaGiaoDich;
    }
    
    private String randomAlphaNumeric(int numberOfCharactor) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < numberOfCharactor; i++) {
            int number = randomNumber(0, ALPHA_NUMERIC.length() - 1);
            char ch = ALPHA_NUMERIC.charAt(number);
            sb.append(ch);
        }
        return sb.toString();
    }
    
    private int randomNumber(int min, int max) {
        return generator.nextInt((max - min) + 1) + min;
    }

	@Override
	public ThanhToanGiaoDich getPaymentById(String id) {
		return thanhToanGiaoDichRepository.findById(id).orElse(null);
	}

	@Override
	public ThanhToanGiaoDich updatePaymentToPassById(ThanhToanGiaoDichDTO thanhToanGiaoDichDTO) {
		if(thanhToanGiaoDichDTO.getMaGiaoDich().equalsIgnoreCase("") || thanhToanGiaoDichDTO.getMaGiaoDich() == "") {//TH tao ra phieu thu do thanh toan = student wallet (maGiaoDich = " ")
			
		}
		ThanhToanGiaoDich thanhToanGiaoDich = thanhToanGiaoDichRepository.findById(thanhToanGiaoDichDTO.getMaGiaoDich()).orElse(null);
		thanhToanGiaoDich.setGhiChu(thanhToanGiaoDichDTO.getGhiChu());
		thanhToanGiaoDich.setStatus(true);
		thanhToanGiaoDich.setBalance(thanhToanGiaoDichDTO.getBalance());
		return thanhToanGiaoDichRepository.save(thanhToanGiaoDich);
	}

	@Override
	public String createTransaction(ThanhToanGiaoDich2DTO thanhToanGiaoDich2DTO) {// Hàm này là để update lại payment cho thành true
		SinhVien sv = sinhVienRepository.findById(thanhToanGiaoDich2DTO.getMaSinhVien()).orElse(null);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        Timestamp timestamp = new Timestamp(calendar.getTimeInMillis());
        String randomMaGiaoDich = randomAlphaNumeric(8);
        ThanhToanGiaoDich thanhToanGiaoDich = ThanhToanGiaoDich
	        .builder()
	        .maGiaoDich(randomMaGiaoDich)
	        .sinhVien(sv)
	        .balance(thanhToanGiaoDich2DTO.getBalance())
	        .expiredTime(timestamp)
	        .unDebtIds(thanhToanGiaoDich2DTO.getUnDebtIds())
	        .status(true)
	        .ghiChu(thanhToanGiaoDich2DTO.getGhiChu())
	        .build();
	    thanhToanGiaoDichRepository.save(thanhToanGiaoDich);
		return randomMaGiaoDich;
	}

	@Override
	public String getTokenByPaymentAndStudentId(String paymentId, long studentId) {
		return thanhToanGiaoDichRepository.getTokenByPaymentAndStudentId(paymentId, studentId);
	}

	@Override
	public ThanhToanGiaoDich getStudentPayedDebtByDebtId(long debtId, long studentId) {
		return thanhToanGiaoDichRepository.getStudentPayedDebtByDebtId(debtId, studentId);
	}

	@Override
	public ThanhToanGiaoDich updatePaymentIPN(CapNhatIPNThanhToanGiaoDichDTO capNhatIPNThanhToanGiaoDichDTO) {
		try {
			ThanhToanGiaoDich thanhToanGiaoDich = thanhToanGiaoDichRepository.findById(capNhatIPNThanhToanGiaoDichDTO.getPaymentId()).orElse(null);
			thanhToanGiaoDich.setMaIPN(capNhatIPNThanhToanGiaoDichDTO.getIpnId());
			System.out.println("thanhToanGiaoDichRepository.save(thanhToanGiaoDich) = " + thanhToanGiaoDichRepository.save(thanhToanGiaoDich));
			return thanhToanGiaoDichRepository.save(thanhToanGiaoDich);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public List<ThanhToanGiaoDich> getInputPaymentsByStudentId(long studentId) {
		return thanhToanGiaoDichRepository.getInputPaymentsByStudentId(studentId);
	}
	
	@Override
	public List<ThanhToanGiaoDich> getOutputPaymentsByStudentId(long studentId) {
		return thanhToanGiaoDichRepository.getOutputPaymentsByStudentId(studentId);
	}

	@Override
	public ThanhToanGiaoDich updateMomoIpn(UpdateMomoIpnDTO updateMomoIpnDTO) {
		try {
			JSONObject json = new JSONObject();
			json.put("partnerCode", partnerCode);
			json.put("requestId", updateMomoIpnDTO.getRequestId());
			json.put("orderId", updateMomoIpnDTO.getOrderId());
			json.put("signature", updateMomoIpnDTO.getSignature());
			json.put("lang", updateMomoIpnDTO.getLang());
			String jsonString = json.toString();
			System.out.println("jsonString="+jsonString);
			String paymentId = updateMomoIpnDTO.getPaymentId();
			ThanhToanGiaoDich thanhToanGiaoDich = thanhToanGiaoDichRepository.findById(paymentId).orElse(null);
			thanhToanGiaoDich.setMaIPN(jsonString);
			return thanhToanGiaoDichRepository.save(thanhToanGiaoDich);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return null;
		}
	}


}
