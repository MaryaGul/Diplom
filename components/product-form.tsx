// ProductForm.tsx

'use client';

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Room from "@/app/Room"; // Импорт компонента Room

export function ProductForm() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [removeBackground, setRemoveBackground] = useState(false);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{ width: number; height: number } | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);

    // Имитация генерации заглушки
    setGeneratedContent({ width: 180, height: 240 });

    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  const handleReferenceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setReferenceImage(file);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-primary-black text-primary-grey-300 rounded-none shadow-md sans-serif">
      <div className="space-y-2">
        <Label htmlFor="product-name" className="text-primary-grey-300">Название товара</Label>
        <Input
          id="product-name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Введите название товара"
          className="bg-primary-black text-primary-grey-300 border-primary-grey-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-description" className="text-primary-grey-300">Описание товара</Label>
        <Textarea
          id="product-description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Введите описание товара здесь..."
          className="min-h-[100px] bg-primary-black text-primary-grey-300 border-primary-grey-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reference-image" className="text-primary-grey-300">Загрузить референс</Label>
        <input
          type="file"
          id="reference-image"
          accept="image/*"
          onChange={handleReferenceUpload}
          className="text-primary-grey-300"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remove-background" 
          checked={removeBackground}
          onCheckedChange={(checked) => setRemoveBackground(checked === true)}
        />
        <Label htmlFor="remove-background" className="text-primary-grey-300">Убрать фон</Label>
      </div>

      <Button onClick={handleGenerate} className="w-full bg-primary-grey-200 text-primary-black">
        Generate
      </Button>

      {/* Передаем generatedContent в Room */}
      <Room generatedContent={generatedContent} />

      {isGenerating && (
        <div className='flex h-30 w-full items-center justify-center bg-primary-grey-200 mt-6'>
          <p className='text-sm font-bold text-primary-grey-300'>Генерация...</p>
        </div>
      )}
    </div>
  );
}
