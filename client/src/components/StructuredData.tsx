export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.greymint.kr/#person",
    "name": "백혜민",
    "alternateName": ["Hyemin Baek", "greymint", "민트쌤"],
    "url": "https://www.greymint.kr",
    "image": {
      "@type": "ImageObject",
      "url": "https://www.greymint.kr/images/hero_photo.jpg",
      "width": 400,
      "height": 534
    },
    "description": "복잡함을 덜어내고 본질만 남기는 UI/UX 디자이너 백혜민. 삼성전자·하나은행·삼성증권 등 10년+ 프로젝트 경험.",
    "jobTitle": "UI/UX 디자이너",
    "email": "greymint100@gmail.com",
    "nationality": "KR",
    "sameAs": [
      "https://www.linkedin.com/in/hyemin-baek-253b62156/",
      "https://github.com/miniaminia/ux",
      "https://www.greymint.kr"
    ],
    "knowsAbout": [
      "UI 디자인", "UX 디자인", "프로덕트 디자인",
      "금융 UI 디자인", "웹 디자인", "모바일 앱 디자인", "디자인 교육"
    ]
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://www.greymint.kr/#profilepage",
    "url": "https://www.greymint.kr",
    "name": "백혜민 | UI/UX 디자이너 포트폴리오",
    "description": "복잡함을 덜어내고 본질만 남기는 UI/UX 디자이너 백혜민의 포트폴리오.",
    "inLanguage": "ko",
    "dateModified": "2026-05-07T00:00:00+09:00",
    "mainEntity": { "@id": "https://www.greymint.kr/#person" },
    "about": { "@id": "https://www.greymint.kr/#person" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "백혜민 포트폴리오",
          "item": "https://www.greymint.kr"
        }
      ]
    }
  };

  // JSON.stringify on static objects is safe — no user input involved
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
