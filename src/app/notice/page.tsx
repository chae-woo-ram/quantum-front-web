'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../utils/supabase/client';

function Notice() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data: notice, error } = await supabase.from('notice').select('*');
      setNotes(notice);
    };
    getData();
  }, []);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}

export default Notice;
