import { createContext, useContext, useState, useRef, useEffect } from 'react'
import './App.css'
import { getData, setData } from './IDBWrapper.tsx'

const MemosContext = createContext(null);

interface MemoType {
  title: string;
  url: string;
  date: number;
}

function App() {
  
  const listSubstitute: MemoType[] = [
                          {
                            title: "タイトル",
                            url: "",
                            date: 0
                          }
                        ];
    
  const [flameMode, setFlameMode] = useState<string>("a");
  const [memos, setMemos] = useState<MemoType[]>([]);
  
  //IndexedDBからデータを取得する
  useEffect(() => {getData().then((data: any[]) => {
      if (data.length > 0) {
        setMemos(data);
      }
    })
    .catch((e) => {
      setMemos(listSubstitute);
        console.error(e.message);
      });
    }, []);
  const memoList = memos.map(({title, url, date}) => {
      return(
        <li key={date}>
          <a className="pure-button" href={url} target="_blank">{title}</a>
        </li>
      );
    });
    
  return (
    <>
      <PageHeader />
      <MemosContext.Provider value={{memos, setMemos}}>
        <MemoList memos={memoList} />
        <AddMemo />
      </MemosContext.Provider>
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

function AddMemo({appendMemos}) {
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  function changeDisplayForm() {
    setDisplayForm(displayForm ? false : true);
  }
  return(
    <div className="form-tray">
      <MemoForm isDisplay={displayForm} changeDisplayForm={changeDisplayForm} />
      <button className={"pure-button " + (displayForm ? 'no-display' : '')} onClick={() => {changeDisplayForm()}}>メモを追加</button>
    </div>
  );
}

function MemoList({memos}) {
  const dummyMemo = [
      <li key={0}>
        <a className="pure-button" href="" target="_blank">タイトル</a>
      </li>
    ];
  return(
    <ol className={"memo-list"}>{memos.length > 0 ? memos : dummyMemo}</ol>
  );
}

function MemoForm({isDisplay, changeDisplayForm}) {
  
  const formRef = useRef<HTMLFormElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const {memos, setMemos} = useContext(MemosContext);
  
  function addMemo(formData: FormData ) {
    const memoData: MemoType = {
      title: formData.get('title'),
      url: formData.get('url'),
      date: Date.now()
    }
    setData(memoData).then((event : Event) => {
      console.log("メモデータ記録完了");
      const newMemos = memos.slice();
      newMemos.push(memoData);
      setMemos(newMemos);
    }).catch((message) => {
      console.error(`メモデータの記録を失敗しました。${message}`);
    });
  }
  function onCancel(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.close();
    formRef.current?.reset();
    changeDisplayForm();
  }
  function onCancelCancel(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.showModal();
  }
  function closeDialog(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.close();
  }
  
  function ConfirmDialog({onCancel, closeDialog}) {
    return (
      <dialog ref={dialogRef}>
        <p>キャンセルしますか？</p>
        <div>
          <button onClick={onCancel}>はい</button>
          <button onClick={closeDialog}>いいえ</button>
        </div>
      </dialog>
    );
  }
    return(
    <>
        <form action={addMemo} className={"pure-form pure-form-stacked memo-form " + (isDisplay ? '' : 'no-display')} ref={formRef}>
          <fieldset>
          <label htmlFor="page-title">
            Webページのタイトル
          </label>
          <input type="text" id="page-title" name="title" required />
          <div className="pure-control-group">
            <label htmlFor="page-url">
              Webページのurl
            </label>
            <input type="url" id="page-url" name="url" required />
          </div>
          <div className="box-align-container">
            <button className="pure-button">保存</button><button className="pure-button box-align-right" onClick={onCancelCancel} >キャンセル</button>
          </div>
          </fieldset>
        </form>
        <ConfirmDialog onCancel={onCancel} closeDialog={closeDialog}/>
      </>
    );
}

export default App
