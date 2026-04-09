export function StructuredData() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hyemin Baek",
    "alternateName": "백혜민",
    "url": "https://hyeminbaek.com",
    "image": "https://hyeminbaek.com/profile.jpg",
    "description": "UI/UX Designer with 15+ years of experience in financial, platform, and marketing design",
    "jobTitle": "UI/UX Designer",
    "email": "greymint100@gmail.com",
    "sameAs": [
      "https://www.linkedin.com/in/hyemin-baek-253b62156/",
      "https://github.com/miniaminia/ux"
    ],
    "knowsAbout": [
      "UI Design",
      "UX Design",
      "Product Design",
      "Financial Design",
      "Web Design",
      "Mobile App Design",
      "Design Education"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
