/*예약바 팝업*/
//호텔/리조트 선택 팝업창
let selectHotelBtn = document.querySelector(".select-hotel a");//클릭할 영역
let hotelPop = document.querySelector(".hotel-popup");//열릴 팝업
let roomPop = do
let closeBtn = hotelPop.querySelector(".close-btn"); // 닫기 버튼
const hotelBtns = document.querySelectorAll(".hotel-popup .btn-list:first-of-type .popup-btn");
const selectCompleteBtn = hotelPop.querySelector(".select-btn"); // 선택완료 버튼

const targetP = document.querySelector(".re-data.select-hotel");  // value 속성이 변경될 p 태그
const targetA = targetP.querySelector("a");                       // 화면 텍스트가 변경될 a 태그

// 1. 호텔/리조트 선택 팝업창 열기
selectHotelBtn.addEventListener("click", (e) => {
    e.preventDefault(); // a 태그의 기본 스크롤 이동 동작 방지
    hotelPop.style.display = "flex";
});

// 2. 호텔/리조트 선택 팝업창 닫기
closeBtn.addEventListener("click", () => {
    hotelPop.style.display = "none";
});

// 3. 호텔/리조트 선택 버튼 클릭 이벤트 (.on 클래스 토글 & 값 임시 저장)
hotelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // 1) 모든 버튼에서 .on 클래스 제거 후 클릭된 버튼에 추가
        hotelBtns.forEach(item => item.classList.remove("on"));
        btn.classList.add("on");

        // 2) 클릭된 버튼의 value와 텍스트 가져오기
        const selectedValue = btn.getAttribute("value"); // "resort" 또는 "hotel"
        const selectedText = btn.textContent;             // "해비치 리조트 제주" 등

        // 3) p태그 value 속성과 a태그 화면 텍스트를 즉시 동시에 업데이트
        targetP.setAttribute("value", selectedValue);
        targetA.textContent = selectedText;
    });
});


// 4. 선택완료 버튼 클릭 이벤트 (p태그 value/텍스트 반영 & 팝업 닫기)
selectCompleteBtn.addEventListener("click", () => {
    hotelPop.style.display = "none";
});