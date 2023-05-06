package com.se.dto;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.Data;

@Data
public class ThongBaoKhoaDTO {
	private String tieuDe;
	private String noiDung;
	private String ngayXuatBan;
	private long maKhoa;

	public ThongBaoKhoaDTO() {
		this.ngayXuatBan = LocalDate.now().format(DateTimeFormatter.ISO_DATE);
	}

	public ThongBaoKhoaDTO(String tieuDe, String noiDung, String ngayXuatBan, long maKhoa) {
		this.tieuDe = tieuDe;
		this.noiDung = noiDung;
		this.maKhoa = maKhoa;
		if (ngayXuatBan == null || ngayXuatBan.isEmpty()) {
			this.ngayXuatBan = LocalDate.now().format(DateTimeFormatter.ISO_DATE);
		} else {
			this.ngayXuatBan = ngayXuatBan;
		}
	}
}
