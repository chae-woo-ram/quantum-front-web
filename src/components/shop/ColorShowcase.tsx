import { Box, Stack } from '@mui/material';

interface ColorShowcaseProps {
  colors?: { hex: string }[];
}

/**
 * ColorShowcase 컴포넌트는 colors 배열을 받아
 * 각 색상을 컬러칩 형태로 화면에 표시
 *
 * @param colors - 각 색상의 hex 값을 포함하는 객체 배열
 */
const ColorShowcase = ({ colors }: ColorShowcaseProps) => (
  <Stack gap={1} alignItems="center">
    <Stack direction="row" gap={0} border={1}>
      {colors?.map((item, index) => (
        <Stack alignItems="center" key={index}>
          {/* 컬러칩을 표시하는 Box 컴포넌트 */}
          <Box sx={{ bgcolor: item.hex, width: 40, height: 30 }} />
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export default ColorShowcase;
