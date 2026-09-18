import styled from 'styled-components';
import BannerHome from '../../assets/banner-home.png';
import FundoBranco from '../../assets/Parte-fundo-branco.png';



export const Banner = styled.div `
background: url('${BannerHome}');
background-size: cover;
background-position: center;
height: 280px;

h1 {
    font-family: 'Road Rage', sans-serif;
    font-size: 80px;
    color: grey;
    position: absolute;
    right: 20%;
    top:10%;
}
`;
export const Container = styled.section `
background: url('${FundoBranco}');
width: 100%;
height: 500px;


`

export const Content = styled.div ``