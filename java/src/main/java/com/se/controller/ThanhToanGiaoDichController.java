package com.se.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.se.dto.CapNhatIPNThanhToanGiaoDichDTO;
import com.se.dto.ThanhToanGiaoDich2DTO;
import com.se.dto.ThanhToanGiaoDichDTO;
import com.se.dto.UpdateMomoIpnDTO;
import com.se.entity.ThanhToanGiaoDich;
import com.se.service.ThanhToanGiaoDichService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:19006")
public class ThanhToanGiaoDichController {
    
    @Autowired
    private ThanhToanGiaoDichService thanhToanGiaoDichService;

    @GetMapping("/payment/createTransaction/{studentId}/{balance}/{unDebtIds}/{maIPN}")
    public String createTransaction(@PathVariable long studentId, @PathVariable double balance, @PathVariable String unDebtIds, @PathVariable String maIPN) {
        return thanhToanGiaoDichService.createTransaction(studentId, balance, unDebtIds, maIPN);
    }
    
    @GetMapping("/payment/getPaymentById/{paymentId}")
    public ThanhToanGiaoDich getPaymentById(@PathVariable String paymentId) {
    	return thanhToanGiaoDichService.getPaymentById(paymentId);
    }
    
    @PostMapping("/payment/updatePaymentToPassById")
    public ThanhToanGiaoDich updatePaymentToPassById(@RequestBody ThanhToanGiaoDichDTO thanhToanGiaoDichDTO) {
    	return thanhToanGiaoDichService.updatePaymentToPassById(thanhToanGiaoDichDTO);
    }
    
    @PostMapping("/payment/createTransaction")
    public String createTransaction(@RequestBody ThanhToanGiaoDich2DTO thanhToanGiaoDich2DTO) {
        return thanhToanGiaoDichService.createTransaction(thanhToanGiaoDich2DTO);
    }

    @GetMapping("/payment/getTokenByPaymentAndStudentId/{paymentId}/{studentId}")
    public String getTokenByPaymentAndStudentId(@PathVariable String paymentId, @PathVariable long studentId) {
        return thanhToanGiaoDichService.getTokenByPaymentAndStudentId(paymentId, studentId);
    }

    @GetMapping("/payment/getStudentPayedDebtByDebtId/{debtId}/{studentId}")
    public ThanhToanGiaoDich getStudentPayedDebtByDebtId(@PathVariable long debtId, @PathVariable long studentId) {
        return thanhToanGiaoDichService.getStudentPayedDebtByDebtId(debtId, studentId);
    }
    
    @PutMapping("/payment/updatePaymentIPN")// Hàm này dành cho paypal
    public ThanhToanGiaoDich updatePaymentIPN(@RequestBody CapNhatIPNThanhToanGiaoDichDTO capNhatIPNThanhToanGiaoDichDTO) {
    	System.out.println("capNhatIPNThanhToanGiaoDichDTO"+capNhatIPNThanhToanGiaoDichDTO);
    	return thanhToanGiaoDichService.updatePaymentIPN(capNhatIPNThanhToanGiaoDichDTO);
    }
    
    @GetMapping("/payment/getInputPaymentsByStudentId/{studentId}")
    public List<ThanhToanGiaoDich> getInputPaymentsByStudentId(@PathVariable long studentId) {
    	return thanhToanGiaoDichService.getInputPaymentsByStudentId(studentId);
    }
    
    @GetMapping("/payment/getOutputPaymentsByStudentId/{studentId}")
    public List<ThanhToanGiaoDich> getOutputPaymentsByStudentId(@PathVariable long studentId) {
    	return thanhToanGiaoDichService.getOutputPaymentsByStudentId(studentId);
    }
    
    @PostMapping("/payment/updateMomoIpn")// Recharge
    public ThanhToanGiaoDich updateMomoIpn(@RequestBody UpdateMomoIpnDTO updateMomoIpnDTO) {
    	return thanhToanGiaoDichService.updateMomoIpn(updateMomoIpnDTO);
    }
    
    
}
