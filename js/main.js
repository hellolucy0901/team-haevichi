/*예약바 팝업*/
//호텔/리조트 선택 팝업창
let selectHotelBtn = document.querySelector(".select-hotel a");//클릭할 영역
let selectDateBtn = document.querySelector(".select-date a");   // 체크인/체크아웃 클릭 영역



let roomPopup = document.querySelector('.room-popup');//객실/성인/어린이 열릴 팝업
let hotelPop = document.querySelector(".hotel-popup");//호텔/리조트 열릴 팝업
let datePop = document.querySelector(".date-popup");//날짜 선택 열릴 팝업

const addRoomBtn = document.querySelector('.add-room-btn');
const roomList = document.querySelector('.select-room-list');
const roomTemplate = roomList?.querySelector('.addRoom')?.cloneNode(true); // 객실1 원본을 깨끗한 상태로 미리 복제해서 보관
const roomCountDisplay = document.querySelector('.re-data.select-room span'); // 예약바에 표시되는 객실 수 (1 → 2)
const adultTotalDisplay = document.querySelector('.re-data.select-adult span'); // 예약바에 표시되는 성인 총 인원수
const childTotalDisplay = document.querySelector('.re-data.select-child span'); // 예약바에 표시되는 어린이 총 인원수
let roomCount = roomList ? roomList.querySelectorAll('.addRoom').length : 1;

// 객실, 성인, 어린이 타겟 영역 (각 영역 전체 클릭 또는 .re-data 클릭)
let roomTrigger = document.querySelector('.select-room')?.closest('div');
let adultTrigger = document.querySelector('.select-adult')?.closest('div');
let childTrigger = document.querySelector('.select-child')?.closest('div');

let closehotelBtn = hotelPop.querySelector(".close-btn"); // 닫기 버튼
let closedateBtn = datePop.querySelector(".close-btn"); // 닫기 버튼
let closeroomBtn = roomPopup?.querySelector('.close-btn');
// 팝업 내부 버튼

const selectBtn = roomPopup?.querySelector('.select-btn');
const dateSelectBtn = datePop.querySelector(".select-btn"); // 날짜 팝업 선택완료 버튼
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
closehotelBtn.addEventListener("click", () => {
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

// 4. 날짜 선택 열릴 팝업 팝업창 열기
selectDateBtn.addEventListener("click", (e) => {
    e.preventDefault(); // a 태그의 기본 스크롤 이동 동작 방지
    datePop.style.display = "flex";
});

// 5. 날짜 선택 열릴 팝업 팝업창 닫기
closedateBtn.addEventListener("click", () => {
    datePop.style.display = "none";
});

closedateBtn.addEventListener("click", () => {
    datePop.style.display = "none";
});

// 6. 객실/성인/어린이 팝업 열기 함수
    const openRoomPopup = () => {
        if (roomPopup) {
            roomPopup.style.display = 'block';
        }
    };

    // 6-1. 모든 객실의 성인/어린이 인원수를 합산해서 예약바에 반영하는 함수
    const updateTotalGuestCounts = () => {
        let adultTotal = 0;
        let childTotal = 0;

        roomList?.querySelectorAll('.addRoom').forEach(room => {
            room.querySelectorAll('.item-list > div').forEach(group => {
                const isChild = group.querySelector('strong')?.textContent.trim() === '어린이';
                const count = parseInt(group.querySelector('.count-wrap span')?.textContent, 10) || 0;
                if (isChild) {
                    childTotal += count;
                } else {
                    adultTotal += count;
                }
            });
        });

        if (adultTotalDisplay) adultTotalDisplay.textContent = adultTotal;
        if (childTotalDisplay) childTotalDisplay.textContent = childTotal;
    };

    updateTotalGuestCounts(); // 페이지 로드 시 초기값 기준으로 한 번 계산
    
    [roomTrigger, adultTrigger, childTrigger].forEach(trigger => {
        if (trigger) {
            trigger.style.cursor = 'pointer'; // 마우스 커서 포인터 스타일 추가
            trigger.addEventListener('click', (e) => {
                e.stopPropagation(); // Event Bubbling 방지
                openRoomPopup();
            });
        }
    });

//7. 호텔 선택완료 버튼 클릭 이벤트 (p태그 value/텍스트 반영 & 팝업 닫기)
selectCompleteBtn.addEventListener("click", () => {
    hotelPop.style.display = "none"; // 1. 호텔 팝업 닫기
    datePop.style.display = "flex";  // 2. 날짜 팝업 열기
});

// 8. 날짜 선택 팝업 선택완료 버튼 클릭 이벤트 (날짜 팝업 닫기 & 객실 팝업 열기)
dateSelectBtn.addEventListener("click", () => {
    datePop.style.display = "none"; // 1. 날짜 팝업 닫기
    openRoomPopup();                // 2. 객실/인원 팝업 열기
});

// 9. 객실추가/삭제 토글 버튼 (버튼 하나가 상태에 따라 '+ 객실추가' ↔ '- 객실삭제'로 전환)
// ※ '-' 아이콘은 style-seonin.css에 .add-room-btn.is-delete::before 규칙으로 추가되어 있어야 합니다.
addRoomBtn?.addEventListener('click', () => {
    if (roomCount === 1) {
        // ------- 객실 추가 -------
        if (!roomTemplate) return; // 복제할 원본 템플릿이 없으면 중단

        roomCount++; // 1) 객실 번호 1 증가

        const newRoom = roomTemplate.cloneNode(true); // 2) 원본 템플릿(객실1) 복제
        newRoom.querySelector('p').textContent = `객실${roomCount}`; // 3) 객실 번호 텍스트 변경

        // 4) 복제된 카드의 성인/어린이 인원수 기본값 설정
        const counts = newRoom.querySelectorAll('.count-wrap span');
        counts[0].textContent = '2'; // 성인 기본값
        counts[1].textContent = '0'; // 어린이 기본값

        roomList.prepend(newRoom); // 5) 새 객실 카드를 리스트 맨 위에 추가
        roomPopup?.classList.add('is-expanded'); // 6) 팝업 높이 확장

        // 7) 버튼을 '객실삭제' 상태로 전환
        addRoomBtn.textContent = '객실삭제';
        addRoomBtn.classList.add('is-delete');

        // 8) 예약바의 객실 수 표시(1 → 2) 갱신
        if (roomCountDisplay) roomCountDisplay.textContent = roomCount;

        // 9) 예약바의 성인/어린이 총 인원수 갱신 (새로 추가된 객실 인원 포함)
        updateTotalGuestCounts();
    } else {
        // ------- 객실 삭제 -------
        const topRoom = roomList?.querySelector('.addRoom'); // 가장 최근 추가된(맨 위) 객실 카드
        topRoom?.remove(); // 1) 객실 카드 제거

        roomCount--; // 2) 객실 개수 감소

        roomPopup?.classList.remove('is-expanded'); // 3) 팝업 원래 크기로 복원

        // 4) 버튼을 다시 '객실추가' 상태로 전환
        addRoomBtn.textContent = '객실추가';
        addRoomBtn.classList.remove('is-delete');

        // 5) 예약바의 객실 수 표시(2 → 1) 갱신
        if (roomCountDisplay) roomCountDisplay.textContent = roomCount;

        // 6) 예약바의 성인/어린이 총 인원수 갱신 (삭제된 객실 인원 제외)
        updateTotalGuestCounts();
    }
});

// 10. 객실별 성인/어린이 인원수 +/- 버튼 (이벤트 위임: 객실1은 물론, 나중에 복제되는 객실2에도 자동 적용)
roomList?.addEventListener('click', (e) => {
    const countBtn = e.target.closest('.count-wrap button'); // 클릭된 게 +/- 버튼인지 확인
    if (!countBtn) return;

    const countWrap = countBtn.closest('.count-wrap'); // 해당 인원수 카운터 영역
    const countSpan = countWrap.querySelector('span');
    let count = parseInt(countSpan.textContent, 10); // 현재 인원수

    // 성인/어린이 구분 (같은 그룹 안의 <strong> 텍스트로 판별)
    const isChild = countWrap.parentElement.querySelector('strong')?.textContent.trim() === '어린이';
    const MIN_COUNT = isChild ? 0 : 1; // 어린이는 0명, 성인은 1명까지 감소 가능
    const MAX_COUNT = 2;               // 성인/어린이 모두 최대 2명까지 증가 가능

    if (countBtn.textContent.trim() === '+') {
        if (count < MAX_COUNT) count++; // 최대 인원 이하일 때만 증가
    } else {
        if (count > MIN_COUNT) count--; // 최소 인원 초과일 때만 감소
    }

    countSpan.textContent = count; // 변경된 인원수 반영

    updateTotalGuestCounts(); // 예약바의 성인/어린이 총 인원수 갱신
});