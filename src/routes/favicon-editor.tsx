import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Move, ZoomIn, Check, RefreshCw, MousePointer2, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/favicon-editor")({
  component: FaviconEditor,
});

function FaviconEditor() {
  const [scale, setScale] = useState(1.4);
  const [transX, setTransX] = useState(0);
  const [transY, setTransY] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("/favicon.png");
  const [imageName, setImageName] = useState<string>("favicon.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manifest for the AI
  const cropManifest = `image: ${imageName}, scale: ${scale.toFixed(2)}, x: ${transX.toFixed(0)}px, y: ${transY.toFixed(0)}px`;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      toast.success("Design locked!");
      alert(`Perfect! Now copy this manifest and send it to Antigravity along with the image if it's new:\n\n${cropManifest}`);
    }, 800);
  };

  const handleReset = () => {
    setScale(1.4);
    setTransX(0);
    setTransY(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setImageName(file.name);
      setScale(1.0); // Reset scale for new image
      setTransX(0);
      setTransY(0);
      toast.info(`Loaded: ${file.name}`);
    }
  };

  const handleDrag = (event: any, info: any) => {
    setTransX(prev => prev + info.delta.x);
    setTransY(prev => prev + info.delta.y);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-[#020202] text-white selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl z-10"
      >
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1 rounded-full mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-cyan-400">FAVICON GENERATOR V2</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter mb-4 italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
            NEXUS <span className="text-cyan-400">LAB</span>
          </h1>
        </header>

        <Card className="bg-black/40 border border-white/5 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-2xl">
          <CardContent className="p-12 flex flex-col items-center">
            
            {/* Image Uploader Trigger */}
            <div className="w-full mb-10 flex justify-center">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white/60 hover:text-white rounded-full px-8 h-12 flex items-center gap-3 transition-all active:scale-95"
              >
                <Upload className="w-4 h-4" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase">UPLOAD NEW SOURCE</span>
              </Button>
            </div>

            {/* The Infinite Viewport */}
            <motion.div 
              onPan={handleDrag}
              className="relative mb-16 cursor-move group active:cursor-grabbing"
            >
              <div className="absolute -inset-10 bg-cyan-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative w-80 h-80 rounded-full border border-white/10 overflow-hidden bg-[#050505] shadow-[0_0_100px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
                <div 
                  className="w-full h-full transition-none"
                  style={{
                    transform: `translate(${transX}px, ${transY}px) scale(${scale})`,
                  }}
                >
                  <img 
                    src={imageSrc} 
                    alt="Source"
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-full h-px bg-white/10" />
                  <div className="h-full w-px bg-white/10" />
                </div>
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-2.5 rounded-full flex items-center gap-3 shadow-2xl">
                <MousePointer2 className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-mono font-black tracking-widest text-white/60 uppercase">FREE ALIGNMENT MODE</span>
              </div>
            </motion.div>

            <div className="w-full space-y-12">
              {/* Controls */}
              <div className="space-y-6">
                <div className="flex justify-between items-end px-2">
                  <div className="space-y-1">
                    <Label className="text-white/40 font-mono text-[10px] font-bold tracking-[0.2em]">MAGNIFICATION</Label>
                    <p className="text-white text-xl font-black italic">OPTICAL ZOOM</p>
                  </div>
                  <div className="text-3xl font-black font-mono text-cyan-400 tabular-nums">
                    {scale.toFixed(2)}
                  </div>
                </div>
                <Slider 
                  value={[scale]} 
                  onValueChange={(val) => setScale(val[0])} 
                  max={6.0} 
                  min={0.1} 
                  step={0.01} 
                />
              </div>

              {/* Manifest Output */}
              <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-3xl p-10 flex flex-col items-center gap-8">
                <div className="flex items-center gap-2 text-[10px] text-white/20 font-mono font-bold tracking-[0.4em] uppercase">
                  <ImageIcon className="w-3 h-3" /> CURRENT TARGET: {imageName}
                </div>
                <div className="w-full bg-black/80 py-6 rounded-2xl border border-white/5 font-mono text-xl text-center shadow-inner tracking-tight px-4 truncate">
                  <span className="text-cyan-400">{cropManifest}</span>
                </div>
                <div className="flex gap-6 w-full">
                  <Button 
                    variant="ghost" 
                    onClick={handleReset}
                    className="flex-1 hover:bg-white/5 text-white/30 hover:text-white h-16 rounded-2xl border border-white/5 font-mono font-bold"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" /> REBOOT
                  </Button>
                  <Button 
                    onClick={handleApply}
                    disabled={isApplying}
                    className="flex-[2] bg-white text-black hover:bg-cyan-400 transition-all font-black italic h-16 rounded-2xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] group"
                  >
                    {isApplying ? "SYNCING..." : "COMMIT DESIGN"}
                    <Check className="w-5 h-5 ml-3 group-hover:scale-125 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
