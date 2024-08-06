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

const Image3DViewerModal = ({ isShowModal = false, imageUrl, handleClose }: Image3DViewerModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isShowModal && canvasRef.current && imageUrl) {
      const engine = new Engine(canvasRef.current, true);
      const scene = new Scene(engine);

      // ArcRotateCamera 설정
      const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 5, Vector3.Zero(), scene);
      camera.attachControl(canvasRef.current, true);

      // 카메라 줌 제한 설정
      camera.lowerRadiusLimit = -10;
      camera.upperRadiusLimit = -2;
      camera.minZ = 0.1;
      camera.maxZ = 100;

      // 빛 설정
      const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
      light.intensity = 3;

      // 단면 평면 생성
      const plane = MeshBuilder.CreatePlane('plane', { size: 5 }, scene);
      const material = new StandardMaterial('material', scene);
      material.diffuseTexture = new Texture(imageUrl, scene);
      material.backFaceCulling = false;
      plane.material = material;

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
    }
  }, [isShowModal, imageUrl]);

  if (!isShowModal) return null; // Modal이 닫혀 있을 때는 아무것도 렌더링하지 않음

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
