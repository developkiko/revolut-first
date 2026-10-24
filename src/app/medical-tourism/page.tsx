import ShowcasePage from '@/components/ShowcasePage'
import { getGalleryItems } from '@/lib/gallery'

export default function MedicalTourismPage() {
  const legacySulfurItems = getGalleryItems('1', 'Sulfur baths').slice(0, 2)
  const newSulfurItems = getGalleryItems('g1', 'Sulfur baths')
  const sulfurGallery = [
    {
      src: '/img/tblt1.jpg',
      type: 'image' as const,
      alt: 'Brochure about effervescent hydrogen tablets',
      caption: 'Таблетки входят в стоимость процедуры 3 раза в день. Для сочетания водорода с ваннами и усиления эффекта серо-радоновых процедур.',
    },
    ...legacySulfurItems,
    ...newSulfurItems,
  ]

  return (
    <ShowcasePage
      pageKey="medical_tourism"
      heroImage="/img/gallery/1/41.jpg"
      sections={[
        { key: 'sulfur', items: sulfurGallery },
        { key: 'mallorca', items: getGalleryItems('4', 'Mallorca catamaran') },
      ]}
    />
  )
}
