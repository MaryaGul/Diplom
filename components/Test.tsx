import React, { useState, useRef, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'
import { Phone, Music, Heart, Battery, Wifi } from 'lucide-react'
import { TextEditor } from './TextEditor'

const features = [
  { name: 'Связь', icon: Phone },
  { name: 'Музыка', icon: Music },
  { name: 'Здоровье и спорт', icon: Heart },
  { name: 'Мощная батарея', icon: Battery },
  { name: 'Беспроводная зарядка', icon: Wifi },
]

interface ProductCardProps {
  publicId: string;
  backgroundId: string;
  headline: string;
  subheadline: string;
  alt: string;
}

interface TextStyles {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  color: string;
}

export function ProductCard({
  publicId,
  backgroundId,
  headline: initialHeadline,
  subheadline: initialSubheadline,
  alt,
}: ProductCardProps) {
  const [headline, setHeadline] = useState(initialHeadline);
  const [subheadline, setSubheadline] = useState(initialSubheadline);
  const [selectedText, setSelectedText] = useState<'headline' | 'subheadline' | null>(null);
  const [editorPosition, setEditorPosition] = useState({ x: 0, y: 0 });
  const [headlineStyles, setHeadlineStyles] = useState<TextStyles>({
    fontFamily: 'Times New Roman',
    fontSize: '45px',
    fontWeight: 'bold',
    color: '#EC4899'
  });
  const [subheadlineStyles, setSubheadlineStyles] = useState<TextStyles>({
    fontFamily: 'Arial',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000000'
  });

  const handleTextSelection = (type: 'headline' | 'subheadline', event: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(type);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setEditorPosition({
        x: Math.min(rect.left, window.innerWidth - 220), // Ensure the editor doesn't go off-screen
        y: rect.bottom + window.scrollY + 10
      });
    }
  };

  const handleStyleChange = (property: keyof TextStyles, value: string) => {
    if (selectedText === 'headline') {
      setHeadlineStyles(prev => ({ ...prev, [property]: value }));
    } else if (selectedText === 'subheadline') {
      setSubheadlineStyles(prev => ({ ...prev, [property]: value }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const editor = document.getElementById('text-editor');
      const isClickInside = editor?.contains(event.target as Node);
      
      if (!isClickInside && !window.getSelection()?.toString()) {
        setSelectedText(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[450px] h-[600px] overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Header Section */}
      <div className="pt-8 px-4 space-y-4">
        <h1
          className="text-center select-text cursor-text"
          style={{
            ...headlineStyles,
            background: 'linear-gradient(to right, #ec4899, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          onMouseUp={(e) => handleTextSelection('headline', e)}
        >
          {headline}
        </h1>
        <div className="flex justify-center">
          <h2
            className="px-4 py-2 rounded-xl shadow-lg select-text cursor-text"
            style={{
              ...subheadlineStyles,
              backgroundColor: 'white',
            }}
            onMouseUp={(e) => handleTextSelection('subheadline', e)}
          >
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

      {selectedText && (
        <TextEditor
          position={editorPosition}
          onStyleChange={handleStyleChange}
          currentStyles={selectedText === 'headline' ? headlineStyles : subheadlineStyles}
        />
      )}
    </div>
  )
}

