import { CldImage } from 'next-cloudinary';


import { Apple, Music, Activity, Battery, Wifi } from 'lucide-react'

const features = [
  { name: 'Связь', icon: Wifi },
  { name: 'Музыка', icon: Music },
  { name: 'Здоровье и спорт', icon: Activity },
  { name: 'Мощная батарея', icon: Battery },
  { name: 'Беспроводная зарядка', icon: Apple },
]
const publicId = '1чч_t7ztmx'; 
const publicId2 = '112_mqs5xy'; // ID изображения товара (смарт-часы)
const headline = 'СМАРТ-ЧАСЫ';
const subheadline = '2-й ремешок в подарок';
const alt = 'A sleek smartwatch with promotional details';

export function Test() {
  return (
    <div
      style={{
        width: '900px',
        height: '1200px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Фон */}
      <CldImage
        src={publicId2}
        alt={alt}
        width="900"
        height="1200"
        crop="pad"
        fillBackground
        replaceBackground="Soft gradient light background with light shades of light-blue and pink"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1, // За контентом
        }}
      />

      {/* Заголовок */}
      <h1
        style={{
          color: '#d404a3',
          fontFamily: 'Source Sans Pro, sans-serif',
          fontSize: '90px',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '20px 0',
          zIndex: 2,
        }}
      >
        {headline}
      </h1>

      {/* Подзаголовок */}
      <h2
        style={{
          color: '#000',
          fontFamily: 'Source Sans Pro, sans-serif',
          fontSize: '40px',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 0 40px 0',
          backgroundColor: '#fff',
          padding: '15px 20px',
          borderRadius: '15px',
          zIndex: 2,
        }}
      >
        {subheadline}
      </h2>

      {/* Контент */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {/* Левая часть: список преимуществ */}
        <ul className="list-none p-0 m-0 text-2xl space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <span className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full mr-4">
            <feature.icon className="w-6 h-6 text-white" />
          </span>
          <span>{feature.name}</span>
        </li>
      ))}
    </ul>

        {/* Правая часть: изображение товара */}
        <CldImage
          src={publicId}
          alt={alt}
          width="900"
          height="1200"
          crop="fit"
          // style={{
          //   zIndex: 3,
          //   borderRadius: '20px',
          // }}
        />
      </div>
    </div>
  );
}
