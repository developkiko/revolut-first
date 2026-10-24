import ShowcasePage from '@/components/ShowcasePage'

const partnerBenefitsGallery = [
  { src: '/img/membership.gif', type: 'image' as const, alt: 'Partner benefits' },
  { src: '/img/boardroom.jpg', type: 'image' as const, alt: 'Partner community' },
]

export default function PartnerBenefitsPage() {
  return (
    <ShowcasePage
      pageKey="partner_benefits"
      heroImage="/img/boardroom.jpg"
      sections={[{ key: 'gallery', items: partnerBenefitsGallery }]}
    />
  )
}
