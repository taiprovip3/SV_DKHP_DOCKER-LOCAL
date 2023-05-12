/**
 * 
 * @description Giải thuật:
 * 1. Khi nhấp vào radio button loaiHoc
 * 2. Thì sẽ filter 2 thứ: table danh sách môn học phần, danh sách lớp học phần đang mở
 * 3. Nếu loaiHoc là học cải thiện thì sẽ render thêm cột điểm tổng kết tất cả môn bản thân đã học
 * 4. Nếu loaiHoc là học lại thì sẽ CHỈ RENDER những môn học mà fail (render ít hơn)
 * 
 */
async function onLoaiHocChange(loaiHoc) {// Khi nhấp vào radio button loại học. Lọc này dành cho lớp học phần chứ ko phải cho subject
    selected_loai_hoc = loaiHoc;
    const selected_course_id = document.getElementById("select_course").value;
    if(selected_course_id == 0 || !selected_course_id) {// Nếu chọn select học kỳ thì mới làm, ko thì không làm gì hết
        return;
    }
    if(loaiHoc == "HOC_CAI_THIEN") {
        const headerLength = $("#tHeadSubjectCourseSelected th").length;
        if(headerLength <= 7) {
            $("#tHeadSubjectCourseSelected tr").append("<th>Điểm tổng kết</th>");
        }
        const diems = await getStudentSummarySubjects();
        let myLoop = "";
        if(diems.length <= 0) {
            myLoop += 
            '<tr>'+
                '<tr>'+
                    '<td colspan="8">Không có dữ liệu điểm bất kì môn học nào!</td>'+
                '</tr>'+
            '</tr>';
        } else {
            for (let i = 0; i < diems.length; i++) {// Mỗi diem = 1 subject
                var loaiMonBeLike = "null";
                if(diems[i].lopHocPhan.monHoc.loaiMon === "TU_CHON")
                    loaiMonBeLike = '<i class="fas fa-times-circle text-danger" data-bs-toggle="tooltip" title="Bạn có thể tự do đăng ký môn này hoặc không hoặc các môn có tích đỏ khác để lấy đủ tín chỉ học phần TU_CHON yêu cầu!"></i>';
                else loaiMonBeLike = '<i class="fas fa-check-circle text-success" data-bs-toggle="tooltip" title="Đây là môn bắt buộc phải học trong học kỳ này. Nếu không đăng ký sẽ bị trễ tiến độ học, hậu quả tệ về sau!"></i>';
                myLoop += `<tr><td><input type="radio" name="SelectedSubject" id="${diems[i].lopHocPhan.monHoc.maMonHoc}" value="${diems[i].lopHocPhan.monHoc.maMonHoc}" class="form-check-input" onclick="audio.play();" /></td><td>${i}</td><td>${diems[i].lopHocPhan.monHoc.maMonHoc}</td><td>${diems[i].lopHocPhan.monHoc.tenMonHoc}</td><td>${diems[i].lopHocPhan.monHoc.soTinChi}</td><td>${loaiMonBeLike}</td><td>${diems[i].lopHocPhan.monHoc.maMonYeuCau}</td><td class="text-success fw-bold">${diems[i].diemTongKet.toFixed(1)}</td></tr>`;
            }
            $("#tBodySubjectCourseSelected").html(myLoop);
        }
    } else {
        if(loaiHoc == "HOC_LAI") {
            const headerLength = $("#tHeadSubjectCourseSelected th").length;
            if(headerLength <= 7) {
                $("#tHeadSubjectCourseSelected tr").append("<th>Điểm tổng kết</th>");
            }
            const diems = await getStudentFailedSubjects();
            let myLoop = "";
            if(diems.length <= 0) {
                myLoop += 
                '<tr>'+
                    '<tr>'+
                        '<td colspan="8">Không tìm thấy môn học yếu cần học lại <i class="far fa-check-circle text-success"></i></td>'+
                    '</tr>'+
                '</tr>';
            } else {
                for (let i = 0; i < diems.length; i++) {// Mỗi diem = 1 subject
                    var loaiMonBeLike = "null";
                    if(diems[i].lopHocPhan.monHoc.loaiMon === "TU_CHON")
                        loaiMonBeLike = '<i class="fas fa-times-circle text-danger" data-bs-toggle="tooltip" title="Bạn có thể tự do đăng ký môn này hoặc không hoặc các môn có tích đỏ khác để lấy đủ tín chỉ học phần TU_CHON yêu cầu!"></i>';
                    else loaiMonBeLike = '<i class="fas fa-check-circle text-success" data-bs-toggle="tooltip" title="Đây là môn bắt buộc phải học trong học kỳ này. Nếu không đăng ký sẽ bị trễ tiến độ học, hậu quả tệ về sau!"></i>';
                    myLoop += `<tr><td><input type="radio" name="SelectedSubject" id="${diems[i].lopHocPhan.monHoc.maMonHoc}" value="${diems[i].lopHocPhan.monHoc.maMonHoc}" class="form-check-input" onclick="audio.play();" /></td><td>${i}</td><td>${diems[i].lopHocPhan.monHoc.maMonHoc}</td><td>${diems[i].lopHocPhan.monHoc.tenMonHoc}</td><td>${diems[i].lopHocPhan.monHoc.soTinChi}</td><td>${loaiMonBeLike}</td><td>${diems[i].lopHocPhan.monHoc.maMonYeuCau}</td><td class="text-danger fw-bold">${diems[i].diemTongKet.toFixed(1)}</td></tr>`;
                }
            }
            $("#tBodySubjectCourseSelected").html(myLoop);
        }
        if(loaiHoc == "HOC_MOI") {
            const headerAvaiable = $("#tHeadSubjectCourseSelected th:last-child");
            headerAvaiable.remove();
            $.ajax({//Xử lý: lấy danh sách subject by courseId
                type: "POST",
                url: pathNodejs+"/student/dkhp/getSubjectsByCourseId",
                data: JSON.stringify({maKhoaHoc: selected_ma_khoa_hoc}),
                contentType: 'application/json',
                success: function(subjects) {
                    if(subjects.length <= 0) {
                        toastr.error('Học kỳ này sinh viên chưa được phép đăng ký. Vui lòng liên hệ trực tiếp giáo vụ khoa để được xin mở lớp!', 'Không có học phần');
                    }
                    var myLoop = "";
                    for (let i = 0; i < subjects.length; i++) {
                        var loaiMonBeLike = "null";
                        if(subjects[i].loaiMon === "TU_CHON")
                            loaiMonBeLike = '<i class="fas fa-times-circle text-danger" data-bs-toggle="tooltip" title="Bạn có thể tự do đăng ký môn này hoặc không hoặc các môn có tích đỏ khác để lấy đủ tín chỉ học phần TU_CHON yêu cầu!"></i>';
                        else loaiMonBeLike = '<i class="fas fa-check-circle text-success" data-bs-toggle="tooltip" title="Đây là môn bắt buộc phải học trong học kỳ này. Nếu không đăng ký sẽ bị trễ tiến độ học, hậu quả tệ về sau!"></i>';
                        myLoop += '<tr><td><input type="radio" name="SelectedSubject" id="'+ subjects[i].maMonHoc +'" value="'+ subjects[i].maMonHoc +'" class="form-check-input" onclick="audio.play();" /></td><td>'+ i +'</td><td>'+ subjects[i].maMonHoc +'</td><td>'+ subjects[i].tenMonHoc +'</td><td>'+ subjects[i].soTinChi +'</td><td>'+ loaiMonBeLike +'</td><td>'+ subjects[i].maMonYeuCau +'</td></tr>';
                    }
                    $("#tBodySubjectCourseSelected").html(myLoop);
                }, error: function(error) {
                    console.error(error);
                }
            });
        }
    }
    // Thực hiện filter cho listUnitClasses
    const div2Content = $("#ListUnitClass").text();
    if(div2Content.length > 150) {// Nếu có render ra div2 thì tiến hành filter
        renderUnitClassBySujectId();
    }
}

function getStudentSummarySubjects() {
    return $.ajax({
        type: "GET",
        url: pathNodejs+"/student/pattern/getStudentSummarySubjects",
        contentType: 'application/json',
    })
    .then(diems => diems);
}
function getStudentFailedSubjects() {
    return $.ajax({
        type: "GET",
        url: pathNodejs+"/student/pattern/getStudentFailedSubjects",
        contentType: 'application/json',
    })
    .then(diems => diems);
}