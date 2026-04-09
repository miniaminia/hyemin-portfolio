export function StructuredData() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "백혜민",
    "alternateName": "Hyemin Baek",
    "url": "https://greymint.kr",
    "image": "https://greymint.kr/images/profile.jpg",
    "description": "15년 이상의 경험을 가진 UI/UX 디자이너. 금융, 플랫폼, 마케팅, 앱 디자인 전문.",
    "jobTitle": "UI/UX 디자이너",
    "email": "greymint100@gmail.com",
    "sameAs": [
      "https://www.linkedin.com/in/hyemin-baek-253b62156/",
      "https://github.com/miniaminia/ux"
    ],
    "knowsAbout": [
      "UI 디자인",
      "UX 디자인",
      "프로덕트 디자인",
      "금융 디자인",
      "웹 디자인",
      "모바일 앱 디자인",
      "디자인 교육"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
