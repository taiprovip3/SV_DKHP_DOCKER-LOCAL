package com.se.service;

import java.util.List;

import com.se.dto.DiemDTO;
import com.se.entity.Diem;

public interface DiemService {
	public Diem addScore(DiemDTO diemDTO);
	public List<Diem> getScores();
	public List<Diem> getStudentScoresBySemesterId(long studentId, long semesterId);
	public Diem getScoreByStudentIdAndSubjectId(long studentId, long subjectId);
	public String deleteScoreById(long maDiem);
	public int getCounterByXepLoai(String xepLoai);
    public List<Diem> getStudentSummarySubjects(long studentId);
    public List<Diem> getStudentFailedSubjects(long studentId);
}
