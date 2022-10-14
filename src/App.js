import React, { useState, useCallback, useMemo } from "react";
import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";
import DemoList from "./components/Demo/DemoList";

function App() {
  console.log("App is run");
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);
  /*state is only updated after first initialization
  use state coming from react and it's manage state
  so react make sure that use state and the value you pass as a default value
   to use state essentially considered once
   when use state is called>> no use state created,react recognize it's have state for this component
   and it instead simply update the state as needed
   so react do state management and updating 
   (it will never reinitialize the state)>>unless the component totally removed from dom,
   so if the component reattached then anew state will be initialize

   *if func have two state updating func in the same sync code
    after each other(not in promise or diff block and nothing between would cause time delay)
    so react will batch those state update together in one long sync process into one state update
    no need to re-execute the func two times if it have two state update in the same sync order
  */

  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevshowParagraph) => !prevshowParagraph); //it's recommended to use  this func form
      //for update state if it's depend on the previous state snapshot
    }
    /*always false because we prevent react to re create the function and take the new value of allowToggle
    so allowToggle always equals false until we change the dependency from [] empty array to  [allowToggle]
    so this mean the function will be re-created when the allowToggle value changed
     */
  }, [allowToggle]);

  /*second arg must be array like use effect so empty array mean [] the function will never change
  and the data is always the same function object should be reused when the component re-render
  so now the react.memo(button) do his job so all props value we pass in are comparaple
   and toggleParagraphHandler function object it's guaranteed to always be the excaxt same object in
   memory because use of callback
   */
  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  const [listTitle, setListTitle] = useState("My List");

  const changeTitleHandler = useCallback(() => {
    setListTitle("New Title");
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);
  return (
    <div className="app">
      <h1>Hi there!</h1>
      {/* if component is re-excuted all it's chaild componet will be re-excuted and re-evaluated
      demo output and button will be re-excuted even though They have not been changed 
      the change in parent component(state,props,context) is enough to re rexcute every child
      (any excute in any child component will reexcute the parent and all child)
      soultion:
      to fix this we use React.memo it's use to optimize functional component
      ex:
      export default React.memo(DemoOutput);
      react should look at props in this component and check he new value for all this props and compere
      it's to previos value to this props and only if the value of props change the component shuld be
      re-excuted and re-evaluted
      and if the parent component change but the prop value for this componetn not change 
      the re-excution will be skipped
      the app jus render every thing for the first time
      any child of DemoOutput will not be re-excuted beacause the parent component didnt re- excuted
      we use memo to avoid unnessery re-rendaring
      if we use memo react should do two thing:
      1- store the prevoius props value
      2- do comparision with the new value
      so we cant use memo to every component because it's has performance cost
      so here we trading the  re-evaluation the component or comparision props 
      and it's imposable to say wich performance cost is higher 
      it's depond's on(number of props you have,child componet your compont is have,complixity of component )
        */}
      {/* we use callback hook: to save a function and till react this function should not re-created
      with every excution
      so when the same function object is store in the same palce in memory so the comparison does work
       */}
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allowtoggling</Button>
      <Button onClick={toggleParagraphHandler}>toggleParagraph</Button>
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
