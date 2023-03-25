import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
    // const [count, setCount] = useState<number>(0);

    // const date = new Date();

    // useEffect(() => {
    //     setTimeout(() => {
    //         setCount(count + 1);
    //     },1000);
    // }, [count]);

    // return (
    //     <div className="">
    //         <span></span>
    //         <span>{date.toTimeString()}</span>
    //         <button onClick={() => setCount(count + 1)}>Tăng dần</button>
    //     </div>
    // );

    return (
        <main className="flex flex-col justify-center items-center w-full min-h-screen gap-4 dark:bg-black dark:text-white transition-colors duration-300">
            <Board />
        </main>
    );
}

export default App;
