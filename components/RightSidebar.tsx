import React, { useMemo, useRef } from "react";

import { RightSidebarProps } from "@/types/type";
import { bringElement, modifyShape } from "@/lib/shapes";

import Text from "./settings/Text";
import Color from "./settings/Color";
import Export from "./settings/Export";
import Dimensions from "./settings/Dimensions";
import { ProductForm } from "./product-form";
import { Test } from "./Test";


const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  // memoize the content of the right sidebar to avoid re-rendering on every mouse actions
  const memoizedContent = useMemo(
    () => (
      <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[220px] sticky right-0 max-sm:hidden select-none h-[calc(100vh-50px)] overflow-y-auto">
        

        <Dimensions
          isEditingRef={isEditingRef}
          width={elementAttributes.width}
          height={elementAttributes.height}
          handleInputChange={handleInputChange}
        />

        <Text
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight}
          handleInputChange={handleInputChange}
        />

        <div className="compact-row">
          <Color
            inputRef={colorInputRef}
            attribute={elementAttributes.fill}
            placeholder="Цвет"
            attributeType="fill"
            handleInputChange={handleInputChange}
            className="compact-item-half"
          />

          <Color
            inputRef={strokeInputRef}
            attribute={elementAttributes.stroke}
            placeholder="Обводка"
            attributeType="stroke"
            handleInputChange={handleInputChange}
            className="compact-item-half"
          />
        </div>

        <ProductForm />

    
       

        <Export />
      </section>
    ),
    [elementAttributes]
  ); // only re-render when elementAttributes changes

  return memoizedContent;
};

export default RightSidebar;
