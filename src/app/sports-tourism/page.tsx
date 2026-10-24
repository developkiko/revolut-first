import ShowcasePage from '@/components/ShowcasePage'
import { getGalleryItems } from '@/lib/gallery'

export default function SportsTourismPage() {
  return (
    <ShowcasePage
      pageKey="sports_tourism"
      heroImage="/img/sports-track.jpg"
      sections={[
        { key: 'cannes', items: getGalleryItems('g2', 'Cannes, France') },
        { key: 'canaries', items: getGalleryItems('g3', 'Canary Islands') },
      ]}
    />
  )
}
