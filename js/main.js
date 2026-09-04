/*예약바 팝업*/
//호텔/리조트 선택 팝업창
let hotelResortPopup = document.querySelector(".hotel-resort-popup");
let hotelPop = document.querySelector(".hotel-popup");

//호텔/리조트 선택 팝업창열기
hotelResortPopup.addEventListener("click",()=>{
    hotelPop.style.display = "flex";
})