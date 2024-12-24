import { CldImage } from 'next-cloudinary'
import { Phone, Music, Heart, Battery, Wifi } from 'lucide-react'

const features = [
  { name: 'Связь', icon: Phone },
  { name: 'Музыка', icon: Music },
  { name: 'Здоровье и спорт', icon: Heart },
  { name: 'Мощная батарея', icon: Battery },
  { name: 'Беспроводная зарядка', icon: Wifi },
]

interface ProductCardProps {
  publicId: string
  backgroundId: string
  headline: string
  subheadline: string
  alt: string
}

export function ProductCard({
  publicId,
  backgroundId,
  headline,
  subheadline,
  alt,
}: ProductCardProps) {
  return (
    <div className="relative w-[450px] h-[600px] overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Header Section */}
      <div className="pt-8 px-4 space-y-4">
        <h1 className="text-[45px] font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          {headline}
        </h1>
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold text-black bg-white px-4 py-2 rounded-xl shadow-lg">
            {subheadline}
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mt-12 pl-6 flex justify-between items-start">
        {/* Features List */}
        <div className="space-y-5">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-violet-600 shadow-lg flex items-center justify-center shrink-0">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-medium leading-none">{feature.name}</span>
            </div>
          ))}
        </div>

        {/* Product Image */}
        <div className="relative -mr-32">
          <div className="absolute -bottom-8 -right-8 w-[200px] h-[200px] bg-black/20 blur-3xl rounded-full"></div>
          <CldImage
            src={publicId}
            alt={alt}
            width={900}
            height={1200}
            angle={12}
            className="max-w-lg z-10"
          />
        </div>
      </div>
    </div>
  )
}

