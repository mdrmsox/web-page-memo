import { createContext, useContext, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import './App.css'
import { getData, setData, deleteData } from './IDBWrapper.tsx'

interface MemoType {
  title: string;
  url: string;
  date: number;
}
type DeleteMemo = (dbKey: number) => void;
type MemosContextType ={
  memos : MemoType[];
  setMemos : Dispatch<SetStateAction<MemoType[]>>;
  deleteMemo : DeleteMemo;
};
const MemosContext = createContext<MemosContextType | null>(null);


function App() {
  
  const listSubstitute: MemoType[] = [
                          {
                            title: "タイトル",
                            url: "",
                            date: 0
                          }
                        ];
    
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
    function deleteMemo(dbKey: number) {
      deleteData(dbKey).then(() => {
        const modifiedMemo: MemoType[] = memos.filter((element: MemoType) => element.date != dbKey);
        setMemos(modifiedMemo);
      }).catch((message : string) => {
        console.error("メモの削除に失敗しました。%s", message);
      });
    }
   
  return (
    <>
      <PageHeader />
      <MemosContext.Provider value={{memos, setMemos, deleteMemo}}>
        <MemoList />
        <AddMemo />
      </MemosContext.Provider>
    </>
  );
}

function PageHeader() {
  return(
    <header>
    <h1>Webページメモ</h1>
    <HowToUse />
    </header>
  );
}

function HowToUse() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <article className="how-to-use-frame">
      <button className="pure-button" onClick={() => setIsVisible(true)}>使い方</button>
      <div className={`how-to-use-block ${isVisible ? 'visible' : ''}`}>
        <div className="close-button"><span className="pure-button" onClick={() => setIsVisible(false)}>&times;</span></div>
        <h3>使い方</h3>
        <p>WebページのタイトルとURLを記録し、リストとして表示します。</p>
        <p>リストをクリックすると記録したページを表示します。</p>
        <p>削除ボタンでその項目を削除します。</p>
      </div>
    </article>
  )
}

function AddMemo() {
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

function MemoList() {

  const context = useContext(MemosContext);
  if (!context) {
   throw new Error('MemoContextが提供されていません。');
 }
  const {memos, deleteMemo} = context;
  const memoList = memos.map(({title, url, date}) => {
      return(
        <li key={date}>
          <a className="pure-button" href={url} target="_blank">{title}</a>
          <button className="delete-button pure-button" onClick={() => {return deleteMemo(date)}}>削除</button>
        </li>
      );
    });

  return(
    <div className="list-container"><ol className={"memo-list"}>{memoList}</ol></div>
  );
}

type MemoFormProps = {
  isDisplay : boolean;
  changeDisplayForm : () => void;
}
function MemoForm({isDisplay, changeDisplayForm} : MemoFormProps) {
  
  const formRef = useRef<HTMLFormElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const context = useContext(MemosContext);
  if (!context) {
   throw new Error('MemoContextが提供されていません。');
 }
   const {memos, setMemos} = context;

  function addMemo(formData: FormData) {
    const memoData: MemoType = {
      title: formData.get('title')!.toString(),
      url: formData.get('url')!.toString(),
      date: Date.now()
    }
    setData(memoData).then(() => {
      console.log("メモデータ記録完了");
      const newMemos = memos.slice();
      newMemos.push(memoData);
      setMemos(newMemos);
    }).catch((message) => {
      console.error(`メモデータの記録を失敗しました。${message}`);
    });
    changeDisplayForm();
  }
  function onCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.close();
    formRef.current?.reset();
    changeDisplayForm();
  }
  function onCancelCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.showModal();
  }
  function closeDialog(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dialogRef.current?.close();
  }

  type ConfirmDialogProps = {
    onCancel : (e: React.MouseEvent<HTMLButtonElement>) => void;
    closeDialog : (e: React.MouseEvent<HTMLButtonElement>) => void;
  } 

  function ConfirmDialog({onCancel, closeDialog}: ConfirmDialogProps) {
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
