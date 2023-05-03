package com.se.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.se.enums.MucDoNghiemTrong;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BaoLoi implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3215671605615406321L;
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private long maBaoLoi;
	private String loaiLoi;
	@Column(columnDefinition = "TEXT")
	private String noiDung;
	@Enumerated(EnumType.STRING)
	private MucDoNghiemTrong mucDoNghiemTrong;
	@CreationTimestamp
	private Timestamp thoiGianReport;
	private String nguoiBaoLoi;
}
