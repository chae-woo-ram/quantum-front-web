'use client';

import Container from '@/components/common/Container';
import { Divider } from '@mui/material';
import { motion } from 'framer-motion';
import * as Style from './style';

// 애니메이션 설정 상수
const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const transitionSettings = { duration: 0.8, ease: 'easeOut' };

export default function Gallery() {
  return (
    <Container title="About" fullWidth customPadding="50px 16px">
      <Style.AnimatedVideoWrapper
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={textVariants}
        transition={{ ...transitionSettings, delay: 0 }}
      >
        <Style.Video autoPlay loop muted>
          <source src="/video/gallery-video2.mp4" type="video/mp4" />
        </Style.Video>
      </Style.AnimatedVideoWrapper>
      <Style.Section>
        <Style.TextWrapper
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ ...transitionSettings, delay: 0.8 }}
        >
          Chawooram Gallery, founded by contemporary artists Chaeun Lee, Boram Jeong, and Jiu Park, opened in March 2015
          in Cheongdam-dong, Gangnam-gu, Seoul. It has become a notable space where art enthusiasts gather to appreciate
          and engage with creative and innovative works. The gallery is dedicated to showcasing a broad spectrum of
          Korean contemporary art.
          <br />
          <br />
          In addition to presenting the unique works of its founders, Chawooram Gallery features pieces by various
          domestic and international artists, spanning diverse artistic genres such as painting, sculpture, and
          installation art. The gallery regularly organizes special exhibitions and solo shows to explore and present
          the latest trends in contemporary art.
          <br />
          <br />
          Chawooram Gallery is an open space accessible not only to art enthusiasts but also to the general public,
          aiming to enhance understanding and interest in art through various educational programs and workshops. From
          art education programs for children and youth to specialized courses for adults, the gallery offers
          opportunities for all age groups to experience and learn about contemporary art. Additionally, Chawooram
          Gallery actively supports the international advancement of domestic artists by participating in world-renowned
          art fairs such as Art Basel, Frieze, and the Venice Biennale, thereby increasing the global recognition of
          Korean art. Through these efforts, many artists have gained international attention, with their works being
          collected by prestigious museums and galleries worldwide. Chawooram Gallery will continue to discover and
          nurture promising artists from both Korea and abroad, contributing to the revitalization and globalization of
          the Korean art market.
          <br />
          <br />
          Beyond its role as an exhibition space, Chawooram Gallery aims to promote a culture of art appreciation and
          collection. It seeks to establish itself as a comprehensive cultural facility that provides art education for
          future generations. The gallery as
        </Style.TextWrapper>
        <Divider orientation="vertical" flexItem />
        <Style.TextWrapper
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ ...transitionSettings, delay: 1.6 }}
        >
          채우람 갤러리는 현대미술을 선도하는 세 명의 아티스트, 이채은, 정보람, 박지우가 공동으로 설립한 예술
          공간입니다. 2015년 3월, 서울 강남구 청담동에 문을 연 채우람 갤러리는 예술을 사랑하는 이들이 모여 창조적이고
          혁신적인 작품을 감상하고 소통할 수 있는 특별한 장소로 자리 잡았습니다. 채우람 갤러리는 한국 현대미술의 다양한
          스펙트럼을 보여주기 위해 꾸준히 노력하고 있습니다.
          <br />
          <br />
          이채은, 정보람, 박지우 작가의 독창적인 작품을 비롯하여 다양한 국내외 작가들의 작품을 선보이며, 현대미술의
          흐름을 충실히 소개하고 있습니다. 갤러리는 회화, 조각, 설치미술 등 다양한 장르의 작품을 전시하며, 관람객들에게
          예술적 영감을 제공합니다. 갤러리는 정기적으로 기획전과 개인전을 개최하여 현대미술의 최신 경향을 탐구하고
          소개합니다.
          <br />
          <br />
          채우람 갤러리는 예술 애호가들뿐만 아니라, 일반 대중들도 쉽게 접근할 수 있는 열린 공간으로, 예술에 대한 이해와
          관심을 증진시키고자 다양한 교육 프로그램과 워크숍을 운영하고 있습니다. 어린이와 청소년을 위한 미술 교육
          프로그램부터 성인을 위한 전문 강좌까지, 모든 연령층이 현대미술을 접하고 배울 수 있는 기회를 제공하고 있습니다.
          또한, 채우람 갤러리는 국내 작가들의 해외 진출을 적극 지원하며, 아트 바젤, 프리즈, 베니스 비엔날레 등 세계적인
          아트 페어에 참여하여 한국 미술의 국제적 인지도를 높이고 있습니다. 이러한 노력을 통해 여러 작가들이 국제적인
          무대에서 주목받고 있으며, 작품이 해외 유명 미술관과 갤러리 컬렉션에 소장되기도 했습니다. 채우람 갤러리는
          앞으로도 현대미술을 선도하는 국내외 유망 작가들을 지속적으로 발굴 및 육성하여, 한국 미술 시장의 활성화와
          세계화에 기여할 것입니다.
          <br />
          <br />
          단순히 작품을 전시하는 공간을 넘어, 예술을 향유하고 소장하는 문화를 장려하며, 미래 세대에게 예술 교육을
          제공하는 종합 문화 시설로서의 역할을 확립해 나가고자 합니다. 채우람 갤러리는 예술과 문화의 풍요로움을 함께
          나누는 공간이 되기를 기대하며, 더욱 다양한 전시와 프로그램을 통해 예술이 주는 감동과 영감을 더 많은 이들에게
          전달할 것입니다.
        </Style.TextWrapper>
      </Style.Section>
    </Container>
  );
}
