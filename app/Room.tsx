// Room.tsx

'use client';

import { LiveMap } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Loader from "@/components/Loader";
import { RoomProvider } from "@/liveblocks.config";

interface RoomProps {
  children?: React.ReactNode;
  generatedContent: { width: number; height: number } | null;
}

const Room: React.FC<RoomProps> = ({ children, generatedContent }) => {
  return (
    <RoomProvider
      id="fig-room"
      initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
      initialStorage={{ canvasObjects: new LiveMap() }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {() => (
          <div className="relative">
            {generatedContent ? (
              <div
                style={{
                  width: generatedContent.width,
                  height: generatedContent.height,
                  backgroundColor: "#e0e0e0",
                  border: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Generated Content Placeholder
              </div>
            ) : (
              children
            )}
          </div>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
