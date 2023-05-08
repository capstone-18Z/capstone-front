import { TextField, Button } from "@mui/material";
import { useRef, useCallback, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "./style.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function FreePost() {
  const navigate = useNavigate();
  const editorRef = useRef();
  const [inputs, setInputs] = useState({
    title: "",
    detail: "",
  })

  const DetailOnChange = useCallback((value) => {
    const nextInputs = {
      ...inputs,
      detail: value,
    };
    setInputs(nextInputs);
  }, [inputs, setInputs]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }, []);

  const onClick = () => {
    const formData = new FormData();
    const getAllFormData = {
      ...inputs,
    };
    console.log(getAllFormData);
    formData.append("metadata", JSON.stringify(getAllFormData));
    // formData.append("file", imgFile);
    axios
    .post(`${process.env.REACT_APP_API_URL}/member/post/new`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      alert("등록되었습니다");
      navigate("/list/freepost?page=1");
    });
    console.log(editorRef.current?.getInstance().getHTML());
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
    console.log(editorRef.current?.getInstance().getMarkdown());
  }

  return (
    <div className="freepost-box">
      <h1>게시물 작성</h1>
      <form>
        <div className="freepost-title-box">
          <TextField label="제목" fullWidth variant="outlined" name="title" value={inputs.title} onChange={handleInputChange} />
        </div>
        <div className="editor-box">
          <Editor
            onChange={DetailOnChange}
            ref={editorRef} // DOM 선택용 useRef
            placeholder="내용을 입력해주세요."
            previewStyle="vertical" // 미리보기 스타일 지정
            height="300px" // 에디터 창 높이
            initialEditType="wysiwyg" //
            toolbarItems={[
              // 툴바 옵션 설정
              ["heading", "bold", "italic", "strike"],
            ]}
            useCommandShortcut={false} // 키보드 입력 컨트롤 방지
          ></Editor>
        </div>
        <Button variant="contained" onClick={onClick}>등록</Button>
      </form>
    </div>
  );
}

export default FreePost;
