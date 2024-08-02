import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { Divider } from '@mui/material';
import * as Style from './MessageStyle';

interface MessagePropsType {
  message: {
    user: string;
    text: string;
    createdAt: Date;
    file: any;
    profileId: number;
  };
  name: string;
}

function Message({ message: { user, text, file, profileId, createdAt }, name }: MessagePropsType) {
  const trimmedName = name.trim().toLowerCase();
  const isSentByCurrentUser = user === trimmedName;
  const isAdmin = user === 'admin';

  const timeString = new Date(createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const handleDownload = () => {
    if (file) {
      const link = document.createElement('a');
      link.href = file; // The URL to the file
      link.download = 'download'; // Optional: set default download file name
      link.click();
    }
  };

  if (isAdmin) {
    return (
      <Style.AdminMessageBox>
        <Divider>
          <Style.MessageText>{text}</Style.MessageText>
        </Divider>
      </Style.AdminMessageBox>
    );
  }

  return (
    <Style.MessageContainer $isSentByCurrentUser={isSentByCurrentUser}>
      {isSentByCurrentUser ? (
        <Style.MessageBoxWrapper>
          <Style.CreatedAtText $isSentByCurrentUser={isSentByCurrentUser}>{timeString}</Style.CreatedAtText>
          <Style.MessageBox $isSentByCurrentUser={isSentByCurrentUser}>
            {text && <Style.MessageText>{text}</Style.MessageText>}

            {file && (
              <Style.ImagePreviewBox>
                <Style.ImagePreview src={file} alt="Image Preview" />
              </Style.ImagePreviewBox>
            )}
          </Style.MessageBox>
          <Style.StyledAvatar $profileId={profileId} />
        </Style.MessageBoxWrapper>
      ) : (
        <Style.MessageWrapper>
          <Style.UserName>{user}</Style.UserName>
          <Style.MessageBoxWrapper>
            <Style.StyledAvatar $profileId={profileId} />
            <Style.MessageBox $isSentByCurrentUser={isSentByCurrentUser}>
              {text && <Style.MessageText>{text}</Style.MessageText>}
              {file && (
                <>
                  <Style.ImagePreviewBox>
                    <Style.ImagePreview src={file} alt="Image Preview" />
                    <Style.DownloadButton onClick={handleDownload}>
                      <DownloadForOfflineIcon />
                    </Style.DownloadButton>
                  </Style.ImagePreviewBox>
                </>
              )}
            </Style.MessageBox>
            <Style.CreatedAtText $isSentByCurrentUser={isSentByCurrentUser}>{timeString}</Style.CreatedAtText>
          </Style.MessageBoxWrapper>
        </Style.MessageWrapper>
      )}
    </Style.MessageContainer>
  );
}

export default Message;
