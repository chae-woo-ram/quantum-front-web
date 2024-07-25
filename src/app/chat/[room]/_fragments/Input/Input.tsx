import * as Style from "./InputStyle";

const Input = ({ setMessage, sendMessage, message }: any) => (
  <Style.Form>
    <Style.InputField
      type="text"
      placeholder="전송하려는 메시지를 입력하세요."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <Style.SendButton onClick={(e) => sendMessage(e)}>전송</Style.SendButton>
  </Style.Form>
);

export default Input;
