// 모바일 네비게이션 토글
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('is-open');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
  });
});

// 헤더 스크롤 시 배경 강화
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// 문의 폼 제출 (임시 - 실제 연동 전까지 알림만 표시)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('문의가 접수되었습니다. (임시 동작 — 실제 전송 기능은 추후 연동 예정입니다)');
  contactForm.reset();
});

// 푸터 연도 자동 표시
document.getElementById('year').textContent = new Date().getFullYear();

// 섹션 스크롤 리빌 (모션 최소화 선호 시 비활성)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealTargets = document.querySelectorAll(
    '.tape-card, .about__subhead, .timeline, .bento-card, .schedule-table-wrap, .pt-grid > *, .location-grid > *, .contact-grid > *'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// 카카오맵 연동 (선택 사항)
// developers.kakao.com > 내 애플리케이션 > 앱 설정 > 요약 정보에서 "JavaScript 키"를 발급받아
// 아래 큰따옴표 안에 붙여넣으면 자동으로 카카오맵으로 전환됩니다.
// 앱 설정 > 플랫폼 > Web 플랫폼에 반드시 다음 도메인을 등록해야 합니다: https://dnjswls1996.github.io
// 키를 넣지 않으면 지금처럼 오픈스트리트맵이 계속 표시됩니다 (에러 없이 안전하게 동작).
const KAKAO_APP_KEY = '';

if (KAKAO_APP_KEY) {
  const kakaoScript = document.createElement('script');
  kakaoScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`;
  kakaoScript.onload = () => {
    kakao.maps.load(() => {
      const mapEl = document.getElementById('mapEmbed');
      const coords = new kakao.maps.LatLng(37.5171278, 126.9096600);
      mapEl.innerHTML = '';
      const map = new kakao.maps.Map(mapEl, { center: coords, level: 3 });
      new kakao.maps.Marker({ map, position: coords });
    });
  };
  document.head.appendChild(kakaoScript);
}
