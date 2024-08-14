'use client';

import { useEffect, useRef, useState } from 'react';

const Canvas = ({ imageUrl, width, height }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCtx(context);

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
      canvas.width = width;
      canvas.height = height;
      draw();
    };

    const draw = () => {
      if (ctx && image) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, offsetX, offsetY, image.width, image.height);
      }
    };

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setLastX(e.clientX);
      setLastY(e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      if (isDragging && ctx && image) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        setOffsetX(offsetX + dx);
        setOffsetY(offsetY + dy);
        setLastX(e.clientX);
        setLastY(e.clientY);
        draw();
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [imageUrl, width, height, isDragging, lastX, lastY, offsetX, offsetY, ctx, image]);

  return <canvas ref={canvasRef} style={{ display: 'block', cursor: 'move' }} />;
};

export default Canvas;
