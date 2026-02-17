"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ImageViewerProps {
    src: string;
    alt: string;
    children: React.ReactNode;
}

export function ImageViewer({ src, alt, children }: ImageViewerProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="cursor-pointer"
            >
                {children}
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex items-center justify-center border-none bg-black/90 p-0 sm:max-w-lg [&>button]:hidden">
                    <DialogTitle className="sr-only">{alt}</DialogTitle>
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute right-3 top-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                        <X size={18} />
                    </button>
                    <img
                        src={src}
                        alt={alt}
                        className="max-h-[80vh] w-full object-contain"
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
