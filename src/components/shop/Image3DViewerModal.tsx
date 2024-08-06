'use client';

import { useEffect, useRef } from 'react';
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from 'styled-components';

interface Image3DViewerModalProps {
  isShowModal: boolean;
  imageUrl: string;
  handleClose: () => void;
}

/**
 * Image3DViewerModal 3D 이미지 뷰어 모달
 * @param isShowModal - 모달이 표시되는지 여부를 나타내는 boolean 값
 * @param imageUrl - 3D 이미지 텍스처 URL
 * @param handleClose - 모달을 닫기 위한 콜백 함수
 */

const Image3DViewerModal = ({ isShowModal = false, imageUrl, handleClose }: Image3DViewerModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const setupScene = (scene: Scene, canvas: HTMLCanvasElement, imageUrl: string) => {
    const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 5, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = -10;
    camera.upperRadiusLimit = -1;
    camera.minZ = 0.1;
    camera.maxZ = 100;

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    light.intensity = 2;

    const plane = MeshBuilder.CreatePlane('plane', { size: 5 }, scene);
    const material = new StandardMaterial('material', scene);
    material.diffuseTexture = new Texture(imageUrl, scene);
    material.backFaceCulling = false;
    plane.material = material;
  };

  useEffect(() => {
    if (!isShowModal || !canvasRef.current || !imageUrl) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    setupScene(scene, canvasRef.current, imageUrl);

    engine.runRenderLoop(() => {
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      engine.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [isShowModal, imageUrl]);

  if (!isShowModal) return null;

  return (
    <ImageViewContainer>
      <Canvas ref={canvasRef} />
      <CloseButton onClick={handleClose}>
        <CloseIcon />
      </CloseButton>
    </ImageViewContainer>
  );
};

export default Image3DViewerModal;

const ImageViewContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export const CloseButton = styled.div`
  position: fixed;
  top: 15px;
  right: 12px;
  z-index: 11;
  svg {
    font-size: 32px;
    color: #fff;
  }
`;
