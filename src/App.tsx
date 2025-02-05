import { useState } from 'react'
import './App.css'

function App() {
  
  const dummyMemos = [
                          {
                            title: "test1",
                            url: "https://example.com/",
                            memo: "this is test"
                          },
                          {
                            title: "test2",
                            url: "https://example.net/",
                            memo: ""
                          }
                        ];
  
  const [flameMode, setFlameMode] = useState("a");
  const [memos, setMemos] = useState(dummyMemos);
  
  const memoList = memos.map(({title, url}) => {
      return(
        <li>
          <a href={url}>{title}</a>
        </li>
      );
    });
  
  function modeChange() {
      setFlameMode(flameMode == "a" ? "b" : "a");
  }
  return (
    <>
      <PageHeader />
      <MemoList memo={memoList} mode={flameMode} />
      <AddMemo modeSet={modeChange} mode={flameMode}/>
    </>
  );
}

function PageHeader() {
  return(
    <header>
    <h1>Web page Memo</h1>
    </header>
  );
}

function AddMemo({modeSet, mode}) {
  return(
    <>
      <MemoForm mode={mode} />
      <button className="pure-button" onClick={() => {modeSet()}}>メモを追加</button>
    </>
  );
}

function MemoList({memo, mode}) {
  return(
    <ol className={"memo-form " + (mode == 'a' ? 'do-display' : 'no-display')}>{memo}</ol>
  );
}

function MemoForm({mode}) {
    return(
      <form className={"memo-form " + (mode == 'b' ? 'do-display' : 'no-display')}>
        <div>
          <label>
            Webページのタイトル
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Webページのurl
            <input type="text" name="url" />
          </label>
        </div>
        <div>
          <label>
            Webページに関するメモ
            <textarea name="memo"></textarea>
          </label>
        </div>
      </form>
    );
}

export default App
