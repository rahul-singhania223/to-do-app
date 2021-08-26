import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import icon_sun from "./assets/icon-sun.svg";
import icon_moon from "./assets/icon-moon.svg";
import bg_desktop_dark from "./assets/bg-desktop-dark.jpg";
import bg_desktop_light from "./assets/bg-desktop-light.jpg";
import bg_mobile_dark from "./assets/bg-mobile-dark.jpg";
import bg_mobile_light from "./assets/bg-mobile-light.jpg";
import Item from './Item';



function App(props) {
    
    const [dark, setDark] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [filter, setFilter] = useState("All");

    const desktopBakcground = {
        backgroundImage:  dark? `url(${bg_desktop_dark})`: `url(${bg_desktop_light})`
    }

    const mobileBackground = {
        backgroundImage: dark? `url(${bg_mobile_dark})` : `url(${bg_mobile_light})`
    }

    const changeMode = () => {
        setDark(!dark);
    }    

    const changeFilter = (e) => {
        setFilter(e.target.innerHTML);
        document.getElementsByClassName("active-filter")[0].classList.remove("active-filter");
        e.target.classList.add("active-filter");
    }

    const addTask = (e) => {
        setTasks([...tasks, {id: tasks.length, task: input}]);
        setInput("");
        e.preventDefault();
    }

    const handleCheck = (e) => {
        let target = "";  

        if(e.target.tagName==="SPAN") {
            target = e.target.parentElement;           
        } else {
            target = e.target;
        }

        const classList = Array.from(target.classList);
        const classIndex = classList.findIndex(className => className==="checked");

        

        if(classIndex >= 0) {            
            target.classList.remove("checked");
            target.lastElementChild.classList.remove("completed");
            target.lastElementChild.classList.add("active");
        } else {            
            target.classList.add("checked");
            target.lastElementChild.classList.remove("active");
            target.lastElementChild.classList.add("completed");
            
        }

        let newCompletedTasks = Array.from(document.getElementsByClassName("completed"));
        let newActiveTasks = Array.from(document.getElementsByClassName("active"));

        setCompletedTasks(newCompletedTasks);
        setActiveTasks(newActiveTasks);
        
    }

    const clearCompleted = () => {
        let newTasks = tasks;
        completedTasks.map((item) => {
            let id = item.getAttribute("id");
            let index = tasks.findIndex(task => task.id === id);
            newTasks.splice(index, 1);
            
            
            return (
                ""
            )
        })

       setTasks(newTasks);
       setCompletedTasks([]);
    }

    useEffect(() => {
        const activeTasks = Array.from(document.getElementsByClassName("active"));
        setActiveTasks(activeTasks);
    }, [tasks])

   
    
        
    return (
        <Container style={{backgroundColor: dark ? "hsl(235, 21%, 11%)" : "hsl(236, 33%, 92%)"}}>
            <BackgroundContainer style={window.innerWidth>500? desktopBakcground : mobileBackground} />

            <MainContainer>
                <HeaderContainer>
                    <h1>todo</h1>
                    <img onClick={changeMode} src={dark ? icon_sun : icon_moon} alt="" />
                </HeaderContainer>

                <CreateContainer style={{backgroundColor: dark ? "hsl(235, 24%, 19%)" : "hsl(0, 0%, 98%)"}}>
                    <div className="checkbox">
                        <img src="" alt="" />
                    </div>

                    <form onSubmit={addTask}>
                        <input style={{color: dark? "white" : "hsl(235, 19%, 35%)"}} value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Create a new todo..." />
                    </form>
                </CreateContainer>

                <ShowContainer className={dark? "dark-container" : "light-container"} style={{display: tasks.length===0? "none" : "block"}} >

                    <ListContainer style={{backgroundColor: dark ? "hsl(235, 24%, 19%)" : "hsl(0, 0%, 98%)"}}>
                        
                        <ItemsContainer style={{display: filter==="All"? "block" : "none"}}>
                            {   
                                tasks.map((item, index) => (
                                    <Item key={index} id={item.id} handleCheck={handleCheck} class={dark? "dark" : "light"} task={item.task} />
                                ))
                                
                            }
                        </ItemsContainer>

                        <ItemsContainer >
                            {  filter==="Active"?  
                                activeTasks.map((item) => (
                                    <Item handleCheck={() => {}} class={dark ? "dark" : "light"} task={item.innerHTML} />
                                ))
                                :
                                null
                                
                            }
                        </ItemsContainer>

                        <ItemsContainer >
                            {  filter==="Completed"?  
                                completedTasks.map((item) => (
                                    <Item handleCheck={() => {}} class={"checked"} task={item.innerHTML} />
                                ))
                                :
                                null
                                
                            }
                        </ItemsContainer>


                        
                        <BootomContainer style={{color: dark ? "hsl(233, 14%, 35%)" : "hsl(236, 9%, 61%)"}}>
                            <span>{activeTasks.length} items left</span>                       
                            <DesktopFilterContainer style={{backgroundColor: dark ? "hsl(235, 24%, 19%)" : "hsl(0, 0%, 98%)"}}>
                                <span className="active-filter" onClick={changeFilter}>All</span>
                                <span onClick={changeFilter}>Active</span>
                                <span onClick={changeFilter}>Completed</span>
                            </DesktopFilterContainer>
                            <span onClick={clearCompleted} >Clear Completed</span>
                        </BootomContainer>
                    </ListContainer>   

                    <FilterContainer style={{backgroundColor: dark ? "hsl(235, 24%, 19%)" : "hsl(0, 0%, 98%)", color: dark? "hsl(233, 14%, 35%)" : "hsl(236, 9%, 61%)"}}>
                        <span className="active-filter" onClick={changeFilter}>All</span>
                        <span onClick={changeFilter}>Active</span>
                        <span onClick={changeFilter}>Completed</span>
                    </FilterContainer>
                </ShowContainer>

                <MessageContainer style={{backgroundColor: dark ? "hsl(235, 24%, 19%)" : "hsl(0, 0%, 98%)", display: tasks.length===0? "flex" : "none", color: dark? "hsl(234, 39%, 85%)" : "hsl(235, 19%, 35%)"}} >
                    <h2>Your task list is empty.</h2>
                    <span>Please add some tasks</span>
                </MessageContainer>

                

            </MainContainer>
            
        </Container>
    );
}

export default App;

const Container = styled.div`
    min-height: 100vh;
    
    
`;

const BackgroundContainer = styled.div`
    height: 40vh;
    background-size: cover;
    background-position: center;
`;

const MainContainer = styled.div`
    width: 40%;
    margin: 0 auto;
    margin-top: -220px;

    @media(max-width: 1100px) {
        width: 65%;
    }

    @media(max-width: 500px) {
        width: 95%;
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    h1 {
        text-transform: uppercase;
        letter-spacing: 8px;
        font-size: 2.4rem;
    }

    img {
        cursor: pointer;
    }

    @media(max-width: 500px) {
        font-size: 1.7rem;
    }
`;

const CreateContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    height: 70px;
    padding: 0 30px;
    border-radius: 7px;
    margin-top: 30px;

    form {
        flex: 1;
        height: 100%;
    }
        
    input {
        width: 100%;
        height: 100%;
        margin-left: 25px;
        background: none;
        border: none;
        border-radius: 7px;
        font-size: 1.3rem;
        color: white;

        :focus {
            outline: none;
        }
    }

    @media(max-width: 500px) {
        height: 60px;
        
        input {
            font-size: 1.2rem;
        }
    }
`;

const ListContainer = styled.div`    
    margin-top: 30px;
    border-radius: 7px;   
`;

const ItemsContainer = styled.div`
    max-height: 48vh;
    overflow-y: scroll;
`;

const ShowContainer = styled.div`

`;

const FilterContainer = styled.div`
    margin-top: 30px;
    height: 60px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    display: none;
    
    span {
        margin: 0 14px;        
        font-weight: 700;
        cursor: pointer;

        :hover {
            color: hsl(220, 98%, 61%);
        }
    }

    @media(max-width: 768px) {
        display: flex;
    }

    @media(max-width: 500px) {
        span {
            font-size: 1rem;
            margin: 0 24px;
        }

        padding: 0 20px;
        
    }
`;

const DesktopFilterContainer = styled.div `    
    height: 60px;
    border-radius: 7px;    
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    display: flex;

    span {
        margin: 14px;        
        font-weight: 700;
        cursor: pointer;

        :hover {
            color: hsl(220, 98%, 61%);
        }
    }

    @media(max-width: 768px) {
        display: none;
    }

`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    border-radius: 7px;
    margin-top: 30px;
    color: hsl(236, 33%, 92%);

    span {
        padding-top: 10px;
    }
`;

const BootomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    height: 60px;
   
    

    span {
        font-size: 1rem;        
        cursor: pointer;

        :hover {
            color: hsl(235, 19%, 35%);
        }
    }
`;