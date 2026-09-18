import styled from "styled-components";
import bg1 from "../../assets/bg 1.svg";
import bg2 from "../../assets/bg 2.png"
import { Link as ReactLink } from "react-router-dom";

export const Container = styled.div`
display: flex;
height:100vh;
width: 100Vw;
`;

export const LeftContainer = styled.div`
background: url('${bg1}');
background-size: cover;
background-position: center;
max-width: 50%;
height: 100%;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

img {
    width: 80%;
}
`;

export const RightContainer = styled.div`
background: url('${bg2}');
background-color: #1e1e1e;
background-size: cover;
background-position: center;
height: 100%;
width: 100%;
max-width: 50%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

p {
    color: #fff;
    font-size: 18px;
    font-weight: 800;

    a {
        text-decoration: underline;
    }
}

`;

export const Title = styled.h2`
font-family: "Road Rage", sans-serif;
font-size: 40px;
color:#fff;

span {
    color: #9758a6;
    font-family: "Road Rage", sans-serif;
}
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;
padding: 20px;
width: 100%;
max-width: 400px;

`;

export const InputContainer = styled.div`
display:flex;
flex-direction:column;
gap: 5px;
width: 100%;

input {
    width: 100%;
    border: none;
    height: 52px;
    border-radius: 5px;
    padding: 0 16px;
}

    label {
    font-size:18px;
    font-weight: 600;
    color: #fff;
}

p {
    font-size: 14px;
    font-weight: 600;
    color: #cf3057;
    line-height: 80%;
    height: 10px;
}
`;

export const Label = styled.label``;

export const Link = styled(ReactLink)`
   text-decoration: none;
   color: #ffff;
`

