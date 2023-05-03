package com.se.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.se.dto.BaoLoiDTO;
import com.se.entity.BaoLoi;
import com.se.enums.MucDoNghiemTrong;
import com.se.repo.BaoLoiRepository;
import com.se.service.BaoLoiService;

@Service
public class BaoLoiImplement implements BaoLoiService {

	@Autowired
	private BaoLoiRepository baoLoiRepository;
	
	@Override
	public BaoLoi createReport(BaoLoiDTO baoLoiDTO) {
		try {
			BaoLoi baoLoi = BaoLoi
				.builder()
				.loaiLoi(baoLoiDTO.getLoaiLoi())
				.noiDung(baoLoiDTO.getNoiDung())
				.mucDoNghiemTrong(MucDoNghiemTrong.valueOf(null))
				.nguoiBaoLoi(baoLoiDTO.getNguoiBaoLoi())
				.build();
			return baoLoiRepository.save(baoLoi);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
}
