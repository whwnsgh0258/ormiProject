// list-sec 이미지
const listPic = document.querySelector('.list-pic');
const btn = document.querySelector('#button');
let pageToPatch = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchImages(pageToPatch, 6);
});

btn.addEventListener('click', () => {
    fetchImages(pageToPatch += 1,6);
});

async function fetchImages(page, limit) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);

        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        // JSON 데이터를 자바스크립트 객체로 파싱
        const datas = await response.json();
        console.log(datas);
        makeImageList(datas);

    } catch (error) {
        console.error(error);
    }
}

function makeImageList(datas) {
    datas.forEach((data) => {
        listPic.insertAdjacentHTML('beforeend', `<li class="img-width"><img src="${data.download_url}" alt=""></li>`);
    });
}

// 카카오맵
const mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.4423021, 126.5714853), // 지도의 중심좌표
        level: 2 // 지도의 확대 레벨
    };

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

function setMapType(maptype) {
    const roadmapControl = document.getElementById('btnRoadmap');
    const skyviewControl = document.getElementById('btnSkyview');
    if (maptype === 'roadmap') {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        roadmapControl.className = 'selected_btn';
        skyviewControl.className = 'map_btn';
    } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyviewControl.className = 'selected_btn';
        roadmapControl.className = 'map_btn';
    }
}

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}


// 마커가 표시될 위치입니다
const markerPosition  = new kakao.maps.LatLng(33.4423021, 126.5714853);

// 마커를 생성합니다
const marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);



// Get references to the modal and button elements
const modal = document.getElementById('modal_content'); // Use getElementById
const modalBtn = document.getElementById('modal_create'); // Use getElementById

// Show modal when the button is clicked
modalBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission if inside a form
    modal.style.display = 'flex';
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// 스크롤 버튼 누르면 최상단으로

const scroll = document.querySelector('.scroll_btn')

scroll.addEventListener('click',function (){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})

