package com.se.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

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
public class ThanhToanGiaoDich implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = -4124609587921549405L;
	@Id
    private String maGiaoDich;
	@Column(columnDefinition = "VARCHAR(255) default ''")
	private String maIPN;
	@Column(columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
	private Timestamp createdTime;
    private Timestamp expiredTime;
    private double balance;
    private String unDebtIds;
    private boolean status;
    private String ghiChu;
    @ManyToOne
    @JoinColumn(name = "maSinhVien", nullable = false)
    private SinhVien sinhVien;
}
