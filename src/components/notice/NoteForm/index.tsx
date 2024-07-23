import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

interface NoteFormProps {
  note: {
    title: string;
    content: string;
    is_active: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NoteForm = ({ note, onChange }: NoteFormProps) => (
  <>
    <TextField
      autoFocus
      margin="dense"
      name="title"
      label="제목"
      type="text"
      fullWidth
      variant="outlined"
      value={note.title}
      onChange={onChange}
    />
    <TextField
      margin="dense"
      name="content"
      label="내용"
      type="text"
      fullWidth
      multiline
      rows={4}
      variant="outlined"
      value={note.content}
      onChange={onChange}
    />
    <FormControl component="fieldset" sx={{ marginTop: 2 }}>
      <FormLabel component="legend">활성화 상태</FormLabel>
      <RadioGroup name="is_active" value={note.is_active.toString()} onChange={onChange} row>
        <FormControlLabel value="true" control={<Radio />} label="활성화" />
        <FormControlLabel value="false" control={<Radio />} label="비활성화" />
      </RadioGroup>
    </FormControl>
  </>
);

export default NoteForm;
