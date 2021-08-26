import React from 'react';
import styled from 'styled-components';
import icon_check from "./assets/icon-check.svg";

function Item(props) {

    let className = `${props.class + "-text"} active`;

    return (
        <Container onClick={props.handleCheck} className={props.class} >
            <span className="checkbox">
                <img style={{display: "none"}} src={icon_check} alt="" />                            
            </span>

            <span id={props.id} className={className}>{props.task}</span>            
        </Container>
    );
}

export default Item;


const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 30px;
    border-bottom: solid 1px hsl(233, 14%, 35%);
    cursor: pointer;
    
    span {
        margin-left: 25px;
        font-size: 1.4rem;
        color: hsl(234, 39%, 85%);
    }

    
    @media(max-width: 500px) {
        padding: 20px;

        span {
            font-size: 1.2rem;
        }
    }
`;