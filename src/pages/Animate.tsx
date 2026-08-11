import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Button, Input, Card, CardBody, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import * as yaml from 'js-yaml';
import { motion, AnimatePresence } from 'framer-motion';
import ArmorStand from '../components/ArmorStand';
import MetaTags from '../components/MetaTags';

interface KeyFrame {
  head: { x: number; y: number; z: number };
  left_arm: { x: number; y: number; z: number };
  right_arm: { x: number; y: number; z: number };
  left_leg: { x: number; y: number; z: number };
  right_leg: { x: number; y: number; z: number };
}

const defaultFrame: KeyFrame = {
  head: { x: 0, y: 0, z: 0 },
  left_arm: { x: 0, y: 0, z: 0 },
  right_arm: { x: 0, y: 0, z: 0 },
  left_leg: { x: 0, y: 0, z: 0 },
  right_leg: { x: 0, y: 0, z: 0 }
};

export default function Animate() {
  const [frames, setFrames] = useState<KeyFrame[]>([defaultFrame]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationName, setAnimationName] = useState('wave');
  const [interval, setInterval] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastFrameTimeRef = useRef<number>(0);
  const controlsTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    if (!isHovered) {
      controlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const addKeyFrame = () => {
    setFrames([...frames, { ...frames[currentFrame] || defaultFrame }]);
    setCurrentFrame(frames.length);
  };

  const deleteKeyFrame = () => {
    if (frames.length > 1) {
      const newFrames = frames.filter((_, index) => index !== currentFrame);
      setFrames(newFrames);
      setCurrentFrame(Math.min(currentFrame, newFrames.length - 1));
    }
  };

  const duplicateKeyFrame = () => {
    const newFrames = [...frames];
    newFrames.splice(currentFrame + 1, 0, { ...frames[currentFrame] });
    setFrames(newFrames);
    setCurrentFrame(currentFrame + 1);
  };

  const updateCurrentFrame = (part: keyof KeyFrame, axis: 'x' | 'y' | 'z', value: number) => {
    const newFrames = [...frames];
    if (!newFrames[currentFrame]) {
      newFrames[currentFrame] = { ...defaultFrame };
    }
    newFrames[currentFrame] = {
      ...newFrames[currentFrame],
      [part]: { ...newFrames[currentFrame][part], [axis]: value }
    };
    setFrames(newFrames);
  };

  const exportAnimation = () => {
    try {
      const cleanedFrames = frames.map(frame => ({
        head: { x: frame.head.x, y: frame.head.y, z: frame.head.z },
        left_arm: { x: frame.left_arm.x, y: frame.left_arm.y, z: frame.left_arm.z },
        right_arm: { x: frame.right_arm.x, y: frame.right_arm.y, z: frame.right_arm.z },
        left_leg: { x: frame.left_leg.x, y: frame.left_leg.y, z: frame.left_leg.z },
        right_leg: { x: frame.right_leg.x, y: frame.right_leg.y, z: frame.right_leg.z }
      }));

      const animation = {
        animations: {
          [animationName]: {
            interval: Math.max(1, Math.floor(interval)),
            loop: true,
            steps: cleanedFrames
          }
        }
      };
      
      const yamlStr = yaml.dump(animation, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        quotingType: '"'
      });
      
      const blob = new Blob([yamlStr], { type: 'text/yaml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'animations.yml';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export animation:', error);
    }
  };

  const playAnimation = () => {
    if (isPlaying) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const animate = () => {
      const now = Date.now();
      if (now - lastFrameTimeRef.current >= interval * 50) {
        setCurrentFrame(prev => (prev + 1) % frames.length);
        lastFrameTimeRef.current = now;
      }
      timeoutRef.current = setTimeout(animate, 16);
    };
    
    lastFrameTimeRef.current = Date.now();
    animate();
  };

  const currentFrameData = frames[currentFrame] || defaultFrame;

  return (
    <div 
      className="h-screen bg-[#030303] relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowControls(false);
      }}
    >
      <MetaTags 
        title="Animation Creator - AdvancedArmorStands"
        description="Create custom armor stand animations with our interactive 3D editor. Export animations for your Minecraft server."
        url="https://advancedarmorstands.ir/#/animate"
      />
      
      {/* Modern Header */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                as="a"
                href="/"
                isIconOnly
                variant="flat"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200"
              >
                <Icon icon="lucide:arrow-left" className="w-4 h-4 text-white" />
              </Button>
              
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-medium text-white tracking-tight">Animation Creator</h1>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-white/70 font-medium">Live Preview</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Input
                placeholder="Animation name"
                value={animationName}
                onChange={(e) => setAnimationName(e.target.value)}
                className="w-48 hidden sm:block"
                classNames={{
                  input: "bg-transparent text-white placeholder:text-white/50",
                  inputWrapper: "bg-white/10 border-white/20 hover:border-white/30 focus-within:border-orange-500/50 backdrop-blur-xl"
                }}
              />
              
              <Button
                color="primary"
                startContent={<Icon icon="lucide:download" className="w-4 h-4" />}
                onClick={exportAnimation}
                className="gradient-button px-6 rounded-full font-medium"
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 pt-20">
        <Canvas camera={{ position: [0, 2, 5] }} shadows>
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.6} />
          <pointLight position={[5, -5, 5]} intensity={0.4} color="#ff5f15" />
          <ArmorStand frame={currentFrameData} />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <gridHelper args={[10, 10, '#333336', '#222224']} />
        </Canvas>
      </div>

      {/* Modern Control Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className={`fixed top-20 right-0 w-96 bg-black/90 backdrop-blur-2xl border-l border-white/10 overflow-hidden z-20 ${
              showControls ? 'bottom-32 rounded-tl-3xl' : 'bottom-0 rounded-tl-3xl rounded-bl-3xl'
            }`}
          >
            <div className="h-full flex flex-col">
              {/* Panel Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-lg font-medium text-white">Pose Controls</h3>
                <Button
                  isIconOnly
                  variant="flat"
                  size="sm"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20"
                  onClick={() => setIsPanelOpen(false)}
                >
                  <Icon icon="lucide:x" className="w-4 h-4 text-white" />
                </Button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {Object.entries(currentFrameData).map(([part, angles]) => (
                  <Card key={part} className="bg-white/5 border-white/10">
                    <CardBody className="p-5">
                      <h4 className="text-base font-medium capitalize text-orange-500 mb-4 flex items-center gap-2">
                        <Icon icon={getPartIcon(part)} className="w-4 h-4" />
                        {part.replace('_', ' ')}
                      </h4>
                      
                      <div className="space-y-4">
                        {Object.entries(angles).map(([axis, value]) => (
                          <div key={axis} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-xs uppercase text-white/60 font-semibold tracking-wider">
                                {axis}-axis
                              </label>
                              <Input
                                type="number"
                                value={value}
                                onChange={(e) => updateCurrentFrame(part as keyof KeyFrame, axis as 'x' | 'y' | 'z', Number(e.target.value))}
                                min={-180}
                                max={180}
                                className="w-20"
                                size="sm"
                                classNames={{
                                  input: "text-center bg-transparent text-white text-sm font-mono",
                                  inputWrapper: "bg-white/10 border-white/20 hover:border-orange-500/50 focus-within:border-orange-500 h-8"
                                }}
                              />
                            </div>
                            <div className="relative">
                              <input
                                type="range"
                                value={value}
                                onChange={(e) => updateCurrentFrame(part as keyof KeyFrame, axis as 'x' | 'y' | 'z', Number(e.target.value))}
                                min={-180}
                                max={180}
                                step={1}
                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider"
                              />
                              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-white/20 rounded-full"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pose Controls Button - Only shown when timeline is hidden and panel is closed */}
      <AnimatePresence>
        {!showControls && !isPanelOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-20"
          >
            <Button
              size="lg"
              variant="flat"
              startContent={<Icon icon="lucide:sliders-horizontal" className="w-5 h-5" />}
              onClick={() => setIsPanelOpen(true)}
              className="px-6 py-3 rounded-full bg-black/90 backdrop-blur-2xl hover:bg-black/95 border border-white/20 hover:border-white/30 text-white font-medium shadow-2xl"
            >
              Pose Controls
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Bottom Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-2xl border-t border-white/10 z-20"
          >
            <div className="max-w-full mx-auto p-6">
              {/* Main Controls Row */}
              <div className="flex items-center gap-6 mb-6">
                {/* Playback Controls */}
                <div className="flex items-center gap-3">
                  <Button
                    isIconOnly
                    size="lg"
                    className="gradient-button w-12 h-12 rounded-full transition-all duration-200 transform hover:scale-105"
                    onClick={playAnimation}
                  >
                    <Icon icon={isPlaying ? "lucide:pause" : "lucide:play"} className="w-5 h-5" />
                  </Button>
                  
                  <Divider orientation="vertical" className="h-8 bg-white/20" />
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="flat"
                      startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                      onClick={addKeyFrame}
                      className="px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium"
                    >
                      Add
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="flat"
                      startContent={<Icon icon="lucide:copy" className="w-4 h-4" />}
                      onClick={duplicateKeyFrame}
                      className="px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium"
                    >
                      Duplicate
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="flat"
                      startContent={<Icon icon="lucide:trash-2" className="w-4 h-4" />}
                      onClick={deleteKeyFrame}
                      isDisabled={frames.length <= 1}
                      className="px-4 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 font-medium disabled:opacity-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <div className="flex items-center justify-between text-xs text-white/60 font-medium mb-2">
                      <span>Timeline</span>
                      <span>{Math.round(frames.length * interval / 20 * 100) / 100}s</span>
                    </div>
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-200" 
                        style={{ 
                          width: `${(currentFrame / Math.max(frames.length - 1, 1)) * 100}%`,
                          maxWidth: '100%'
                        }} 
                      />
                      <input
                        type="range"
                        value={currentFrame}
                        onChange={(e) => setCurrentFrame(Number(e.target.value))}
                        min={0}
                        max={frames.length - 1}
                        step={1}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Settings */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-white/70 font-medium">Interval</label>
                    <Input
                      type="number"
                      value={interval}
                      min={1}
                      onChange={(e) => setInterval(Math.max(1, Number(e.target.value)))}
                      className="w-20"
                      size="sm"
                      classNames={{
                        input: "text-center bg-transparent text-white font-mono",
                        inputWrapper: "bg-white/10 border-white/20 hover:border-orange-500/50 focus-within:border-orange-500 h-8"
                      }}
                    />
                  </div>
                  
                  {!isPanelOpen && (
                    <Button
                      size="sm"
                      variant="flat"
                      startContent={<Icon icon="lucide:sliders-horizontal" className="w-4 h-4" />}
                      onClick={() => setIsPanelOpen(true)}
                      className="px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium"
                    >
                      Controls
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Status Bar */}
              <div className="flex justify-between items-center text-sm text-white/60 font-medium">
                <div className="flex items-center gap-4">
                  <span>Frame {currentFrame + 1} of {frames.length}</span>
                  <span>•</span>
                  <span>{animationName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getPartIcon(part: string): string {
  switch (part) {
    case 'head': return 'lucide:circle';
    case 'left_arm': return 'lucide:move-3d';
    case 'right_arm': return 'lucide:move-3d';
    case 'left_leg': return 'lucide:move-vertical';
    case 'right_leg': return 'lucide:move-vertical';
    default: return 'lucide:circle';
  }
}
