import { css } from 'styled-components';

type LevelType = 'level-1' | 'level-2' | 'level-3';

const boxShadowLevels = {
  'level-1': `0px 2px 8px 0px rgba(33, 38, 49, 0.16), 0px 0px 2px 0px rgba(33, 38, 49, 0.12)`,
  'level-2': `2px 2px 16px 0px rgba(33, 38, 49, 0.16), 2px 2px 8px 0px rgba(33, 38, 49, 0.12)`,
  'level-3': `2px 4px 24px 0px rgba(33, 38, 49, 0.28), 4px 4px 12px 0px rgba(33, 38, 49, 0.12)`,
};

const boxShadowStyle = (level: LevelType) => css`
  box-shadow: ${boxShadowLevels[level]};
`;

export { boxShadowStyle };
