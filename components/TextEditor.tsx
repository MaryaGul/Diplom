import React, { useRef, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextEditorProps {
  onStyleChange: (property: 'fontFamily' | 'fontSize' | 'fontWeight' | 'color', value: string) => void;
  position: { x: number, y: number };
  currentStyles: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    color: string;
  };
}

export function TextEditor({ onStyleChange, position, currentStyles }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        // Close the editor
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={editorRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[220px] space-y-2"
      style={{
        top: position.y,
        left: position.x,
        zIndex: 9999,
      }}
    >
      <div className="space-y-2">
        <Label>Шрифт</Label>
        <Select onValueChange={(value) => onStyleChange('fontFamily', value)} value={currentStyles.fontFamily}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите шрифт" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Helvetica">Helvetica</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Размер</Label>
        <Input
          type="number"
          value={parseInt(currentStyles.fontSize)}
          onChange={(e) => onStyleChange('fontSize', `${e.target.value}px`)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Начертание</Label>
        <Select onValueChange={(value) => onStyleChange('fontWeight', value)} value={currentStyles.fontWeight}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите начертание" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Regular</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Цвет</Label>
        <Input
          type="color"
          value={currentStyles.color}
          onChange={(e) => onStyleChange('color', e.target.value)}
          className="w-full h-8"
        />
      </div>
    </div>
  );
}

