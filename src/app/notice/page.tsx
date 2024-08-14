'use client';

import { useEffect, useState } from 'react';
// 추출한 입력 폼 컴포넌트
import Container from '@/components/common/Container';
import DialogComponent from '@/components/common/DialogComponent';
import Table, { TableColumn } from '@/components/common/TableComponent';
import NoteForm from '@/components/notice/NoteForm';
import DateFormatType from '@/const/dateFormatType';
import dayjs from 'dayjs';
import supabase from '../utils/supabase/client';

interface Notice {
  id: number;
  title: string;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const columns: TableColumn<Notice>[] = [
  { key: 'id', title: 'No.', align: 'left' },
  { key: 'title', title: '제목', align: 'left', width: '60%' },
  {
    key: 'created_at',
    title: '작성일',
    align: 'left',
    render: (_, item) => {
      return <>{dayjs(item.created_at).format(DateFormatType.FULL_DATE_TIME_MINUTE)}</>;
    },
  },
];

function Notice() {
  const [notes, setNotes] = useState<Notice[]>();
  const [registerModal, setRegisterModal] = useState(false);
  const [newNote, setNewNote] = useState<Omit<Notice, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    content: '',
    is_active: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: notice, error } = await supabase.from('notice').select('*');
      if (error) console.error('Error fetching data:', error);
      else setNotes(notice);
    };

    fetchData();
  }, [supabase]);

  const handleOpen = () => setRegisterModal(true);
  const handleClose = () => setRegisterModal(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewNote((prev) => ({
      ...prev,
      [name]: name === 'is_active' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async () => {
    // 데이터 유효성 검사
    if (!newNote.title.trim() || !newNote.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      // 데이터베이스에 데이터 저장
      const { error } = await supabase.from('notice').insert([newNote]);
      if (error) throw error;

      // 상태 업데이트
      setRegisterModal(false);
      setNewNote({ title: '', content: '', is_active: true });

      // 데이터 다시 가져오기
      const { data: notice, error: fetchError } = await supabase.from('notice').select('*');
      if (fetchError) throw fetchError;
      setNotes(notice);
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('데이터를 등록하는 동안 오류가 발생했습니다.');
    }
  };

  return (
    <Container title="공지사항">
      {/* <Button variant="contained" onClick={handleOpen}>
        작성
      </Button> */}
      <Table columns={columns} data={notes || []} />
      <DialogComponent
        title="게시글 작성"
        open={registerModal}
        onClose={handleClose}
        buttons={[
          { label: '취소', onClick: handleClose },
          { label: '등록', onClick: handleSubmit },
        ]}
      >
        <NoteForm note={newNote} onChange={handleInputChange} />
      </DialogComponent>
    </Container>
  );
}

export default Notice;
